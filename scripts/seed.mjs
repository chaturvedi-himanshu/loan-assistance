/**
 * Seed script — populates MongoDB with the current hardcoded site content.
 * Run: node scripts/seed.mjs
 *
 * Requires MONGODB_URI in .env.local (loaded automatically via dotenv).
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

// ── Schema helpers ────────────────────────────────────────────────────────────
const { Schema } = mongoose;

const Settings =
  mongoose.models.Settings ??
  mongoose.model(
    "Settings",
    new Schema({}, { strict: false, timestamps: true }),
  );
const Hero =
  mongoose.models.Hero ??
  mongoose.model("Hero", new Schema({}, { strict: false, timestamps: true }));
const Stat =
  mongoose.models.Stat ??
  mongoose.model("Stat", new Schema({}, { strict: false, timestamps: true }));
const Service =
  mongoose.models.Service ??
  mongoose.model(
    "Service",
    new Schema({}, { strict: false, timestamps: true }),
  );
const WhyChooseUs =
  mongoose.models.WhyChooseUs ??
  mongoose.model(
    "WhyChooseUs",
    new Schema({}, { strict: false, timestamps: true }),
  );
const TeamMember =
  mongoose.models.TeamMember ??
  mongoose.model(
    "TeamMember",
    new Schema({}, { strict: false, timestamps: true }),
  );
const Testimonial =
  mongoose.models.Testimonial ??
  mongoose.model(
    "Testimonial",
    new Schema({}, { strict: false, timestamps: true }),
  );
const BlogPost =
  mongoose.models.BlogPost ??
  mongoose.model(
    "BlogPost",
    new Schema({}, { strict: false, timestamps: true }),
  );
const ProcessStep =
  mongoose.models.ProcessStep ??
  mongoose.model(
    "ProcessStep",
    new Schema({}, { strict: false, timestamps: true }),
  );
const Partner =
  mongoose.models.Partner ??
  mongoose.model(
    "Partner",
    new Schema({}, { strict: false, timestamps: true }),
  );
const ChatbotQA =
  mongoose.models.ChatbotQA ??
  mongoose.model(
    "ChatbotQA",
    new Schema({}, { strict: false, timestamps: true }),
  );

// ── Seed data ─────────────────────────────────────────────────────────────────

const settingsData = {
  siteName: "Smart Loans",
  tagline: "Banking & Business Loan",
  phone1: "+1 (800) 694-8956",
  phone2: "88 487 983 576",
  email: "hello@Smart Loans.com",
  address: "42 Finance Tower, New York, NY 10001",
  workingHours: "Mon – Sat: 9 AM – 6 PM",
  facebookUrl: "#",
  twitterUrl: "#",
  linkedinUrl: "#",
  instagramUrl: "#",
  youtubeUrl: "#",
};

const heroData = {
  eyebrow: "Trusted by 50,000+ customers",
  title: "Fast, Flexible & Trusted Loan Solutions",
  subtitle:
    "Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges.",
  ctaPrimary: "Apply Now",
  ctaSecondary: "Learn More",
  stat1Value: "50K+",
  stat1Label: "Happy Customers",
  stat2Value: "₹500Cr+",
  stat2Label: "Disbursed",
  stat3Value: "24 Hrs",
  stat3Label: "Approval Time",
  image: "/images/slider/2.png",
};

const statsData = [
  {
    icon: "icofont-people",
    value: "25,000+",
    label: "Happy Customers",
    color: "#2cbbdf",
    order: 1,
  },
  {
    icon: "icofont-money",
    value: "₹2B+",
    label: "Loans Processed",
    color: "#f0734a",
    order: 2,
  },
  {
    icon: "icofont-check-circled",
    value: "98%",
    label: "Approval Rate",
    color: "#27ae60",
    order: 3,
  },
  {
    icon: "icofont-globe",
    value: "50+",
    label: "Cities Covered",
    color: "#e91e8c",
    order: 4,
  },
];

const servicesData = [
  {
    icon: "flaticon-money",
    rate: "9.35%",
    title: "Personal Loan",
    amount: "₹2,00,000",
    tenure: "Up to 60 months",
    desc: "Ideal for urgent expenses, travel plans, medical support, and lifestyle goals with quick approval.",
    features: [
      "No collateral required",
      "Instant e-approval",
      "Flexible EMI options",
    ],
    color: "#2cbbdf",
    order: 1,
  },
  {
    icon: "flaticon-resume",
    rate: "9.35%",
    title: "Education Loan",
    amount: "₹10,00,000",
    tenure: "Up to 120 months",
    desc: "Support your academic journey with tuition, hostel, books, and international education coverage.",
    features: [
      "Moratorium available",
      "Tax benefits",
      "Parent co-applicant support",
    ],
    color: "#2196f3",
    order: 2,
  },
  {
    icon: "flaticon-mortgage-loan",
    rate: "10.2%",
    title: "Business Loan",
    amount: "₹5,00,000",
    tenure: "Up to 84 months",
    desc: "Get working capital, expansion funds, and inventory financing tailored for SMEs and startups.",
    features: ["Fast disbursal", "Minimal paperwork", "Overdraft option"],
    color: "#f0734a",
    order: 3,
  },
  {
    icon: "flaticon-loan-2",
    rate: "9.35%",
    title: "Car Loan",
    amount: "₹3,00,000",
    tenure: "Up to 84 months",
    desc: "Buy a new or used car with affordable monthly installments and simple digital documentation.",
    features: [
      "Up to 95% financing",
      "Used car support",
      "Doorstep processing",
    ],
    color: "#27ae60",
    order: 4,
  },
  {
    icon: "flaticon-loan-1",
    rate: "18.5%",
    title: "Medical Loan",
    amount: "₹1,00,000",
    tenure: "Up to 48 months",
    desc: "Handle emergency treatments and planned procedures with quick access to healthcare financing.",
    features: [
      "Emergency approvals",
      "Cashless partner network",
      "No hidden charges",
    ],
    color: "#e91e8c",
    order: 5,
  },
  {
    icon: "flaticon-mortgage-loan",
    rate: "6.90%",
    title: "Home Loan",
    amount: "₹50,00,000",
    tenure: "Up to 360 months",
    desc: "Own your dream home with low interest rates and long-term repayment plans designed for families.",
    features: [
      "Top-up facility",
      "Balance transfer",
      "Dedicated relationship manager",
    ],
    color: "#ff9800",
    order: 6,
  },
];

const whyData = [
  {
    icon: "icofont-flash",
    title: "Lightning Fast Approval",
    desc: "Get your loan approved within 24 hours. No lengthy paperwork, no endless waiting.",
    color: "#2cbbdf",
    bg: "rgba(44,187,223,0.10)",
    order: 1,
  },
  {
    icon: "icofont-shield-alt",
    title: "Bank-Level Security",
    desc: "Your data is protected by 256-bit SSL encryption and strict privacy protocols.",
    color: "#27ae60",
    bg: "rgba(39,174,96,0.10)",
    order: 2,
  },
  {
    icon: "icofont-money",
    title: "Lowest Interest Rates",
    desc: "We offer the most competitive rates in the market, starting from just 8.5% p.a.",
    color: "#f0734a",
    bg: "rgba(240,115,74,0.10)",
    order: 3,
  },
  {
    icon: "icofont-ui-calculator",
    title: "Flexible Repayment",
    desc: "Choose your own repayment tenure from 6 to 360 months to fit your budget.",
    color: "#e91e8c",
    bg: "rgba(233,30,140,0.10)",
    order: 4,
  },
  {
    icon: "icofont-support",
    title: "24 / 7 Expert Support",
    desc: "Our dedicated team of financial advisors is always available to guide you.",
    color: "#2196f3",
    bg: "rgba(33,150,243,0.10)",
    order: 5,
  },
  {
    icon: "icofont-paper",
    title: "Zero Hidden Charges",
    desc: "Complete transparency in every transaction. What you see is exactly what you pay.",
    color: "#ff9800",
    bg: "rgba(255,152,0,0.10)",
    order: 6,
  },
];

const teamData = [
  {
    name: "Roxanne Bryant",
    role: "Managing Director",
    image: "/images/team/1.png",
    order: 1,
  },
  {
    name: "Dominic Jefferson",
    role: "Head of Marketing",
    image: "/images/team/2.png",
    order: 2,
  },
  {
    name: "Mercedes Baldwin",
    role: "General Manager",
    image: "/images/team/3.png",
    order: 3,
  },
  {
    name: "Gertrude Keller",
    role: "Commercial Manager",
    image: "/images/team/4.png",
    order: 4,
  },
];

const testimonialsData = [
  {
    name: "Austin Matthews",
    role: "Business Owner",
    stars: 5,
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    image: "/images/about/5.png",
    order: 1,
  },
  {
    name: "Evelyn Goodman",
    role: "Freelancer",
    stars: 5,
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    image: "/images/about/5.png",
    order: 2,
  },
  {
    name: "Calvin Cannon",
    role: "Entrepreneur",
    stars: 5,
    text: "From time time we need generate sample names to populate a test database usually just requiring first and last names address.",
    image: "/images/about/5.png",
    order: 3,
  },
];

const processStepsData = [
  {
    num: "01",
    title: "Apply Bank Loan",
    desc: "Fill out our simple online form in just a few minutes.",
    icon: "icofont-paper",
    order: 1,
  },
  {
    num: "02",
    title: "Approved Bank Loan",
    desc: "Our team reviews and approves your application quickly.",
    icon: "icofont-check-circled",
    order: 2,
  },
  {
    num: "03",
    title: "Review Your Loan",
    desc: "Receive funds and manage repayments with ease.",
    icon: "icofont-money",
    order: 3,
  },
];

const partnersData = [
  {
    type: "partner",
    name: "HDFC Bank",
    icon: "icofont-bank",
    color: "#004c8f",
    org: "",
    text: "",
    order: 1,
  },
  {
    type: "partner",
    name: "ICICI Bank",
    icon: "icofont-institution",
    color: "#f37021",
    org: "",
    text: "",
    order: 2,
  },
  {
    type: "partner",
    name: "Axis Bank",
    icon: "icofont-money",
    color: "#97144d",
    org: "",
    text: "",
    order: 3,
  },
  {
    type: "partner",
    name: "SBI",
    icon: "icofont-building",
    color: "#22509d",
    org: "",
    text: "",
    order: 4,
  },
  {
    type: "partner",
    name: "Kotak Bank",
    icon: "icofont-ui-wallet",
    color: "#ed1c24",
    org: "",
    text: "",
    order: 5,
  },
  {
    type: "partner",
    name: "Yes Bank",
    icon: "icofont-chart-bar",
    color: "#0052a2",
    org: "",
    text: "",
    order: 6,
  },
  {
    type: "award",
    name: "Best Loan Provider 2024",
    icon: "icofont-badge",
    color: "#2cbbdf",
    org: "Finance India Awards",
    text: "",
    order: 7,
  },
  {
    type: "award",
    name: "Customer Choice Award",
    icon: "icofont-star",
    color: "#f0734a",
    org: "Banking Excellence 2024",
    text: "",
    order: 8,
  },
  {
    type: "award",
    name: "Most Trusted Brand",
    icon: "icofont-shield-alt",
    color: "#27ae60",
    org: "Consumer Voice Report",
    text: "",
    order: 9,
  },
  {
    type: "award",
    name: "ISO 9001:2015 Certified",
    icon: "icofont-certificate-alt-1",
    color: "#2196f3",
    org: "Quality Management",
    text: "",
    order: 10,
  },
  {
    type: "certification",
    name: "256-bit SSL Encrypted",
    icon: "icofont-lock",
    color: "#2cbbdf",
    org: "",
    text: "256-bit SSL Encrypted",
    order: 11,
  },
  {
    type: "certification",
    name: "RBI Registered NBFC",
    icon: "icofont-check-circled",
    color: "#27ae60",
    org: "",
    text: "RBI Registered NBFC",
    order: 12,
  },
  {
    type: "certification",
    name: "ISO 27001 Certified",
    icon: "icofont-safety",
    color: "#f0734a",
    org: "",
    text: "ISO 27001 Certified",
    order: 13,
  },
  {
    type: "certification",
    name: "PCI DSS Compliant",
    icon: "icofont-shield",
    color: "#e91e8c",
    org: "",
    text: "PCI DSS Compliant",
    order: 14,
  },
];

const chatbotQAData = [
  {
    question: "Personal Loan",
    answer:
      "🏦 **Personal Loans** at Smart Loans start from just **9.35% p.a.**\n\nYou can borrow up to ₹2,00,000 with a tenure of up to 60 months. No collateral required!\n\n✅ Instant approval | ✅ Minimal docs | ✅ Flexible EMI",
    keywords: ["personal", "personal loan", "urgent", "individual"],
    isQuickReply: true,
    order: 1,
  },
  {
    question: "Business Loan",
    answer:
      "💼 **Business Loans** are available from **10.2% p.a.**\n\nGet up to ₹5,00,000 for working capital, expansion, or inventory — with tenure up to 84 months.\n\n✅ Fast disbursal | ✅ Minimal paperwork | ✅ Overdraft option",
    keywords: ["business", "sme", "startup", "enterprise", "shop", "company"],
    isQuickReply: true,
    order: 2,
  },
  {
    question: "Interest Rates",
    answer:
      "📊 **Our Interest Rates** are among the most competitive in the market:\n\n• Personal Loan: from **9.35% p.a.**\n• Business Loan: from **10.2% p.a.**\n• Home Loan: from **6.90% p.a.**\n• Education Loan: from **9.35% p.a.**\n• Car Loan: from **8.70% p.a.**\n\n💡 Rates depend on credit score and loan amount.",
    keywords: ["interest", "rate", "percentage", "charges", "cost", "fee"],
    isQuickReply: true,
    order: 3,
  },
  {
    question: "Apply Now",
    answer:
      "🚀 Applying is super easy! Here's how:\n\n1. Fill our **online form** (takes 3 minutes)\n2. Upload basic documents\n3. Get approval in **24 hours**\n4. Funds in your account!\n\nWould you like me to get you started?",
    keywords: [
      "apply",
      "application",
      "start",
      "begin",
      "how to get",
      "process",
    ],
    isQuickReply: true,
    order: 4,
  },
  {
    question: "Contact Us",
    answer:
      "📞 You can reach us at:\n\n• **Phone:** +1 (800) 694-8956\n• **Email:** hello@Smart Loans.com\n• **Hours:** Mon–Sat, 9 AM – 6 PM\n\nOr would you like us to **call you back**? Just let me know!",
    keywords: ["contact", "phone", "email", "call", "reach", "help", "support"],
    isQuickReply: true,
    order: 5,
  },
  {
    question: "Home Loan",
    answer:
      "🏠 **Home Loans** starting at just **6.90% p.a.**\n\nBorrow up to ₹50,00,000 with tenure up to 360 months (30 years)!\n\n✅ Balance transfer available\n✅ Top-up facility\n✅ Dedicated relationship manager",
    keywords: ["home", "house", "property", "mortgage", "flat", "apartment"],
    isQuickReply: false,
    order: 6,
  },
  {
    question: "Education Loan",
    answer:
      "🎓 **Education Loans** at **9.35% p.a.**\n\nCover tuition, hostel, books & more — up to ₹10,00,000 with a moratorium period while you study.\n\n✅ Tax benefits under Sec 80E\n✅ Parent co-applicant accepted\n✅ International study covered",
    keywords: [
      "education",
      "study",
      "college",
      "school",
      "student",
      "degree",
      "course",
    ],
    isQuickReply: false,
    order: 7,
  },
  {
    question: "Car Loan",
    answer:
      "🚗 **Car Loans** from **8.70% p.a.**\n\nBuy a new or pre-owned car with up to 95% financing and tenure up to 84 months.\n\n✅ Used cars covered\n✅ Doorstep processing\n✅ Quick disbursal",
    keywords: ["car", "vehicle", "auto", "bike", "two wheeler", "four wheeler"],
    isQuickReply: false,
    order: 8,
  },
  {
    question: "Documents required",
    answer:
      "📋 **Documents needed** for most loans:\n\n• ID Proof (Aadhaar/PAN/Passport)\n• Address Proof\n• Last 3 months bank statements\n• Income proof / salary slips\n• Passport size photo\n\nWe keep it **minimal** — no unnecessary paperwork!",
    keywords: [
      "document",
      "documents",
      "papers",
      "kyc",
      "id proof",
      "required",
      "need",
    ],
    isQuickReply: false,
    order: 9,
  },
  {
    question: "Loan approval time",
    answer:
      "⚡ **Approval in as fast as 24 hours!**\n\nOur digital process means:\n• Application: 3 minutes online\n• Verification: Same day\n• Approval: Within 24 hours\n• Disbursal: 1–2 business days\n\nNo more waiting in long queues!",
    keywords: [
      "time",
      "how long",
      "approval",
      "fast",
      "quick",
      "when",
      "days",
      "hours",
    ],
    isQuickReply: false,
    order: 10,
  },
  {
    question: "EMI calculation",
    answer:
      "🧮 **Use our EMI Calculator** to plan your loan!\n\nSimply scroll to the **EMI Calculator section** on our homepage and enter:\n• Loan amount\n• Interest rate\n• Tenure\n\nIt instantly shows your monthly EMI!",
    keywords: [
      "emi",
      "installment",
      "monthly",
      "calculate",
      "payment",
      "repay",
    ],
    isQuickReply: false,
    order: 11,
  },
  {
    question: "Credit score",
    answer:
      "📈 **Credit Score Tips:**\n\n• Score above 750 = best rates\n• Score 700–750 = good rates\n• Below 700 = we still try to help!\n\nWe work with customers across all credit profiles. Our experts can guide you to improve your score too!",
    keywords: ["credit", "score", "cibil", "credit score", "rating"],
    isQuickReply: false,
    order: 12,
  },
];

const blogData = [
  {
    title: "What should you need do to get personal loan very easily.",
    slug: "how-to-get-personal-loan",
    category: "Finance",
    author: "Admin",
    date: "2026-04-02",
    image: "/images/blog/1.jpg",
    excerpt:
      "Many modern alternatives often eumen incorpo other content actually detracts from your message.",
    content:
      "<p>Getting a personal loan has become simpler than ever. Here are the key steps to follow...</p><p>First, check your credit score. A score above 700 significantly improves your chances of approval and helps you secure lower interest rates.</p><p>Next, gather your documents: ID proof, income statements, and bank statements for the past 3-6 months.</p>",
    published: true,
  },
  {
    title: "Top 5 tips to improve your credit score before applying.",
    slug: "improve-credit-score-tips",
    category: "Tips",
    author: "Admin",
    date: "2026-04-07",
    image: "/images/blog/2.jpg",
    excerpt:
      "Many modern alternatives often eumen incorpo other content actually detracts from your message.",
    content:
      "<p>A good credit score is your ticket to better loan terms. Here are 5 practical tips to boost yours before applying for any loan...</p><p>1. Pay all your bills on time. 2. Keep your credit utilization below 30%. 3. Avoid applying for multiple loans simultaneously. 4. Check your credit report for errors regularly. 5. Maintain old credit accounts to show a longer credit history.</p>",
    published: true,
  },
  {
    title: "Understanding EMI: A complete guide for first-time borrowers.",
    slug: "understanding-emi-guide",
    category: "Personal Finance",
    author: "Admin",
    date: "2026-04-12",
    image: "/images/blog/3.jpg",
    excerpt:
      "EMI stands for Equated Monthly Installment. Learn everything you need to know before signing any loan agreement.",
    content:
      "<p>An EMI (Equated Monthly Installment) is a fixed payment made to a lender each month on a specified date. It is composed of both the principal and interest components...</p>",
    published: true,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("✅  Connected.");

  // Singleton documents (upsert)
  await Settings.findOneAndUpdate({}, settingsData, {
    upsert: true,
    new: true,
  });
  console.log("✅  Settings seeded.");

  await Hero.findOneAndUpdate({}, heroData, { upsert: true, new: true });
  console.log("✅  Hero seeded.");

  // Array collections — clear first, then insert fresh
  const collections = [
    { model: Stat, data: statsData, name: "Stats" },
    { model: Service, data: servicesData, name: "Services" },
    { model: WhyChooseUs, data: whyData, name: "Why Choose Us" },
    { model: ProcessStep, data: processStepsData, name: "Process Steps" },
    { model: Partner, data: partnersData, name: "Partners & Awards" },
    { model: ChatbotQA, data: chatbotQAData, name: "Chatbot Q&As" },
    { model: TeamMember, data: teamData, name: "Team Members" },
    { model: Testimonial, data: testimonialsData, name: "Testimonials" },
    { model: BlogPost, data: blogData, name: "Blog Posts" },
  ];

  for (const { model, data, name } of collections) {
    await model.deleteMany({});
    await model.insertMany(data);
    console.log(`✅  ${name} seeded (${data.length} records).`);
  }

  console.log("\n🎉  All collections seeded successfully!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
