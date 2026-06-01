/**
 * Surgical content migration script — applies the Smart Loans rebranding +
 * copy / structure updates requested for the public site, **only touching
 * the specific fields that need to change**.
 *
 * Run: node scripts/update-content.mjs
 *
 * Requires MONGODB_URI in .env.local.
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
const Hero = looseModel("Hero");
const Stat = looseModel("Stat");
const Service = looseModel("Service");
const TeamMember = looseModel("TeamMember");
const ProcessStep = looseModel("ProcessStep");
const HomeContent = looseModel("HomeContent");
const FooterContent = looseModel("FooterContent");
const AboutPage = looseModel("AboutPage");
const ChatbotQA = looseModel("ChatbotQA");
const FormField = looseModel("FormField");

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Replace "Payloan" → "Smart Loans" inside a string, preserving any
 * leading / trailing whitespace.
 */
const swapBrand = (value) => {
  if (typeof value !== "string" || !value) return value;
  return value
    .replace(/Pay\s*loan/gi, "Smart Loans")
    .replace(/payloan/gi, "Smart Loans");
};

/** Run a partial update on a single document and log the diff in a friendly way. */
async function patchDoc(Model, filter, patch, label) {
  const before = await Model.findOne(filter).lean();
  if (!before) {
    console.log(`  • ${label}: no matching document, skipped.`);
    return;
  }
  const $set = {};
  for (const [k, v] of Object.entries(patch)) {
    if (JSON.stringify(before[k]) !== JSON.stringify(v)) $set[k] = v;
  }
  if (!Object.keys($set).length) {
    console.log(`  • ${label}: already up to date.`);
    return;
  }
  await Model.updateOne(filter, { $set });
  console.log(`  ✓ ${label}:`, Object.keys($set).join(", "));
}

/**
 * Replace `Payloan` → `Smart Loans` only inside the listed string fields of a
 * single document. Leaves every other field untouched.
 */
async function rebrandFields(Model, filter, fields, label) {
  const doc = await Model.findOne(filter).lean();
  if (!doc) {
    console.log(`  • ${label}: no matching document, skipped.`);
    return;
  }
  const $set = {};
  for (const f of fields) {
    const next = swapBrand(doc[f]);
    if (typeof doc[f] === "string" && next !== doc[f]) $set[f] = next;
  }
  if (!Object.keys($set).length) {
    console.log(`  • ${label}: nothing to rebrand.`);
    return;
  }
  await Model.updateOne(filter, { $set });
  console.log(`  ✓ ${label}:`, Object.keys($set).join(", "));
}

// ── Migrations ────────────────────────────────────────────────────────────────

async function migrateSettings() {
  console.log("\n[Settings]");
  await rebrandFields(
    Settings,
    {},
    ["siteName", "tagline", "email"],
    "Site Settings",
  );
}

async function migrateFooterContent() {
  console.log("\n[FooterContent]");
  const doc = await FooterContent.findOne().lean();
  if (!doc) {
    console.log("  • no FooterContent doc, skipped.");
    return;
  }

  const $set = {};
  const rebranded = (field) => {
    const next = swapBrand(doc[field]);
    if (typeof doc[field] === "string" && next !== doc[field]) $set[field] = next;
  };
  rebranded("brandDescription");
  rebranded("brandLogoAlt");
  rebranded("copyrightText");
  rebranded("copyrightBarText");

  // Trim loan-types links down to Home / Business / Car (in that order).
  if (Array.isArray(doc.loanLinks) && doc.loanLinks.length) {
    const ALLOWED = ["Home Loan", "Business Loan", "Car Loan"];
    const byLabel = new Map(doc.loanLinks.map((l) => [l.label, l]));
    const next = ALLOWED.map(
      (label) =>
        byLabel.get(label) ?? {
          label,
          href: "/services",
          icon:
            label === "Home Loan"
              ? "icofont-building"
              : label === "Business Loan"
                ? "icofont-businessman"
                : "icofont-car",
        },
    );
    if (JSON.stringify(next) !== JSON.stringify(doc.loanLinks)) {
      $set.loanLinks = next;
    }
  }

  if (!Object.keys($set).length) {
    console.log("  • already up to date.");
    return;
  }
  await FooterContent.updateOne({ _id: doc._id }, { $set });
  console.log("  ✓ updated:", Object.keys($set).join(", "));
}

