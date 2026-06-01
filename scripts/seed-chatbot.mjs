/**
 * Chatbot Q&A seed — 65+ questions related to Smart Loans's business.
 * Run: node scripts/seed-chatbot.mjs
 */

import mongoose from "mongoose";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

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
  /* ignore */
}

const URI = process.env.MONGODB_URI;
if (!URI) {
  console.error("❌  MONGODB_URI not set");
  process.exit(1);
}

const ChatbotQA =
  mongoose.models.ChatbotQA ??
  mongoose.model(
    "ChatbotQA",
    new mongoose.Schema({}, { strict: false, timestamps: true }),
  );

// ── 65+ Q&As ─────────────────────────────────────────────────────────────────

const qaData = [
  // ── Quick Reply Buttons (shown upfront) ──────────────────────────────────
  {
    question: "Personal Loan",
    answer:
      "🏦 **Personal Loan at Smart Loans**\n\n• Interest rate: Starting from **9.35% p.a.**\n• Loan amount: Up to **₹2,00,000**\n• Tenure: Up to **60 months**\n• Approval: Within **24 hours**\n\n✅ No collateral required\n✅ Minimal documentation\n✅ Flexible EMI plans\n\nWould you like to apply or get a callback from our advisor?",
    keywords: [
      "personal",
      "personal loan",
      "salaried",
      "self employed",
      "individual",
      "urgent money",
      "quick loan",
    ],
    isQuickReply: true,
    order: 1,
  },
  {
    question: "Business Loan",
    answer:
      "💼 **Business Loan at Smart Loans**\n\n• Interest rate: Starting from **10.2% p.a.**\n• Loan amount: Up to **₹5,00,000**\n• Tenure: Up to **84 months**\n\n✅ Working capital support\n✅ Fast disbursal in 48 hrs\n✅ Overdraft facility available\n\nPerfect for SMEs, startups, and growing businesses. Want to apply?",
    keywords: [
      "business",
      "sme",
      "startup",
      "enterprise",
      "shop",
      "company",
      "firm",
      "trade",
      "working capital",
      "msme",
    ],
    isQuickReply: true,
    order: 2,
  },
  {
    question: "Interest Rates",
    answer:
      "📊 **Smart Loans Interest Rates (2024)**\n\n| Loan Type | Rate |\n|---|---|\n| Personal Loan | 9.35% p.a. |\n| Business Loan | 10.2% p.a. |\n| Home Loan | 6.90% p.a. |\n| Education Loan | 9.35% p.a. |\n| Car Loan | 8.70% p.a. |\n| Medical Loan | 18.5% p.a. |\n\n💡 Rates are based on credit score and loan profile. Apply now for a personalized quote!",
    keywords: [
      "interest",
      "rate",
      "percentage",
      "charges",
      "cost",
      "fee",
      "roi",
      "interest rate",
      "rate of interest",
    ],
    isQuickReply: true,
    order: 3,
  },
  {
    question: "Apply Now",
    answer:
      '🚀 **Apply for a Loan in 3 Easy Steps!**\n\n1️⃣ **Fill Form** — Takes only 3 minutes online\n2️⃣ **Upload Documents** — Aadhaar, PAN & bank statement\n3️⃣ **Get Approved** — Decision within 24 hours!\n\nFunds are credited to your account within 1–2 business days after approval.\n\n👉 Click "Apply Now →" below to start!',
    keywords: [
      "apply",
      "application",
      "start",
      "begin",
      "how to get",
      "process",
      "loan apply",
      "get loan",
    ],
    isQuickReply: true,
    order: 4,
  },
  {
    question: "Contact Us",
    answer:
      "📞 **Get in Touch with Smart Loans**\n\n• **Phone:** +1 (800) 694-8956\n• **Alternate:** 88 487 983 576\n• **Email:** hello@Smart Loans.com\n• **Working Hours:** Mon–Sat, 9 AM – 6 PM\n• **Address:** 42 Finance Tower, New York, NY 10001\n\nWould you like us to **call you back**? I can schedule that right now! 📱",
    keywords: [
      "contact",
      "phone",
      "email",
      "call",
      "reach",
      "help",
      "support",
      "office",
      "address",
      "location",
    ],
    isQuickReply: true,
    order: 5,
  },

  // ── Home Loan ─────────────────────────────────────────────────────────────
  {
    question: "Home Loan",
    answer:
      "🏠 **Home Loan at Smart Loans**\n\n• Interest rate: Starting from **6.90% p.a.**\n• Loan amount: Up to **₹50,00,000**\n• Tenure: Up to **360 months (30 years)**\n\n✅ Balance transfer facility\n✅ Top-up loan option\n✅ Tax benefits under Section 24\n✅ Dedicated relationship manager\n\nMake your dream home a reality today!",
    keywords: [
      "home",
      "house",
      "property",
      "mortgage",
      "flat",
      "apartment",
      "villa",
      "plot",
      "real estate",
      "home loan",
    ],
    isQuickReply: false,
    order: 6,
  },
  {
    question: "Home loan eligibility",
    answer:
      "🏠 **Home Loan Eligibility Criteria:**\n\n• **Age:** 21–65 years\n• **Employment:** Salaried or self-employed\n• **Min Income:** ₹25,000/month (salaried)\n• **Credit Score:** 700+ preferred\n• **Work Experience:** Min 2 years\n\nThe eligible loan amount = typically **60× your monthly income**.\n\nWant to check your exact eligibility? Let our advisor help!",
    keywords: [
      "home loan eligibility",
      "eligible for home",
      "qualify home",
      "home loan criteria",
    ],
    isQuickReply: false,
    order: 7,
  },

  // ── Education Loan ────────────────────────────────────────────────────────
  {
    question: "Education Loan",
    answer:
      "🎓 **Education Loan at Smart Loans**\n\n• Interest rate: Starting from **9.35% p.a.**\n• Loan amount: Up to **₹10,00,000**\n• Tenure: Up to **120 months**\n• Moratorium period available during study\n\n✅ Covers tuition, hostel & books\n✅ Tax benefits under Section 80E\n✅ International education covered\n✅ Parent as co-applicant accepted",
    keywords: [
      "education",
      "study",
      "college",
      "school",
      "student",
      "degree",
      "course",
      "university",
      "abroad",
      "education loan",
    ],
    isQuickReply: false,
    order: 8,
  },

  // ── Car Loan ──────────────────────────────────────────────────────────────
  {
    question: "Car Loan",
    answer:
      "🚗 **Car Loan at Smart Loans**\n\n• Interest rate: Starting from **8.70% p.a.**\n• Loan amount: Up to **₹3,00,000**\n• Tenure: Up to **84 months**\n• Financing: Up to **95% of car value**\n\n✅ New & used cars covered\n✅ Doorstep document pickup\n✅ Quick disbursal in 48 hrs\n\nDrive your dream car today! 🚙",
    keywords: [
      "car",
      "vehicle",
      "auto",
      "automobile",
      "car loan",
      "bike",
      "two wheeler",
      "four wheeler",
      "used car",
    ],
    isQuickReply: false,
    order: 9,
  },

  // ── Medical Loan ──────────────────────────────────────────────────────────
  {
    question: "Medical Loan",
    answer:
      "🏥 **Medical / Healthcare Loan at Smart Loans**\n\n• Interest rate: Starting from **18.5% p.a.**\n• Loan amount: Up to **₹1,00,000**\n• Tenure: Up to **48 months**\n• Approval: As fast as **4 hours** for emergencies!\n\n✅ Cashless partner hospital network\n✅ No income proof for emergency cases\n✅ Zero prepayment penalty",
    keywords: [
      "medical",
      "hospital",
      "health",
      "treatment",
      "surgery",
      "emergency",
      "healthcare",
      "medicine",
      "medical loan",
    ],
    isQuickReply: false,
    order: 10,
  },

  // ── Eligibility ───────────────────────────────────────────────────────────
  {
    question: "Loan eligibility",
    answer:
      "📋 **General Loan Eligibility at Smart Loans:**\n\n• **Age:** 21–60 years (salaried) | 21–65 (self-employed)\n• **Income:** ₹15,000+/month minimum\n• **Credit Score:** 650+ (higher = better rates)\n• **Employment:** Min 1 year at current job (salaried)\n• **Business:** Min 2 years in operation (self-employed)\n\n💡 Even if your score is low, we have special programs. Let's talk!",
    keywords: [
      "eligibility",
      "eligible",
      "qualify",
      "criteria",
      "requirement",
      "who can apply",
      "am i eligible",
    ],
    isQuickReply: false,
    order: 11,
  },
  {
    question: "Minimum salary for loan",
    answer:
      "💰 **Minimum Income Required:**\n\n• **Personal Loan:** ₹15,000/month\n• **Home Loan:** ₹25,000/month\n• **Car Loan:** ₹20,000/month\n• **Business Loan:** ₹50,000 monthly turnover\n• **Education Loan:** Co-applicant income considered\n\nWe evaluate your full financial profile, not just salary. Overtime, bonuses & rental income count too!",
    keywords: [
      "minimum salary",
      "salary requirement",
      "income required",
      "minimum income",
      "how much salary",
    ],
    isQuickReply: false,
    order: 12,
  },

  // ── Documents ─────────────────────────────────────────────────────────────
  {
    question: "Documents required",
    answer:
      "📋 **Documents Needed for Loan Application:**\n\n**Identity & Address:**\n• Aadhaar Card / PAN Card / Passport\n• Voter ID / Driving License\n\n**Income Proof:**\n• Last 3 months salary slips (salaried)\n• Last 2 years ITR (self-employed)\n• 6 months bank statements\n\n**For Home Loan:** Property documents + NOC\n**For Car Loan:** Vehicle quotation\n\nWe keep it **minimal and digital**! No physical visits needed. 📱",
    keywords: [
      "document",
      "documents",
      "papers",
      "kyc",
      "id proof",
      "required",
      "need",
      "what documents",
      "which documents",
    ],
    isQuickReply: false,
    order: 13,
  },
  {
    question: "Can I apply without PAN card",
    answer:
      "🪪 **PAN Card Requirement:**\n\nPAN card is **mandatory** for loans above ₹50,000 as per RBI guidelines.\n\nHowever, if you don't have a PAN card:\n• You can apply for a PAN card online at incometax.gov.in (takes 7–10 days)\n• Some micro-loans under ₹50,000 may not require PAN\n\nNeed help with the process? Our advisors can guide you!",
    keywords: [
      "pan card",
      "without pan",
      "no pan",
      "pan required",
      "pan card required",
    ],
    isQuickReply: false,
    order: 14,
  },

  // ── Approval & Process ────────────────────────────────────────────────────
  {
    question: "Loan approval time",
    answer:
      "⚡ **How Fast Is Loan Approval?**\n\n• **Application:** 3 minutes online\n• **Document verification:** Same day\n• **Approval decision:** Within **24 hours**\n• **Disbursal:** 1–2 business days\n\nFor emergency medical loans: approval in **4 hours**!\n\nNo more waiting in queues or visiting branches. Everything is 100% digital! 💻",
    keywords: [
      "time",
      "how long",
      "approval time",
      "fast",
      "quick",
      "when",
      "days",
      "hours",
      "how fast",
      "speed",
    ],
    isQuickReply: false,
    order: 15,
  },
  {
    question: "Loan rejection reasons",
    answer:
      "❌ **Common Loan Rejection Reasons:**\n\n1. Low credit score (below 600)\n2. High existing EMI obligations\n3. Unstable employment history\n4. Incorrect or incomplete documents\n5. Too many recent loan applications\n6. Low income relative to loan amount\n\n💡 **Don't worry!** If rejected, our advisors can:\n• Help you identify the issue\n• Suggest steps to improve eligibility\n• Find alternative loan products for you",
    keywords: [
      "rejected",
      "rejection",
      "why rejected",
      "loan denied",
      "not approved",
      "declined",
    ],
    isQuickReply: false,
    order: 16,
  },
  {
    question: "Loan status check",
    answer:
      '🔍 **Check Your Loan Status:**\n\n• **Online:** Log in to your Smart Loans account at Smart Loans.com/portal\n• **SMS:** Send "LOANSTATUS [Application ID]" to 56789\n• **Call:** +1 (800) 694-8956 (Mon–Sat, 9 AM–6 PM)\n• **Email:** status@Smart Loans.com\n\nYou\'ll also receive real-time SMS and email updates at every stage of your application! 📱',
    keywords: [
      "status",
      "loan status",
      "application status",
      "check status",
      "track loan",
      "where is my loan",
    ],
    isQuickReply: false,
    order: 17,
  },

  // ── EMI & Repayment ───────────────────────────────────────────────────────
  {
    question: "EMI calculation",
    answer:
      "🧮 **Calculate Your EMI Instantly!**\n\n**EMI Formula:** EMI = P × r × (1+r)ⁿ / [(1+r)ⁿ - 1]\n\n**Example for ₹1,00,000 at 9.35% for 24 months:**\n• Monthly EMI ≈ **₹4,600**\n• Total interest ≈ ₹10,400\n• Total payment ≈ ₹1,10,400\n\n💡 Use our **EMI Calculator** on the homepage for instant calculations! You can adjust amount, rate & tenure.",
    keywords: [
      "emi",
      "installment",
      "monthly",
      "calculate",
      "payment",
      "repay",
      "how much emi",
      "emi calculator",
    ],
    isQuickReply: false,
    order: 18,
  },
  {
    question: "Can I change my EMI date",
    answer:
      "📅 **Changing Your EMI Due Date:**\n\nYes! You can change your EMI date **once per year** at no extra charge.\n\n**How to change:**\n1. Log in to Smart Loans portal\n2. Go to 'Loan Management'\n3. Select 'Change EMI Date'\n4. Choose preferred date (1st–28th of month)\n\nOr simply call us at **+1 (800) 694-8956** and we'll do it for you in minutes! 📞",
    keywords: [
      "emi date",
      "change emi date",
      "due date",
      "emi day",
      "payment date",
    ],
    isQuickReply: false,
    order: 19,
  },
  {
    question: "What happens if I miss an EMI",
    answer:
      "⚠️ **Missed EMI? Here's What Happens:**\n\n• **Day 1–3:** Grace period — no penalty\n• **Day 4+:** Late payment fee of 2% on overdue amount\n• **30+ days:** Reported to CIBIL (affects credit score)\n• **90+ days:** Loan classified as NPA\n\n💡 **Important:** If you're facing financial difficulty, **contact us immediately**! We offer:\n• EMI restructuring\n• Temporary payment holiday\n• Customized repayment plans\n\nDon't ignore — we're here to help! 🙏",
    keywords: [
      "miss emi",
      "missed payment",
      "late emi",
      "skip emi",
      "default",
      "not pay",
      "penalty",
    ],
    isQuickReply: false,
    order: 20,
  },
  {
    question: "Prepayment of loan",
    answer:
      "💳 **Loan Prepayment / Foreclosure:**\n\n✅ **Zero prepayment penalty** after 6 months!\n\n**Benefits of prepaying:**\n• Saves significant interest amount\n• Improves your credit score\n• Frees up monthly cash flow\n\n**How to prepay:**\n• Online via Smart Loans portal\n• NEFT/IMPS transfer to loan account\n• Walk in to any partner branch\n\n💡 Even partial prepayment (part-payment) is accepted!",
    keywords: [
      "prepay",
      "prepayment",
      "foreclose",
      "foreclosure",
      "close loan early",
      "pay early",
      "part payment",
    ],
    isQuickReply: false,
    order: 21,
  },

  // ── Credit Score ──────────────────────────────────────────────────────────
  {
    question: "Credit score needed",
    answer:
      "📈 **Credit Score Requirements at Smart Loans:**\n\n| Score Range | Status | Benefit |\n|---|---|---|\n| 750+ | Excellent | Best rates + instant approval |\n| 700–749 | Good | Good rates, fast approval |\n| 650–699 | Fair | Slightly higher rate |\n| 600–649 | Poor | Special program available |\n| Below 600 | Needs work | Talk to our advisor |\n\n💡 We believe in **second chances**. Even with a low score, we have solutions!",
    keywords: [
      "credit score",
      "cibil",
      "cibil score",
      "score needed",
      "minimum score",
      "credit rating",
    ],
    isQuickReply: false,
    order: 22,
  },
  {
    question: "How to improve credit score",
    answer:
      "📊 **Tips to Boost Your Credit Score:**\n\n1. ✅ **Pay all EMIs on time** — biggest impact!\n2. ✅ **Keep credit card usage below 30%**\n3. ✅ **Don't apply for multiple loans simultaneously**\n4. ✅ **Check your credit report for errors** (free at CRIF/CIBIL)\n5. ✅ **Keep old credit accounts active**\n6. ✅ **Maintain a credit mix** (credit card + loan)\n\n⏱️ Consistent good behavior improves score in **3–6 months**!",
    keywords: [
      "improve credit",
      "increase credit score",
      "boost credit",
      "better cibil",
      "how to improve score",
    ],
    isQuickReply: false,
    order: 23,
  },
  {
    question: "Check credit score for free",
    answer:
      "🆓 **Check Your Credit Score for Free:**\n\n• **CIBIL:** mycibil.com (1 free check/year)\n• **Experian:** experian.in (free)\n• **CRIF:** crifhighmark.com (free)\n• **Paisabazaar:** Free instant check\n• **BankBazaar:** Free check with insights\n\n💡 Checking your own score is a **soft inquiry** — it does NOT affect your score!\n\nWant us to check it for you? Our advisors offer free credit counseling! 📞",
    keywords: [
      "check credit score",
      "free credit score",
      "how to check cibil",
      "know my score",
      "credit check",
    ],
    isQuickReply: false,
    order: 24,
  },

  // ── Fees & Charges ────────────────────────────────────────────────────────
  {
    question: "Processing fee",
    answer:
      "💰 **Processing Fees at Smart Loans:**\n\n• **Personal Loan:** 1–2% of loan amount\n• **Business Loan:** 1.5–2.5%\n• **Home Loan:** 0.5–1%\n• **Car Loan:** 1–1.5%\n• **Education Loan:** Nil (zero processing fee!)\n\n🎉 **Current Offer:** 0% processing fee on your first loan!\n\nAll fees are **transparently disclosed** upfront — zero hidden charges. What you see is what you pay!",
    keywords: [
      "processing fee",
      "charges",
      "fees",
      "hidden charges",
      "application fee",
      "cost to apply",
    ],
    isQuickReply: false,
    order: 25,
  },
  {
    question: "Are there any hidden charges",
    answer:
      "🔍 **Zero Hidden Charges Policy at Smart Loans:**\n\nWe believe in **100% transparency**. Here's our complete fee structure:\n\n✅ Processing fee: 1–2% (disclosed upfront)\n✅ Late payment fee: 2% per month\n✅ Prepayment: Zero after 6 months\n✅ Cheque bounce fee: ₹500 per instance\n✅ Statement charges: Free online, ₹200 physical\n\nNo surprise charges. **Ever.** 🙌",
    keywords: [
      "hidden charges",
      "hidden fees",
      "extra charges",
      "surprise",
      "transparency",
      "all charges",
    ],
    isQuickReply: false,
    order: 26,
  },

  // ── Security & Privacy ────────────────────────────────────────────────────
  {
    question: "Is my data safe",
    answer:
      "🔒 **Your Data Security at Smart Loans:**\n\n• **256-bit SSL encryption** on all connections\n• **PCI DSS compliant** data handling\n• **ISO 27001 certified** security practices\n• **RBI regulated** — strict data privacy norms\n• Data NEVER sold to third parties\n• 2-factor authentication on all accounts\n\n🛡️ We treat your data like our own. Your privacy is our top priority!",
    keywords: [
      "data safe",
      "secure",
      "privacy",
      "data privacy",
      "safety",
      "encryption",
      "is it safe",
      "safe to apply",
    ],
    isQuickReply: false,
    order: 27,
  },
  {
    question: "Is Smart Loans RBI registered",
    answer:
      "✅ **Yes, Smart Loans is fully RBI Registered!**\n\n• **Registered NBFC** under RBI guidelines\n• **SEBI compliant** financial operations\n• **ISO 9001:2015 certified** quality management\n• **ISO 27001** information security certified\n• Member of **Finance Industry Association**\n\nYou can verify our registration on the RBI website. We operate with full legal compliance and transparency! 🏛️",
    keywords: [
      "rbi",
      "registered",
      "license",
      "legal",
      "nbfc",
      "regulated",
      "trusted",
      "genuine",
      "authentic",
    ],
    isQuickReply: false,
    order: 28,
  },

  // ── Loan Transfer & Top-up ────────────────────────────────────────────────
  {
    question: "Balance transfer",
    answer:
      "🔄 **Loan Balance Transfer to Smart Loans:**\n\n**Why transfer your existing loan to us?**\n• Save up to **2–3%** on interest\n• Reduce your EMI significantly\n• Get a **top-up loan** simultaneously\n• No prepayment penalty from existing lender applies\n\n**Process:**\n1. Check your existing loan statement\n2. Get our competitive rate quote\n3. We handle the transfer formalities\n4. Start saving from month 1!\n\nInterested? Let me connect you with an advisor! 📞",
    keywords: [
      "balance transfer",
      "transfer loan",
      "switch lender",
      "move loan",
      "refinance",
      "loan transfer",
    ],
    isQuickReply: false,
    order: 29,
  },
  {
    question: "Top-up loan",
    answer:
      "➕ **Top-up Loan at Smart Loans:**\n\nAlready have a Smart Loans loan? Get **additional funds** without a new application!\n\n• **Eligibility:** 6+ months of timely repayment\n• **Amount:** Up to 100% of original loan\n• **Rate:** Same or lower than original rate\n• **Process:** Instant approval for existing customers\n\n💡 Perfect for:\n• Home renovation\n• Wedding expenses\n• Medical emergencies\n• Business expansion",
    keywords: [
      "top up",
      "top-up",
      "additional loan",
      "more money",
      "extra loan",
      "existing customer loan",
    ],
    isQuickReply: false,
    order: 30,
  },

  // ── Special Categories ────────────────────────────────────────────────────
  {
    question: "Loan for self employed",
    answer:
      "👔 **Loans for Self-Employed / Business Owners:**\n\n✅ Personal loans for self-employed: from 9.35%\n✅ Business expansion loans: from 10.2%\n✅ No salary slip needed — ITR accepted\n\n**Requirements:**\n• 2+ years in business\n• Last 2 years ITR\n• 6 months bank statements\n• Business registration proof\n\nWe understand that self-employed income can be irregular — our flexible assessment considers your full financial picture!",
    keywords: [
      "self employed",
      "freelancer",
      "business owner",
      "proprietor",
      "partner",
      "consultant",
      "no salary slip",
    ],
    isQuickReply: false,
    order: 31,
  },
  {
    question: "Loan for women",
    answer:
      "👩 **Special Benefits for Women Borrowers at Smart Loans:**\n\n🎀 **Women-Special Rates:**\n• 0.25% interest rate concession on all loans\n• Priority processing — faster approvals\n• Lower processing fee (0.5% discount)\n\n**Special Products:**\n• Mahila Personal Loan (up to ₹3,00,000)\n• Women Entrepreneur Loan (up to ₹10,00,000)\n• Home Loan with additional tax benefits\n\n💪 Empowering women with financial independence!",
    keywords: [
      "woman",
      "women",
      "female",
      "lady",
      "mahila",
      "women loan",
      "lady loan",
    ],
    isQuickReply: false,
    order: 32,
  },
  {
    question: "Senior citizen loan",
    answer:
      "👴 **Loans for Senior Citizens:**\n\n• **Age limit:** Up to 70 years at loan maturity\n• **Special pension loan** against pension income\n• **Reverse mortgage** for homeowners 60+\n• Priority customer service\n• Home visits for documentation\n\n**Requirements:**\n• Pension certificate / proof of income\n• Bank statements (3 months)\n• Age proof document\n\nWe respect and serve our senior customers with dedicated support! 🙏",
    keywords: [
      "senior",
      "senior citizen",
      "old age",
      "pensioner",
      "retired",
      "pension",
      "age 60",
    ],
    isQuickReply: false,
    order: 33,
  },
  {
    question: "Government employee loan",
    answer:
      "🏛️ **Special Loans for Government Employees:**\n\n🌟 **Exclusive Benefits:**\n• Interest rate starts from **8.5% p.a.** (lowest available!)\n• Loan amount up to **₹5,00,000**\n• Minimal documentation\n• Salary account-linked repayment\n• Zero processing fee for defense personnel\n\n**Eligible:** Central/State govt. employees, PSU staff, defense, police, teachers, BSNL, Railways employees\n\nShow your government ID and get a special deal instantly!",
    keywords: [
      "government",
      "govt employee",
      "sarkari",
      "government job",
      "psu",
      "defense",
      "army",
      "police",
      "teacher",
    ],
    isQuickReply: false,
    order: 34,
  },

  // ── About Smart Loans ─────────────────────────────────────────────────────────
  {
    question: "About Smart Loans",
    answer:
      "🏢 **About Smart Loans:**\n\nSmart Loans is a **leading digital lending platform** making financial services accessible to everyone.\n\n📊 **Our Numbers:**\n• 50,000+ happy customers\n• ₹500 Crore+ disbursed\n• 50+ cities covered\n• 98% approval rate\n• 15+ years in financial services\n\n🌟 **Our Promise:**\n• Fast approvals\n• Transparent pricing\n• Dedicated support\n• Zero hidden charges\n\nWe're not just a lender — we're your financial partner for life! 💙",
    keywords: [
      "about Smart Loans",
      "who are you",
      "what is Smart Loans",
      "company",
      "about company",
      "tell me about",
    ],
    isQuickReply: false,
    order: 35,
  },
  {
    question: "Working hours",
    answer:
      "🕐 **Smart Loans Working Hours:**\n\n• **Branch Hours:** Mon–Sat, 9:00 AM – 6:00 PM\n• **Online Portal:** 24/7 (always available!)\n• **Customer Care:** Mon–Sat, 8:00 AM – 8:00 PM\n• **Emergency Line:** 24/7 for existing customers\n• **Chat Support (me!):** Always here for you! 💬\n\n📞 **Call:** +1 (800) 694-8956\n📧 **Email:** hello@Smart Loans.com\n\nHolidays: National holidays only.",
    keywords: [
      "working hours",
      "timing",
      "office hours",
      "open",
      "when open",
      "business hours",
      "time",
    ],
    isQuickReply: false,
    order: 36,
  },

  // ── Loan Amount & Tenure ──────────────────────────────────────────────────
  {
    question: "Maximum loan amount",
    answer:
      "💰 **Maximum Loan Amounts at Smart Loans:**\n\n| Loan Type | Maximum Amount |\n|---|---|\n| Personal Loan | ₹2,00,000 |\n| Business Loan | ₹5,00,000 |\n| Education Loan | ₹10,00,000 |\n| Car Loan | ₹3,00,000 |\n| Home Loan | ₹50,00,000 |\n| Medical Loan | ₹1,00,000 |\n\n💡 The actual approved amount depends on your income, credit score, and existing obligations. Apply now for a personalized quote!",
    keywords: [
      "maximum",
      "max loan",
      "how much loan",
      "loan limit",
      "largest loan",
      "highest amount",
    ],
    isQuickReply: false,
    order: 37,
  },
  {
    question: "Minimum loan amount",
    answer:
      "💵 **Minimum Loan Amounts at Smart Loans:**\n\n• **Personal Loan:** ₹10,000\n• **Business Loan:** ₹50,000\n• **Education Loan:** ₹25,000\n• **Car Loan:** ₹50,000\n• **Home Loan:** ₹5,00,000\n• **Medical Loan:** ₹5,000\n\n💡 Even small amounts are welcome! We believe everyone deserves financial support regardless of the loan size. ❤️",
    keywords: [
      "minimum",
      "min loan",
      "smallest loan",
      "least amount",
      "small loan",
      "mini loan",
    ],
    isQuickReply: false,
    order: 38,
  },
  {
    question: "Loan tenure options",
    answer:
      "📅 **Flexible Tenure Options at Smart Loans:**\n\n• **Personal Loan:** 6 – 60 months\n• **Business Loan:** 12 – 84 months\n• **Education Loan:** 12 – 120 months\n• **Car Loan:** 12 – 84 months\n• **Home Loan:** 12 – 360 months (30 years!)\n• **Medical Loan:** 3 – 48 months\n\n💡 **Tip:** Longer tenure = smaller EMI but more total interest. Shorter tenure = more EMI but saves overall. Our calculator helps you find the perfect balance!",
    keywords: [
      "tenure",
      "duration",
      "how long",
      "loan period",
      "repayment period",
      "years",
      "months",
    ],
    isQuickReply: false,
    order: 39,
  },

  // ── Technical & Account ───────────────────────────────────────────────────
  {
    question: "Online application process",
    answer:
      "💻 **How to Apply Online at Smart Loans:**\n\n**Step 1:** Visit Smart Loans.com/application-form\n**Step 2:** Fill basic details (5 mins)\n**Step 3:** Upload documents digitally\n**Step 4:** eSign digitally — no physical signature needed!\n**Step 5:** Receive approval notification via SMS/email\n**Step 6:** Accept offer and funds are credited!\n\n🌟 **100% paperless process**\n🌟 **No branch visit needed**\n🌟 **Available 24/7**",
    keywords: [
      "online apply",
      "apply online",
      "how to apply",
      "online application",
      "digital",
      "website",
      "portal",
    ],
    isQuickReply: false,
    order: 40,
  },
  {
    question: "Can I apply with existing loan",
    answer:
      "🔄 **Apply with an Existing Loan?**\n\nYes! It depends on your **FOIR (Fixed Obligation to Income Ratio)**:\n\n• If your existing EMIs are **less than 50% of income** → You can get another loan\n• If existing EMIs are **50–60%** → Conditional approval\n• If above **60%** → Loan restructuring recommended first\n\n💡 **Example:** If you earn ₹50,000/month and have ₹15,000 EMI, you can borrow more!\n\nLet our advisor calculate your exact eligibility! 📊",
    keywords: [
      "existing loan",
      "already have loan",
      "multiple loans",
      "two loans",
      "second loan",
      "foir",
    ],
    isQuickReply: false,
    order: 41,
  },
  {
    question: "Joint loan application",
    answer:
      "👫 **Joint Loan Application at Smart Loans:**\n\n**Benefits of Applying Jointly:**\n• Higher loan eligibility (combined income)\n• Better interest rates\n• Shared repayment responsibility\n\n**Co-applicants allowed:**\n• Spouse\n• Parents / In-laws\n• Siblings (for education loans)\n• Business partners (business loans)\n\n💡 Adding a co-applicant with a **high credit score** significantly improves approval chances!",
    keywords: [
      "joint",
      "co-applicant",
      "co applicant",
      "joint loan",
      "together",
      "spouse",
      "husband wife",
    ],
    isQuickReply: false,
    order: 42,
  },
  {
    question: "Loan for NRI",
    answer:
      "🌍 **Loans for NRIs (Non-Resident Indians):**\n\n✅ **NRI Home Loans:** Available for purchasing property in India\n✅ **NRI Personal Loans:** Against NRO/NRE account\n✅ Currency: INR, USD accepted\n\n**Additional Requirements:**\n• Valid Indian passport / OCI card\n• Overseas employment proof\n• NRE/NRO bank account statements\n• Power of Attorney (if applying from abroad)\n\n📞 Our NRI desk is available: nri@Smart Loans.com",
    keywords: [
      "nri",
      "non resident",
      "abroad",
      "overseas",
      "foreign",
      "outside india",
      "nre nro",
    ],
    isQuickReply: false,
    order: 43,
  },

  // ── Comparisons ───────────────────────────────────────────────────────────
  {
    question: "Why choose Smart Loans",
    answer:
      "🌟 **Why Customers Love Smart Loans:**\n\n1. ⚡ **Fastest approvals** — 24 hours guaranteed\n2. 💰 **Lowest rates** — starting 6.90% p.a.\n3. 📱 **100% digital** — no branch visits\n4. 🔒 **Zero hidden charges** — full transparency\n5. 🤝 **50,000+ satisfied customers**\n6. ⭐ **4.9/5 customer rating**\n7. 🛡️ **RBI regulated** & ISO certified\n8. 💬 **24/7 support** — we're always here!\n\nWe don't just give loans — we build **lifetime financial relationships**! 💙",
    keywords: [
      "why Smart Loans",
      "why choose",
      "benefits",
      "advantage",
      "better than",
      "why us",
      "what makes you special",
    ],
    isQuickReply: false,
    order: 44,
  },
  {
    question: "Smart Loans vs bank",
    answer:
      "🏦 **Smart Loans vs Traditional Banks:**\n\n| Feature | Smart Loans | Banks |\n|---|---|---|\n| Approval Time | 24 hrs | 7–15 days |\n| Branch Visit | Not needed | Required |\n| Paperwork | Minimal | Extensive |\n| Flexibility | High | Low |\n| Customer Support | 24/7 | Business hrs |\n| Low Score Help | Yes | Rarely |\n\n🎯 We combine the **trust of a bank** with the **speed of a fintech**!",
    keywords: [
      "vs bank",
      "better than bank",
      "compare bank",
      "bank vs",
      "traditional bank",
      "difference",
    ],
    isQuickReply: false,
    order: 45,
  },

  // ── Specific Scenarios ────────────────────────────────────────────────────
  {
    question: "Emergency loan",
    answer:
      "🚨 **Emergency Loan — Get Money Fast!**\n\nWe understand emergencies don't wait. Here's our fastest option:\n\n• **Medical Emergency Loan:** Approved in **4 hours**\n• **Instant Personal Loan:** Disbursed in **6 hours** for eligible customers\n• **Emergency Credit Line:** For existing customers — instant!\n\n**What you need:**\n• Aadhaar + PAN\n• Bank account details\n• Income proof (can upload after)\n\n📞 **Call our emergency line:** +1 (800) 694-8956 (24/7)",
    keywords: [
      "emergency",
      "urgent",
      "immediately",
      "right now",
      "asap",
      "fast money",
      "quick cash",
      "same day",
    ],
    isQuickReply: false,
    order: 46,
  },
  {
    question: "Loan for wedding",
    answer:
      "💍 **Wedding Loan at Smart Loans:**\n\nYour special day deserves the best — without the financial stress!\n\n• **Amount:** Up to ₹2,00,000\n• **Rate:** From 9.35% p.a.\n• **Tenure:** Up to 60 months\n• **Approval:** Within 24 hours\n\n**Cover all wedding expenses:**\n✅ Venue booking & decor\n✅ Catering & photography\n✅ Honeymoon travel\n✅ Jewellery & clothing\n✅ Entertainment\n\nApply 2 weeks before your wedding for best results! 💐",
    keywords: [
      "wedding",
      "marriage",
      "shaadi",
      "engagement",
      "honeymoon",
      "wedding loan",
      "marriage loan",
    ],
    isQuickReply: false,
    order: 47,
  },
  {
    question: "Travel loan",
    answer:
      "✈️ **Travel Loan at Smart Loans:**\n\nExplore the world without emptying your savings!\n\n• **Amount:** ₹25,000 – ₹2,00,000\n• **Rate:** From 9.35% p.a.\n• **Tenure:** 3 – 24 months\n• **Approval:** Same day for eligible customers\n\n**Cover:**\n✅ International flights & hotels\n✅ Visa fees\n✅ Tour packages\n✅ Travel insurance\n\n💡 Apply 30 days before travel for seamless processing! 🌍",
    keywords: [
      "travel",
      "vacation",
      "trip",
      "holiday",
      "tour",
      "flight",
      "travel loan",
      "tourism",
      "abroad trip",
    ],
    isQuickReply: false,
    order: 48,
  },
  {
    question: "Home renovation loan",
    answer:
      "🏠 **Home Renovation Loan at Smart Loans:**\n\nTransform your home without financial worry!\n\n• **Amount:** Up to ₹5,00,000\n• **Rate:** From 9.35% p.a.\n• **Tenure:** Up to 60 months\n• **Collateral:** Not required for amounts under ₹3,00,000\n\n**Covers:**\n✅ Interior design & furniture\n✅ Kitchen & bathroom renovation\n✅ Painting & flooring\n✅ Electrical & plumbing work\n✅ Extension / additional rooms\n\nMake your home your dream home! 🛋️",
    keywords: [
      "renovation",
      "home renovation",
      "repair",
      "construction",
      "interior",
      "painting",
      "rebuild",
    ],
    isQuickReply: false,
    order: 49,
  },
  {
    question: "Loan against property",
    answer:
      "🏢 **Loan Against Property (LAP) at Smart Loans:**\n\nUnlock the value of your property for big requirements!\n\n• **Amount:** Up to **₹2 Crore**\n• **Rate:** From **9.5% p.a.**\n• **Tenure:** Up to **180 months**\n• **LTV Ratio:** Up to **75% of property value**\n\n**Eligible Properties:**\n✅ Residential house/flat\n✅ Commercial property\n✅ Industrial property\n✅ Agricultural land (select cases)\n\n**Uses:** Business expansion, medical, education, debt consolidation",
    keywords: [
      "loan against property",
      "lap",
      "property loan",
      "collateral",
      "mortgage",
      "secured loan",
    ],
    isQuickReply: false,
    order: 50,
  },

  // ── Troubleshooting & Support ─────────────────────────────────────────────
  {
    question: "Forgot account password",
    answer:
      '🔑 **Reset Your Password:**\n\n1. Go to Smart Loans.com/login\n2. Click **"Forgot Password"**\n3. Enter your registered email/mobile\n4. OTP will be sent to your phone\n5. Enter OTP and set new password\n\n⏱️ Takes less than 2 minutes!\n\nStill having trouble? Call us at **+1 (800) 694-8956** or email **support@Smart Loans.com** and we\'ll reset it for you within 10 minutes. 🔓',
    keywords: [
      "password",
      "forgot password",
      "reset password",
      "can't login",
      "locked out",
      "account access",
    ],
    isQuickReply: false,
    order: 51,
  },
  {
    question: "How to close loan account",
    answer:
      "🔒 **Closing Your Loan Account:**\n\n**Full Foreclosure Process:**\n1. Get foreclosure statement from portal/branch\n2. Pay outstanding amount + any applicable charges\n3. Receive **No Due Certificate (NDC)** within 7 days\n4. CIBIL record updated within **30 days**\n\n**After Closing:**\n• No foreclosure fee after 6 months (floating rate loans)\n• Get original documents back (for secured loans)\n• Credit score will improve over time! ✅\n\nCall us to initiate closure: **+1 (800) 694-8956**",
    keywords: [
      "close loan",
      "close account",
      "loan closure",
      "foreclose",
      "noc",
      "no due certificate",
      "complete loan",
    ],
    isQuickReply: false,
    order: 52,
  },
  {
    question: "What is FOIR",
    answer:
      "📊 **FOIR — Fixed Obligation to Income Ratio:**\n\nFOIR = (Total EMIs + Fixed Obligations) ÷ Monthly Income × 100\n\n**Smart Loans's FOIR limits:**\n• Salaried: Up to **55%** of income\n• Self-employed: Up to **60%** of income\n\n**Example:**\n• Monthly income: ₹50,000\n• Existing EMIs: ₹10,000\n• Max new EMI allowed: ₹50,000 × 55% - ₹10,000 = **₹17,500**\n\n💡 A lower FOIR = higher loan eligibility + better rates!",
    keywords: [
      "foir",
      "debt to income",
      "obligation ratio",
      "how much can i borrow",
      "loan capacity",
    ],
    isQuickReply: false,
    order: 53,
  },
  {
    question: "Subsidized loans available",
    answer:
      "🏛️ **Government Subsidy Schemes Smart Loans Supports:**\n\n🌟 **PMAY (Pradhan Mantri Awas Yojana):**\n• Interest subsidy of 3–6.5% on home loans\n• For EWS/LIG/MIG categories\n\n🌟 **PMMY (Mudra Yojana):**\n• For small business loans up to ₹10 lakhs\n• Shishu (₹50K), Kishore (₹5L), Tarun (₹10L)\n\n🌟 **Stand-Up India / Startup India** linked schemes\n\nWe help you maximize your government subsidy benefits! Our experts handle all paperwork. 🏅",
    keywords: [
      "subsidy",
      "government scheme",
      "pmay",
      "mudra",
      "pradhan mantri",
      "government loan",
      "yojana",
    ],
    isQuickReply: false,
    order: 54,
  },
  {
    question: "Loan insurance",
    answer:
      "🛡️ **Loan Insurance / Protection at Smart Loans:**\n\n**Why insure your loan?**\nIn case of death, disability, or job loss — your family won't inherit the debt.\n\n**Our Loan Protection Plans:**\n• **Life Cover:** Pays off loan in case of death\n• **Disability Cover:** EMI waiver if permanently disabled\n• **Job Loss Cover:** 6-month EMI waiver on involuntary job loss\n\n**Cost:** As low as ₹200/month for ₹1,00,000 loan\n\nRecommended? **Absolutely!** Peace of mind for you and your family. ❤️",
    keywords: [
      "insurance",
      "loan insurance",
      "protection",
      "coverage",
      "life cover",
      "loan protection",
    ],
    isQuickReply: false,
    order: 55,
  },

  // ── Basic Conversational & Small Talk ─────────────────────────────────────
  {
    question: "Hello",
    answer:
      "👋 **Hello there! Welcome to Smart Loans.**\n\nI'm your virtual financial assistant. I can help you with:\n• Checking loan options\n• Understanding eligibility\n• Calculating EMIs\n• Tracking your application\n\nHow can I help you today?",
    keywords: ["hi", "hello", "hey", "greetings", "namaste", "hola", "sup"],
    isQuickReply: false,
    order: 56,
  },
  {
    question: "How are you",
    answer:
      "🤖 **I'm doing great, thank you!**\n\nI'm fully charged and ready to help you find the best loan offers today. What's on your mind?",
    keywords: [
      "how are you",
      "how are things",
      "how do you do",
      "what's up",
      "how is it going",
    ],
    isQuickReply: false,
    order: 57,
  },
  {
    question: "Who are you",
    answer:
      "🤖 **I am the Smart Loans AI Assistant!**\n\nI'm a virtual chatbot designed to answer all your questions about our loan products, interest rates, eligibility, and the application process.\n\nWhile I'm an AI, I can always connect you to our human experts if things get too complex! 📞",
    keywords: [
      "who are you",
      "are you human",
      "are you a bot",
      "are you ai",
      "what is your name",
      "robot",
    ],
    isQuickReply: false,
    order: 58,
  },
  {
    question: "What can you do",
    answer:
      "🛠️ **Here's what I can do for you:**\n\n✅ Tell you about our loan types (Personal, Business, Home, etc.)\n✅ Share the latest interest rates\n✅ Explain eligibility and required documents\n✅ Help you calculate your EMI\n✅ Connect you to human customer support\n\nTry asking me: *'What are your personal loan rates?'*",
    keywords: [
      "what can you do",
      "help me",
      "what do you do",
      "how can you help",
      "features",
      "capabilities",
    ],
    isQuickReply: false,
    order: 59,
  },
  {
    question: "Thank you",
    answer:
      "💙 **You're very welcome!**\n\nIt's my pleasure to help. If you have any more questions about Smart Loans, EMIs, or your application, just type them below.\n\nHave a fantastic day! 🌟",
    keywords: [
      "thank you",
      "thanks",
      "tysm",
      "thx",
      "appreciate it",
      "good job",
      "thanks a lot",
    ],
    isQuickReply: false,
    order: 60,
  },
  {
    question: "Goodbye",
    answer:
      "👋 **Goodbye!**\n\nThank you for chatting with Smart Loans. We hope to serve your financial needs soon.\n\nStay safe and have a wonderful day! 🌟",
    keywords: [
      "bye",
      "goodbye",
      "see ya",
      "cya",
      "catch you later",
      "exit",
      "quit",
      "leave",
    ],
    isQuickReply: false,
    order: 61,
  },
  {
    question: "Talk to human",
    answer:
      "🧑‍💼 **Need a human touch? No problem!**\n\nOur loan advisors are ready to speak with you.\n• **Call us:** +1 (800) 694-8956 (Mon-Sat, 9 AM - 6 PM)\n• **Email us:** hello@Smart Loans.com\n\nIf you'd like, I can arrange a callback for you. Just let me know!",
    keywords: [
      "human",
      "customer care",
      "customer support",
      "agent",
      "executive",
      "real person",
      "call me",
      "talk to human",
      "speak to someone",
    ],
    isQuickReply: false,
    order: 62,
  },
  {
    question: "Good morning",
    answer:
      "🌅 **Good morning!**\n\nHope you're having a great start to your day. How can Smart Loans assist you with your financial goals today?",
    keywords: ["good morning", "morning", "gm", "good day"],
    isQuickReply: false,
    order: 63,
  },
  {
    question: "Good evening",
    answer:
      "🌙 **Good evening!**\n\nHow can I help you wrap up your day with the right financial solutions? Ask me anything about our loans!",
    keywords: ["good evening", "good night", "evening", "ge", "gn", "night"],
    isQuickReply: false,
    order: 64,
  },
  {
    question: "Okay",
    answer:
      "👍 **Great!**\n\nLet me know if there's anything else you'd like to explore, like our current interest rates, loan eligibility, or how to apply!",
    keywords: [
      "ok",
      "okay",
      "alright",
      "cool",
      "fine",
      "sounds good",
      "got it",
      "understood",
      "yes ok",
    ],
    isQuickReply: false,
    order: 65,
  },
  {
    question: "You are smart",
    answer:
      "🥰 **Thank you so much!**\n\nI'm always learning and updating my knowledge to give you the best, fastest answers about Smart Loans's services.\n\nIs there anything else I can help my favorite user with? ✨",
    keywords: [
      "smart",
      "good bot",
      "intelligent",
      "awesome",
      "great bot",
      "cool bot",
      "nice",
      "clever",
    ],
    isQuickReply: false,
    order: 66,
  },
  {
    question: "Tell me a joke",
    answer:
      "😂 **Here's a finance joke for you:**\n\nWhy did the loan application go to therapy?\n*Because it had too many outstanding issues!* 📉\n\nJokes aside, applying for a loan with Smart Loans is stress-free. Want to check our Personal Loan rates?",
    keywords: [
      "joke",
      "funny",
      "laugh",
      "tell me a joke",
      "humor",
      "make me laugh",
    ],
    isQuickReply: false,
    order: 67,
  },
  {
    question: "Swear words",
    answer:
      "🕊️ **Let's keep things respectful!**\n\nI'm here to help you with your financial needs. If you're frustrated with a loan issue, please let me know or type 'customer care' to speak with a human executive who can resolve your problem.",
    keywords: [
      "fuck",
      "shit",
      "bitch",
      "asshole",
      "stupid",
      "idiot",
      "damn",
      "crap",
      "shut up",
    ],
    isQuickReply: false,
    order: 68,
  },
  {
    question: "Yes",
    answer:
      "✅ **Awesome!**\n\nCould you please provide a little more detail so I can guide you to the exact information you need?",
    keywords: [
      "yes",
      "yeah",
      "yep",
      "sure",
      "of course",
      "haan",
      "yes please",
      "yup",
    ],
    isQuickReply: false,
    order: 69,
  },
  {
    question: "No",
    answer:
      "❌ **Alright, no problem!**\n\nI'm right here if you change your mind or need help with anything else related to Smart Loans.",
    keywords: ["no", "nope", "nah", "no thanks", "don't"],
    isQuickReply: false,
    order: 70,
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function seed() {
  console.log("🔌  Connecting to MongoDB…");
  await mongoose.connect(URI);
  console.log("✅  Connected.");

  await ChatbotQA.deleteMany({});
  await ChatbotQA.insertMany(qaData);
  console.log(`✅  Chatbot Q&As seeded — ${qaData.length} records inserted.`);

  await mongoose.disconnect();
  console.log(`\n🎉  Done! ${qaData.length} Q&As are live in MongoDB.`);
}

seed().catch((err) => {
  console.error("❌  Seed failed:", err.message);
  process.exit(1);
});
