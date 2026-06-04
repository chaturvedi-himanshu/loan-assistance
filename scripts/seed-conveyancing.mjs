/**
 * Seeds the Conveyancing Services collection with the default 6 services.
 * These previously existed only as in-code fallbacks and were never written to
 * the database, so the admin panel (which reads straight from the DB) showed
 * them as empty.
 *
 *   • Only inserts when the collection is empty, so it never duplicates or
 *     overwrites services an admin has already created. Re-run safe.
 *
 * Run: node scripts/seed-conveyancing.mjs
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
const conveyancingSchema = new Schema(
  {
    icon: String,
    title: String,
    desc: String,
    features: [String],
    color: String,
    order: Number,
  },
  { timestamps: true },
);
const ConveyancingService =
  mongoose.models.ConveyancingService ??
  mongoose.model("ConveyancingService", conveyancingSchema);

const SERVICES = [
  {
    icon: "icofont-home",
    title: "Residential Conveyancing",
    desc: "Seamless buying and selling of residential properties with full legal protection at every step.",
    features: ["Contract review & negotiation", "Title & encumbrance search", "Settlement coordination"],
    color: "#2cbbdf",
    order: 1,
  },
  {
    icon: "icofont-building-alt",
    title: "Commercial Conveyancing",
    desc: "Expert handling of commercial property transfers, leases, and developments for businesses of all sizes.",
    features: ["Due diligence & compliance", "Lease agreements", "Zoning & planning advice"],
    color: "#f0734a",
    order: 2,
  },
  {
    icon: "icofont-search-document",
    title: "Title Search & Verification",
    desc: "Thorough investigation of property titles to protect your investment from hidden disputes or claims.",
    features: ["Full title history report", "Caveat & lien detection", "Rapid turnaround"],
    color: "#27ae60",
    order: 3,
  },
  {
    icon: "icofont-law",
    title: "Mortgage & Settlement",
    desc: "End-to-end mortgage registration and settlement services ensuring a smooth and stress-free handover.",
    features: ["Mortgage registration", "Funds disbursement", "Key handover support"],
    color: "#2196f3",
    order: 4,
  },
  {
    icon: "icofont-files-stack",
    title: "Strata Title Services",
    desc: "Specialised conveyancing for strata, community title, and off-the-plan purchases with full transparency.",
    features: ["By-laws & levies review", "Off-the-plan contracts", "Body corporate advice"],
    color: "#e91e8c",
    order: 5,
  },
  {
    icon: "icofont-refresh",
    title: "Property Transfers",
    desc: "Fast and accurate transfer of property between family members, related parties, or through estates.",
    features: ["Stamp duty concessions", "Gift & family transfers", "Estate property transfers"],
    color: "#ff9800",
    order: 6,
  },
];

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    const count = await ConveyancingService.countDocuments();
    if (count > 0) {
      console.log(`  • Collection already has ${count} service(s) — left untouched.`);
    } else {
      await ConveyancingService.insertMany(SERVICES);
      console.log(`  ✓ Inserted ${SERVICES.length} conveyancing services.`);
    }
    console.log("\n✅  Conveyancing seeding complete.");
  } catch (err) {
    console.error("\n❌  Seeding failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