async function migrateHomeContent() {
  console.log("\n[HomeContent]");
  await patchDoc(
    HomeContent,
    {},
    {
      // "Awesome Services" three points (4th hidden).
      servicesFeature1Icon: "icofont-check-circled",
      servicesFeature1Text: "Fastest Loan Approval",
      servicesFeature2Icon: "icofont-ui-calculator",
      servicesFeature2Text: "Flexible / Transparent EMI",
      servicesFeature3Icon: "icofont-support",
      servicesFeature3Text: "Making Every Step Simple and Stress-Free",
      servicesFeature4Icon: "",
      servicesFeature4Text: "",

      // Application process heading rewrite.
      processHeading: "Fast and Very Easy\nApplication Process",
      processSubtitle:
        "Three simple steps and our team takes care of the rest —\nfast, transparent, and stress-free.",

      // Remove the apply-amount marketing heading entirely.
      applyAmountHeading: "",

      // Testimonials heading + rating.
      testimonialsHeading: "What Our Clients\nSay About Us",
      testimonialsSubtitle:
        "Real stories from people who chose Smart Loans\nto power their next big step.",
      testimonialsRatingValue: "5",
    },
    "HomeContent",
  );

  // Brand-only rewrites (don't touch unrelated copy).
  await rebrandFields(
    HomeContent,
    {},
    [
      "whyBadge",
      "whyHeading",
      "contactHeading",
      "contactSubtitle",
      "loanProductsSubtitle",
    ],
    "HomeContent (brand swap)",
  );
}

async function migrateAboutPage() {
  console.log("\n[AboutPage]");
  await patchDoc(
    AboutPage,
    {},
    {
      sec1Heading: "Why we started Smart Loans?",
      sec1Sub:
        "Smart Loans was founded to make financing simple, transparent, and accessible for every Indian household and business.",
      sec1Body1:
        "Smart Loans was started with one goal — to take the friction out of borrowing. We help you cut through paperwork, jargon, and waiting rooms, and connect you with the right lender for your needs.",
      sec1Body2:
        "Whether you are looking for a Home Loan for your dream property, a Business Loan to fuel growth, or a Car Loan for your next ride, our team is here to guide you end-to-end.",

      sec2Heading: "A leading consumer finance company you can trust.",
      sec2Sub:
        "We combine deep lender relationships with a customer-first approach so you always get a clear, honest deal.",
      sec2Link:
        "Smart Loans partners with multiple banks and NBFCs so you can compare offers in one place and pick the one that fits you best.",
      sec2Body:
        "Since 2017 we have helped thousands of customers find the right loan — from first-time home buyers to growing businesses. Every application is reviewed by a real human, and our advisors are with you from the first conversation until disbursal.",

      historyTitle: "We have 9 years of experience\nsee our company history",
      historyDesc:
        "From a small finance desk in 2017 to a trusted national brand today — here are the milestones that shaped Smart Loans.",

      historyItems: [
        {
          period: "2017 to 2019",
          frontDesc1:
            "Smart Loans was founded in 2017 with a small team focused on Home and Personal loans for first-time borrowers.",
          frontDesc2:
            "We helped our first 1,000 customers find faster, fairer financing.",
          backDesc1:
            "Built our partner network with leading banks and NBFCs, and launched our digital application portal.",
          backDesc2:
            "Crossed the milestone of ₹100 Cr in loans facilitated within two years.",
          order: 0,
        },
        {
          period: "2020 to 2022",
          frontDesc1:
            "Expanded into Business and Car loans and scaled our advisory team across multiple cities.",
          frontDesc2:
            "Launched virtual consultations to keep customers supported through the pandemic years.",
          backDesc1:
            "Introduced doorstep documentation pickup and end-to-end digital approvals.",
          backDesc2:
            "Grew our customer base 5× and built a 4.9-star advisor experience.",
          order: 1,
        },
        {
          period: "2022 to Present",
          frontDesc1:
            "Today Smart Loans is a trusted name across India for Home, Business and Car loans.",
          frontDesc2:
            "We continue to invest in technology and people to keep borrowing simple and stress-free.",
          backDesc1:
            "Partnered with 25+ lenders to give you the widest choice and the most competitive rates.",
          backDesc2:
            "On a mission to make every step of your loan journey simple, transparent, and stress-free.",
          order: 2,
        },
      ],
    },
    "AboutPage",
  );
}

