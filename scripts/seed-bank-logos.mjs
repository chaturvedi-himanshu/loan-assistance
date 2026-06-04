/**
 * Seeds the "Why Choose Us" logo carousel with a starter set of Australian
 * bank logos. Admins can replace/reorder these from the admin panel
 * (/admin/homepage/why-choose-us).
 *
 *   • Only sets HomeContent.whyLogos if it is currently empty, so it never
 *     overwrites logos an admin has already uploaded. Re-run safe.
 *
 * Run: node scripts/seed-bank-logos.mjs
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
const HomeContent =
  mongoose.models.HomeContent ??
  mongoose.model(
    "HomeContent",
    new Schema({}, { strict: false, timestamps: true }),
  );

// Clearbit logo API returns the brand logo for a domain. These are starter
// placeholders — replace with hosted assets from the admin panel for production.
const BANK_LOGOS = [
  { image: "https://logo.clearbit.com/commbank.com.au", alt: "Commonwealth Bank" },
  { image: "https://logo.clearbit.com/westpac.com.au", alt: "Westpac" },
  { image: "https://logo.clearbit.com/nab.com.au", alt: "NAB" },
  { image: "https://logo.clearbit.com/anz.com.au", alt: "ANZ" },
  { image: "https://logo.clearbit.com/macquarie.com", alt: "Macquarie" },
  { image: "https://logo.clearbit.com/bankwest.com.au", alt: "Bankwest" },
  { image: "https://logo.clearbit.com/stgeorge.com.au", alt: "St.George Bank" },
  { image: "https://logo.clearbit.com/suncorp.com.au", alt: "Suncorp" },
];

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    console.log("\n[HomeContent.whyLogos]");
    let doc = await HomeContent.findOne();
    if (!doc) {
      doc = await HomeContent.create({
        whyLogos: BANK_LOGOS,
        whyLogosHeading: "Trusted by Australia's leading banks",
      });
      console.log(`  ✓ Created HomeContent with ${BANK_LOGOS.length} bank logos.`);
    } else if (!Array.isArray(doc.whyLogos) || doc.whyLogos.length === 0) {
      doc.whyLogos = BANK_LOGOS;
      if (!doc.whyLogosHeading) doc.whyLogosHeading = "Trusted by Australia's leading banks";
      await doc.save();
      console.log(`  ✓ Added ${BANK_LOGOS.length} Australian bank logos.`);
    } else {
      console.log(`  • whyLogos already set (${doc.whyLogos.length}) — left untouched.`);
    }
    console.log("\n✅  Bank logo seeding complete.");
  } catch (err) {
    console.error("\n❌  Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
