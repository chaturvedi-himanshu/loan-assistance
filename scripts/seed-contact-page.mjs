/**
 * Seeds the Contact page content into the database and ensures the Settings
 * document carries a WhatsApp number (shown on the Contact page).
 *
 *   • ContactPage  — upserted with default copy. Existing admin edits are
 *     preserved ($setOnInsert), so it is safe to re-run.
 *   • Settings.whatsapp — only populated if currently empty/missing, so it
 *     never overwrites a number an admin has already set.
 *
 * Run: node scripts/seed-contact-page.mjs
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

const Settings = looseModel("Settings");
const ContactPage = looseModel("ContactPage");

const CONTACT_DEFAULTS = {
  bannerTitle: "Contact Us",
  bannerDesc:
    "Talk to a Smart Loans advisor — we usually reply within<br>24 working hours with clear next steps.",
  infoEyebrow: "We're here for you",
  infoHeading: "Let's find the right loan for you.",
  infoDescription:
    "Reach out by phone, email, or the form on the right. A real Smart Loans advisor will get back to you with answers, not bots.",
  phoneLabel: "Call us anytime",
  emailLabel: "Email our team",
  whatsappLabel: "Chat on WhatsApp",
  addressLabel: "Visit our office",
  hoursLabel: "Working hours",
  followLabel: "Follow Smart Loans",
  formHeading: "Send us a message",
  formSubtitle:
    "Fill in the form and we'll get back to you with the next steps tailored to your loan needs.",
};

const DEFAULT_WHATSAPP = "+1 (800) 694-8956";

async function seedContactPage() {
  console.log("\n[ContactPage]");
  const existing = await ContactPage.findOne().lean();
  if (existing) {
    // Fill in any keys that are missing on the existing doc without clobbering edits.
    const $set = {};
    for (const [k, v] of Object.entries(CONTACT_DEFAULTS)) {
      if (existing[k] === undefined || existing[k] === null || existing[k] === "") {
        $set[k] = v;
      }
    }
    if (Object.keys($set).length) {
      await ContactPage.updateOne({ _id: existing._id }, { $set });
      console.log("  ✓ Filled missing fields:", Object.keys($set).join(", "));
    } else {
      console.log("  • ContactPage already complete — left untouched.");
    }
  } else {
    await ContactPage.create(CONTACT_DEFAULTS);
    console.log("  ✓ Created ContactPage document with default copy.");
  }
}

async function seedWhatsapp() {
  console.log("\n[Settings.whatsapp]");
  let settings = await Settings.findOne();
  if (!settings) {
    settings = await Settings.create({ whatsapp: DEFAULT_WHATSAPP });
    console.log("  ✓ Created Settings with WhatsApp number.");
    return;
  }
  if (!settings.whatsapp) {
    // Prefer reusing an existing phone number if one is set.
    settings.whatsapp = settings.phone1 || DEFAULT_WHATSAPP;
    await settings.save();
    console.log(`  ✓ Set WhatsApp number to "${settings.whatsapp}".`);
  } else {
    console.log(`  • WhatsApp already set ("${settings.whatsapp}") — left untouched.`);
  }
}

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    await seedContactPage();
    await seedWhatsapp();
    console.log("\n✅  Contact page seeding complete.");
  } catch (err) {
    console.error("\n❌  Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