async function migrateStats() {
  console.log("\n[Stats]");

  // "₹2B+" → "$2B+" on the Loans Processed stat.
  const loans = await Stat.findOne({ label: /loans\s*processed/i }).lean();
  if (loans) {
    const next = (loans.value ?? "").replace(/₹/g, "$").replace(/rs\.?\s*/i, "$");
    if (next !== loans.value) {
      await Stat.updateOne({ _id: loans._id }, { $set: { value: next } });
      console.log(`  ✓ Loans Processed: value "${loans.value}" → "${next}"`);
    } else {
      console.log("  • Loans Processed: already uses $ symbol.");
    }
  } else {
    console.log("  • Loans Processed stat not found.");
  }

  // "Cities Covered" → "Suburbs Covered".
  const cities = await Stat.findOne({ label: /cities\s*covered/i }).lean();
  if (cities) {
    await Stat.updateOne(
      { _id: cities._id },
      { $set: { label: "Suburbs Covered" } },
    );
    console.log(`  ✓ Cities Covered → "Suburbs Covered"`);
  } else {
    console.log("  • Cities Covered stat not found.");
  }
}

async function migrateServices() {
  console.log("\n[Services]");

  // Remove the deprecated loan types entirely.
  const toRemove = [
    /personal\s*loan/i,
    /education\s*loan/i,
    /medical\s*loan/i,
  ];
  for (const rx of toRemove) {
    const res = await Service.deleteMany({ title: { $regex: rx } });
    if (res.deletedCount) {
      console.log(`  ✓ Deleted ${res.deletedCount} doc(s) matching ${rx}`);
    }
  }

  // Reorder remaining: Home → Business → Car.
  const ORDER = [
    { match: /home\s*loan/i, order: 1, label: "Home Loan" },
    { match: /business\s*loan/i, order: 2, label: "Business Loan" },
    { match: /car\s*loan/i, order: 3, label: "Car Loan" },
  ];
  for (const { match, order, label } of ORDER) {
    const doc = await Service.findOne({ title: { $regex: match } }).lean();
    if (!doc) {
      console.log(`  • ${label}: not present, skipped.`);
      continue;
    }
    const $set = {};
    if (doc.order !== order) $set.order = order;
    if (label === "Car Loan") {
      const nextTenure = (doc.tenure ?? "").replace(/84\s*months/i, "60 months");
      if (nextTenure !== doc.tenure) $set.tenure = nextTenure;
    }
    // Brand swap on title-adjacent copy (desc / features) only.
    const nextDesc = swapBrand(doc.desc);
    if (typeof doc.desc === "string" && nextDesc !== doc.desc) $set.desc = nextDesc;

    if (Object.keys($set).length) {
      await Service.updateOne({ _id: doc._id }, { $set });
      console.log(`  ✓ ${label}:`, Object.keys($set).join(", "));
    } else {
      console.log(`  • ${label}: already up to date.`);
    }
  }
}

async function migrateProcessSteps() {
  console.log("\n[ProcessStep]");

  const desired = [
    {
      num: "01",
      title: "Apply Online",
      desc: "Fill out the simple online form.",
      icon: "icofont-paper",
      order: 1,
    },
    {
      num: "02",
      title: "Share Documents",
      desc: "Share the required documents and know your borrowing capacity.",
      icon: "icofont-check-circled",
      order: 2,
    },
    {
      num: "03",
      title: "Choose Your Lender",
      desc: "Choose the best lenders from multiple options.",
      icon: "icofont-money",
      order: 3,
    },
  ];

  const existing = await ProcessStep.find().sort({ order: 1 }).lean();
  for (let i = 0; i < desired.length; i++) {
    const want = desired[i];
    const have = existing[i];
    if (!have) {
      await ProcessStep.create(want);
      console.log(`  ✓ Created step ${want.num} – ${want.title}`);
      continue;
    }
    const $set = {};
    for (const k of Object.keys(want)) {
      if (have[k] !== want[k]) $set[k] = want[k];
    }
    if (Object.keys($set).length) {
      await ProcessStep.updateOne({ _id: have._id }, { $set });
      console.log(`  ✓ Step ${want.num} (${want.title}):`, Object.keys($set).join(", "));
    } else {
      console.log(`  • Step ${want.num}: already up to date.`);
    }
  }
  // Trim extras beyond the first three.
  if (existing.length > desired.length) {
    const extras = existing.slice(desired.length);
    const ids = extras.map((d) => d._id);
    const res = await ProcessStep.deleteMany({ _id: { $in: ids } });
    if (res.deletedCount) {
      console.log(`  ✓ Removed ${res.deletedCount} extra step(s).`);
    }
  }
}

