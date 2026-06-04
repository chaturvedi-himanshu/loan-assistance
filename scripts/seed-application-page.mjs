/**
 * Seeds the Application Form page content into the database so it is editable
 * from the admin panel (/admin/application-page) right away.
 *
 *   • ApplicationPage — created with default copy if missing. Existing admin
 *     edits are preserved (missing keys are filled in only), so it is safe to
 *     re-run.
 *
 * Run: node scripts/seed-application-page.mjs
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
const ApplicationPage =
  mongoose.models.ApplicationPage ??
  mongoose.model(
    "ApplicationPage",
    new Schema({}, { strict: false, timestamps: true }),
  );

const APPLICATION_DEFAULTS = {
  bannerTitle: "Apply for Your Loan",
  bannerEyebrow: "Application Form",
  bannerDesc:
    "Tell us a little about you and we'll get back to you within<br>24 working hours with a decision and the best next steps.",
  sideBadge: "Quick Application",
  sideHeading: "Get a loan that fits your life.",
  sideDescription:
    "Fill in the form on the right and our team will get back to you with the best options for your profile within 24 working hours.",
  benefits: [
    {
      icon: "icofont-bolt",
      title: "Quick response to your query",
      desc: "Prompt responses, clear communication, and reliable support—every step of the way.",
    },
    {
      icon: "icofont-shield-alt",
      title: "Bank-level security",
      desc: "Your information is encrypted in transit and never sold to third parties.",
    },
    {
      icon: "icofont-coins",
      title: "Zero hidden charges",
      desc: "Transparent rates and fees — what you see is what you pay.",
    },
  ],
  processHeading: "What happens next",
  steps: [
    { num: "01", title: "Fill out the form", desc: "Share a few details about you and the loan you need." },
    { num: "02", title: "We review & match", desc: "Our team matches you with the best lender for your profile." },
    { num: "03", title: "Approval & next steps", desc: "We get back to you within 24 working hours with a decision." },
  ],
  helpLabel: "Need help right now?",
  formHeading: "Contact Us",
  formSubtitle:
    "Complete the form below. Everything you share is encrypted and used only to process your application.",
};

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    console.log("\n[ApplicationPage]");
    const existing = await ApplicationPage.findOne().lean();
    if (existing) {
      const $set = {};
      for (const [k, v] of Object.entries(APPLICATION_DEFAULTS)) {
        const cur = existing[k];
        const empty =
          cur === undefined ||
          cur === null ||
          cur === "" ||
          (Array.isArray(cur) && cur.length === 0);
        if (empty) $set[k] = v;
      }
      if (Object.keys($set).length) {
        await ApplicationPage.updateOne({ _id: existing._id }, { $set });
        console.log("  ✓ Filled missing fields:", Object.keys($set).join(", "));
      } else {
        console.log("  • ApplicationPage already complete — left untouched.");
      }
    } else {
      await ApplicationPage.create(APPLICATION_DEFAULTS);
      console.log("  ✓ Created ApplicationPage document with default copy.");
    }
    console.log("\n✅  Application page seeding complete.");
  } catch (err) {
    console.error("\n❌  Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
