/**
 * Currency migration — converts every stored rupee value to US Dollars.
 *
 *   • Replaces the "₹" glyph with "$" and re-groups the number using the
 *     Western thousands system (₹2,00,000 → $200,000).
 *   • Normalises the Indian "Cr" (crore) unit to "M" so e.g. "$500 Cr" → "$500M".
 *   • Fixes targeted config fields: Hero badge icon + stat, emiCurrency, and the
 *     INR labels on the application form fields.
 *
 * Only the fields that actually contain a rupee value / INR config are touched.
 * Run: node scripts/currency-to-usd.mjs
 */

import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ── Load .env.local manually ──────────────────────────────────────────────────
const __dir = dirname(fileURLToPath(import.meta.url));
const envPath = join(__dir, "../.env.local");
try {
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (!process.env[key]) process.env[key] = val;
  }
} catch {
  console.warn("Could not load .env.local — ensure MONGODB_URI is set.");
}

const URI = process.env.MONGODB_URI;
if (!URI) {
  console.error("❌  MONGODB_URI not set");
  process.exit(1);
}

const { Schema } = mongoose;
const looseModel = (name) =>
  mongoose.models[name] ??
  mongoose.model(name, new Schema({}, { strict: false, timestamps: true }));

const Hero = looseModel("Hero");
const Stat = looseModel("Stat");
const Service = looseModel("Service");
const HomeContent = looseModel("HomeContent");
const FooterContent = looseModel("FooterContent");
const AboutPage = looseModel("AboutPage");
const Testimonial = looseModel("Testimonial");
const BlogPost = looseModel("BlogPost");
const ChatbotQA = looseModel("ChatbotQA");
const FormField = looseModel("FormField");

// ── Helpers ───────────────────────────────────────────────────────────────────

function regroup(numStr) {
  const digits = numStr.replace(/[^\d]/g, "");
  if (!digits) return numStr;
  return Number(digits).toLocaleString("en-US");
}

/**
 * Convert any rupee value found in a string to a USD value.
 *   "₹2,00,000"  → "$200,000"
 *   "₹500Cr+"    → "$500M+"
 *   "₹100 Cr"    → "$100M"
 *   "₹"          → "$"
 */
function rupeeToDollar(value) {
  if (typeof value !== "string" || !value.includes("₹")) return value;
  let out = value.replace(/₹\s?([\d][\d,]*)/g, (_, num) => `$${regroup(num)}`);
  out = out.replace(/₹/g, "$");
  // Normalise the Indian crore unit that may sit next to a converted $ value.
  out = out.replace(/(\$[\d,]+)\s?Cr\b/gi, "$1M");
  return out;
}

/** Deep-rebrand every string field of a plain object (one level + arrays). */
function rupeeToDollarDeep(value) {
  if (typeof value === "string") return rupeeToDollar(value);
  if (Array.isArray(value)) return value.map(rupeeToDollarDeep);
  if (value && typeof value === "object") {
    const next = {};
    for (const [k, v] of Object.entries(value)) next[k] = rupeeToDollarDeep(v);
    return next;
  }
  return value;
}

/**
 * Generic pass: for each doc in a collection, rebrand the named string fields
 * (and array/object fields) and persist only if something changed.
 */
async function rebrandCollection(Model, fields, label) {
  const docs = await Model.find().lean();
  let changed = 0;
  for (const doc of docs) {
    const $set = {};
    for (const f of fields) {
      if (!(f in doc)) continue;
      const next = rupeeToDollarDeep(doc[f]);
      if (JSON.stringify(next) !== JSON.stringify(doc[f])) $set[f] = next;
    }
    if (Object.keys($set).length) {
      await Model.updateOne({ _id: doc._id }, { $set });
      changed++;
    }
  }
  console.log(
    `  ${changed ? "✓" : "•"} ${label}: ${changed} doc(s) updated.`,
  );
}

// ── Migrations ────────────────────────────────────────────────────────────────

async function migrateHero() {
  console.log("\n[Hero]");
  const doc = await Hero.findOne().lean();
  if (!doc) {
    console.log("  • no Hero doc, skipped.");
    return;
  }
  const $set = {};
  const nextStat2 = rupeeToDollar(doc.stat2Value ?? "");
  // Also flatten the crore-based marketing figure to the $-million form.
  const stat2 = nextStat2.replace(/(\$[\d,]+)\s?Cr\b/gi, "$1M");
  if (stat2 && stat2 !== doc.stat2Value) $set.stat2Value = stat2;
  if (doc.badge2Icon === "icofont-rupee") $set.badge2Icon = "icofont-dollar";
  if (Object.keys($set).length) {
    await Hero.updateOne({ _id: doc._id }, { $set });
    console.log("  ✓ Hero:", Object.keys($set).join(", "));
  } else {
    console.log("  • Hero: already up to date.");
  }
}

async function migrateEmiCurrency() {
  console.log("\n[emiCurrency]");
  for (const [Model, name] of [
    [HomeContent, "HomeContent"],
    [FooterContent, "FooterContent"],
  ]) {
    const res = await Model.updateMany(
      { emiCurrency: { $in: ["INR", "₹"] } },
      { $set: { emiCurrency: "USD" } },
    );
    console.log(
      `  ${res.modifiedCount ? "✓" : "•"} ${name}.emiCurrency: ${res.modifiedCount} updated.`,
    );
  }
}

async function migrateFormFields() {
  console.log("\n[FormField]");
  const all = await FormField.find().lean();
  let changed = 0;
  for (const f of all) {
    const $set = {};
    const swapINR = (s) =>
      typeof s === "string"
        ? s.replace(/\(INR\)/gi, "($)").replace(/INR/gi, "$")
        : s;
    const nextLabel = rupeeToDollar(swapINR(f.label ?? ""));
    const nextPlaceholder = rupeeToDollar(swapINR(f.placeholder ?? ""));
    if (nextLabel && nextLabel !== f.label) $set.label = nextLabel;
    if (nextPlaceholder && nextPlaceholder !== f.placeholder)
      $set.placeholder = nextPlaceholder;
    if (Object.keys($set).length) {
      await FormField.updateOne({ _id: f._id }, { $set });
      changed++;
    }
  }
  console.log(`  ${changed ? "✓" : "•"} FormField: ${changed} field(s) updated.`);
}

// ── Entrypoint ────────────────────────────────────────────────────────────────

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    await migrateHero();
    await migrateEmiCurrency();
    await migrateFormFields();

    console.log("\n[Generic ₹ → $ swap]");
    await rebrandCollection(Stat, ["value", "label"], "Stat");
    await rebrandCollection(
      Service,
      ["amount", "rate", "desc", "features", "tenure"],
      "Service",
    );
    await rebrandCollection(
      AboutPage,
      ["historyItems", "sec1Body1", "sec1Body2", "sec2Body", "sec2Link"],
      "AboutPage",
    );
    await rebrandCollection(Testimonial, ["text"], "Testimonial");
    await rebrandCollection(BlogPost, ["excerpt", "content"], "BlogPost");
    await rebrandCollection(ChatbotQA, ["question", "answer"], "ChatbotQA");
    await rebrandCollection(
      HomeContent,
      ["loanProductsSubtitle", "applyAmountHeading"],
      "HomeContent",
    );

    console.log("\n✅  Currency migration complete.");
  } catch (err) {
    console.error("\n❌  Migration failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