async function migrateTeam() {
  console.log("\n[TeamMember]");

  // Re-order the team in the exact sequence requested.
  const order = [
    "Arvind",
    "Lalit",
    "AD",
    "Harry",
    "Neha Kapani",
    "Swati Shukla",
    "Savi",
  ];

  for (let i = 0; i < order.length; i++) {
    const name = order[i];
    // Match the start of the name to be flexible about surnames. Short
    // initials like "AD" can also match in the middle of a fuller name.
    const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex =
      name.length <= 2
        ? new RegExp(`\\b${escaped}\\b`, "i")
        : new RegExp(`^${escaped}\\b`, "i");
    const member = await TeamMember.findOne({ name: { $regex: regex } }).lean();
    if (!member) {
      console.log(`  • "${name}": not in DB, skipped (please add via admin and re-run).`);
      continue;
    }
    if (member.order !== i + 1) {
      await TeamMember.updateOne(
        { _id: member._id },
        { $set: { order: i + 1 } },
      );
      console.log(`  ✓ ${member.name}: order → ${i + 1}`);
    } else {
      console.log(`  • ${member.name}: order already ${i + 1}.`);
    }
  }
}

async function migrateHero() {
  console.log("\n[Hero]");
  // The "low interest" floating bubble has been removed from the UI; blank
  // the corresponding fields so the admin no longer surfaces stale copy.
  await patchDoc(
    Hero,
    {},
    {
      badge2Title: "",
      badge2Subtitle: "",
      badge2Icon: "",
    },
    "Hero (remove low-interest bubble)",
  );
}

async function migrateFormFields() {
  console.log("\n[FormField]");
  const purpose = await FormField.findOne({ key: "purpose" }).lean();
  if (!purpose) {
    console.log("  • `purpose` field not in DB — will be created by API on first load.");
    return;
  }
  const $set = {};
  if (purpose.type !== "select") $set.type = "select";
  const wantOptions = ["Investment", "Owner Occupied", "Business Loan", "Car Loan"];
  if (JSON.stringify(purpose.options ?? []) !== JSON.stringify(wantOptions)) {
    $set.options = wantOptions;
  }
  if (purpose.placeholder !== "Select purpose") $set.placeholder = "Select purpose";
  if (!Object.keys($set).length) {
    console.log("  • purpose field already configured as select.");
    return;
  }
  await FormField.updateOne({ _id: purpose._id }, { $set });
  console.log("  ✓ purpose:", Object.keys($set).join(", "));
}

async function migrateChatbot() {
  console.log("\n[ChatbotQA]");

  // 1. Brand swap inside question / answer text.
  let rebranded = 0;
  const all = await ChatbotQA.find().lean();
  for (const qa of all) {
    const $set = {};
    const nextQ = swapBrand(qa.question);
    const nextA = swapBrand(qa.answer);
    if (typeof qa.question === "string" && nextQ !== qa.question) $set.question = nextQ;
    if (typeof qa.answer === "string" && nextA !== qa.answer) $set.answer = nextA;
    if (Object.keys($set).length) {
      await ChatbotQA.updateOne({ _id: qa._id }, { $set });
      rebranded++;
    }
  }
  if (rebranded) console.log(`  ✓ Rebranded ${rebranded} QA doc(s).`);
  else console.log("  • No QA docs needed brand swap.");

  // 2. Replace "24hr Approval" → "Fast Approval" wherever it appears.
  let approvalCount = 0;
  const approvalMatches = await ChatbotQA.find({
    $or: [{ question: /24hr\s*approval/i }, { answer: /24hr\s*approval/i }],
  }).lean();
  for (const qa of approvalMatches) {
    const $set = {};
    if (typeof qa.question === "string" && /24hr\s*approval/i.test(qa.question)) {
      $set.question = qa.question.replace(/24hr\s*Approval/gi, "Fast Approval");
    }
    if (typeof qa.answer === "string" && /24hr\s*approval/i.test(qa.answer)) {
      $set.answer = qa.answer.replace(/24hr\s*Approval/gi, "Fast Approval");
    }
    if (Object.keys($set).length) {
      await ChatbotQA.updateOne({ _id: qa._id }, { $set });
      approvalCount++;
    }
  }
  if (approvalCount) {
    console.log(`  ✓ Updated "24hr Approval" → "Fast Approval" in ${approvalCount} doc(s).`);
  }

  // 3. Quick-reply curation: hide Personal Loan, ensure the four new options
  //    are present and marked as quick replies.
  const newQuickReplies = [
    {
      question: "Owner Occupied",
      answer:
        "🏠 **Owner-Occupied Home Loan**\n\n• For properties you'll live in yourself\n• Lowest interest tier starting at **6.90% p.a.**\n• Tenure up to **30 years**\n• Up to **80–90%** of property value financed\n\nWould you like to apply or check your borrowing capacity?",
      keywords: ["owner", "occupied", "self", "home", "live in", "primary"],
    },
    {
      question: "Investment",
      answer:
        "📈 **Investment Property Loan**\n\n• For buy-to-let or investment properties\n• Competitive interest rates with flexible repayment\n• Rental income can be considered for eligibility\n• Tax benefits available on interest paid\n\nWant a personalised quote? Tap **Apply Now**.",
      keywords: ["investment", "buy to let", "rental", "second home"],
    },
    {
      question: "Business Loan",
      answer:
        "💼 **Business Loan at Smart Loans**\n\n• Interest rate from **10.2% p.a.**\n• Loan amount up to **₹50,00,000**\n• Tenure up to **84 months**\n• Minimal paperwork & fast disbursal\n\nIdeal for working capital, expansion, equipment, and more.",
      keywords: ["business", "sme", "working capital", "expansion"],
    },
    {
      question: "Car Loan",
      answer:
        "🚗 **Car Loan at Smart Loans**\n\n• Interest rate from **8.70% p.a.**\n• Up to **95% financing** for new & used cars\n• Tenure up to **60 months**\n• Doorstep service and quick approval\n\nReady to drive home your dream car?",
      keywords: ["car", "vehicle", "auto", "automobile"],
    },
  ];

  // Demote "Personal Loan" from quick replies (don't delete the QA — it's
  // still useful as searchable content, just no longer a button).
  const demoted = await ChatbotQA.updateMany(
    { question: /^personal\s*loan$/i, isQuickReply: true },
    { $set: { isQuickReply: false } },
  );
  if (demoted.modifiedCount) {
    console.log(`  ✓ Demoted ${demoted.modifiedCount} "Personal Loan" QA from quick replies.`);
  }

  // Ensure each new quick-reply QA exists, is up to date, and is a quick reply.
  let nextOrder = 1;
  const existingQuick = await ChatbotQA.find({ isQuickReply: true })
    .sort({ order: 1 })
    .lean();
  if (existingQuick.length) {
    nextOrder = Math.max(...existingQuick.map((q) => q.order ?? 0)) + 1;
  }
  for (const qa of newQuickReplies) {
    const existing = await ChatbotQA.findOne({
      question: { $regex: new RegExp(`^${qa.question}$`, "i") },
    }).lean();
    if (existing) {
      const $set = { isQuickReply: true };
      if (existing.answer !== qa.answer) $set.answer = qa.answer;
      if (!Array.isArray(existing.keywords) || existing.keywords.length === 0) {
        $set.keywords = qa.keywords;
      }
      await ChatbotQA.updateOne({ _id: existing._id }, { $set });
      console.log(`  ✓ Quick reply ready: ${qa.question}`);
    } else {
      await ChatbotQA.create({
        question: qa.question,
        answer: qa.answer,
        keywords: qa.keywords,
        isQuickReply: true,
        order: nextOrder++,
      });
      console.log(`  ✓ Created quick reply: ${qa.question}`);
    }
  }
}

// ── Entrypoint ────────────────────────────────────────────────────────────────

async function main() {
  console.log("Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("Connected ✓");

  try {
    await migrateSettings();
    await migrateFooterContent();
    await migrateHomeContent();
    await migrateAboutPage();
    await migrateStats();
    await migrateServices();
    await migrateProcessSteps();
    await migrateTeam();
    await migrateHero();
    await migrateFormFields();
    await migrateChatbot();
    console.log("\n✅  Migration complete.");
  } catch (err) {
    console.error("\n❌  Migration failed:", err);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

main();
