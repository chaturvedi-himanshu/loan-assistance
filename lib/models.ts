import mongoose, { Schema } from "mongoose";

// ── Settings ─────────────────────────────────────────────
const settingsSchema = new Schema(
  {
    siteName: { type: String, default: "Smart Loans" },
    tagline: { type: String, default: "Banking & Business Loan" },
    phone1: { type: String, default: "+1 (800) 694-8956" },
    phone2: { type: String, default: "88 487 983 576" },
    email: { type: String, default: "hello@Smart Loans.com" },
    address: { type: String, default: "42 Finance Tower, New York, NY 10001" },
    workingHours: { type: String, default: "Mon – Sat: 9 AM – 6 PM" },
    facebookUrl: { type: String, default: "#" },
    twitterUrl: { type: String, default: "#" },
    linkedinUrl: { type: String, default: "#" },
    instagramUrl: { type: String, default: "#" },
    youtubeUrl: { type: String, default: "#" },
  },
  { timestamps: true },
);

// ── Hero ──────────────────────────────────────────────────
const heroSchema = new Schema(
  {
    eyebrow: { type: String, default: "Trusted by 50,000+ customers" },
    title: { type: String, default: "Fast, Flexible & Trusted Loan Solutions" },
    subtitle: {
      type: String,
      default:
        "Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges.",
    },
    ctaPrimary: { type: String, default: "Apply Now" },
    ctaPrimaryUrl: { type: String, default: "/application-form" },
    ctaSecondary: { type: String, default: "Learn More" },
    ctaSecondaryUrl: { type: String, default: "/services" },
    stat1Value: { type: String, default: "50K+" },
    stat1Label: { type: String, default: "Happy Customers" },
    stat2Value: { type: String, default: "₹500Cr+" },
    stat2Label: { type: String, default: "Disbursed" },
    stat3Value: { type: String, default: "24 Hrs" },
    stat3Label: { type: String, default: "Approval Time" },
    image: { type: String, default: "/images/slider/2.png" },
    imageAlt: { type: String, default: "Loan" },
    // Floating badge 1 (Instant Approval)
    badge1Title: { type: String, default: "Instant Approval" },
    badge1Subtitle: { type: String, default: "Within 24 hours" },
    badge1Icon: { type: String, default: "icofont-check-alt" },
    // Floating badge 2 (Low Interest / From X%)
    badge2Title: { type: String, default: "Low Interest" },
    badge2Subtitle: { type: String, default: "From 8.5%" },
    badge2Icon: { type: String, default: "icofont-rupee" },
  },
  { timestamps: true },
);

// ── Stat item ─────────────────────────────────────────────
const statSchema = new Schema(
  {
    icon: { type: String, default: "icofont-users" },
    value: { type: String, required: true },
    label: { type: String, required: true },
    color: { type: String, default: "#2cbbdf" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Service ───────────────────────────────────────────────
const serviceSchema = new Schema(
  {
    icon: { type: String, default: "flaticon-money" },
    rate: { type: String, required: true },
    title: { type: String, required: true },
    amount: { type: String, required: true },
    tenure: { type: String, required: true },
    desc: { type: String, required: true },
    features: { type: [String], default: [] },
    color: { type: String, default: "#2cbbdf" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Why Choose Us ─────────────────────────────────────────
const whySchema = new Schema(
  {
    icon: { type: String, default: "icofont-flash" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    color: { type: String, default: "#2cbbdf" },
    bg: { type: String, default: "rgba(44,187,223,0.10)" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Team Member ───────────────────────────────────────────
const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    description: { type: String, default: "" },
    image: { type: String, default: "/images/team/1.jpg" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Testimonial ───────────────────────────────────────────
const testimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    image: { type: String, default: "/images/testimonials/1.jpg" },
    text: { type: String, required: true },
    stars: { type: Number, default: 5, min: 1, max: 5 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Blog Post ─────────────────────────────────────────────
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: { type: String, default: "General" },
    author: { type: String, default: "Admin" },
    date: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    image: { type: String, default: "/images/blog/1.jpg" },
    excerpt: { type: String, required: true },
    content: { type: String, default: "" },
    published: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// ── Process Step ──────────────────────────────────────────
const processStepSchema = new Schema(
  {
    num: { type: String, required: true },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    icon: { type: String, default: "icofont-paper" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Partner / Award / Certification ───────────────────────
const partnerSchema = new Schema(
  {
    type: {
      type: String,
      enum: ["partner", "award", "certification"],
      default: "partner",
    },
    name: { type: String, required: true },
    icon: { type: String, default: "icofont-bank" },
    color: { type: String, default: "#2cbbdf" },
    org: { type: String, default: "" }, // used for awards (award org name)
    text: { type: String, default: "" }, // used for certifications
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Loan Application ──────────────────────────────────────
const applicationSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    loanType: { type: String, default: "Personal Loan" },
    purpose: { type: String, required: true },
    amount: { type: Number, required: true },
    gender: { type: String, default: "" },
    birth: { type: String, default: "" },
    maritalStatus: { type: String, default: "" },
    dependants: { type: String, default: "" },
    city: { type: String, default: "" },
    street: { type: String, default: "" },
    houseName: { type: String, default: "" },
    homeTown: { type: String, default: "" },
    timeAtAddress: { type: String, default: "" },
    timeAtAddress2: { type: String, default: "" },
    employmentStatus: { type: String, default: "" },
    employerName: { type: String, default: "" },
    employmentIndustry: { type: String, default: "" },
    employmentLength: { type: String, default: "" },
    income: { type: Number, default: 0 },
    message: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "reviewed", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true },
);

// ── Export models (safe for hot-reload) ──────────────────
export const Settings =
  mongoose.models.Settings ?? mongoose.model("Settings", settingsSchema);

export const Hero = mongoose.models.Hero ?? mongoose.model("Hero", heroSchema);

export const Stat = mongoose.models.Stat ?? mongoose.model("Stat", statSchema);

export const Service =
  mongoose.models.Service ?? mongoose.model("Service", serviceSchema);

export const WhyChooseUs =
  mongoose.models.WhyChooseUs ?? mongoose.model("WhyChooseUs", whySchema);

export const TeamMember =
  mongoose.models.TeamMember ?? mongoose.model("TeamMember", teamSchema);

export const Testimonial =
  mongoose.models.Testimonial ??
  mongoose.model("Testimonial", testimonialSchema);

export const BlogPost =
  mongoose.models.BlogPost ?? mongoose.model("BlogPost", blogSchema);

export const Application =
  mongoose.models.Application ??
  mongoose.model("Application", applicationSchema);

export const ProcessStep =
  mongoose.models.ProcessStep ??
  mongoose.model("ProcessStep", processStepSchema);

export const Partner =
  mongoose.models.Partner ?? mongoose.model("Partner", partnerSchema);

// ── Form Field Config ─────────────────────────────────────
const formFieldSchema = new Schema(
  {
    key: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    placeholder: { type: String, default: "" },
    type: { type: String, enum: ["text", "email", "number"], default: "text" },
    required: { type: Boolean, default: false },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const FormField =
  mongoose.models.FormField ?? mongoose.model("FormField", formFieldSchema);

export const FORM_FIELD_SEEDS = [
  {
    key: "name",
    label: "Full Name",
    placeholder: "Your full name",
    type: "text",
    required: true,
    enabled: true,
    order: 1,
  },
  {
    key: "email",
    label: "Email Address",
    placeholder: "Your email address",
    type: "email",
    required: true,
    enabled: true,
    order: 2,
  },
  {
    key: "phone",
    label: "Phone Number",
    placeholder: "Phone no.",
    type: "text",
    required: true,
    enabled: true,
    order: 3,
  },
  {
    key: "amount",
    label: "Loan Amount ($)",
    placeholder: "Loan amount ($)",
    type: "number",
    required: true,
    enabled: true,
    order: 4,
  },
  {
    key: "purpose",
    label: "Purpose of Loan",
    placeholder: "Purpose of loan",
    type: "text",
    required: true,
    enabled: true,
    order: 5,
  },
  {
    key: "gender",
    label: "Gender",
    placeholder: "Gender",
    type: "text",
    required: false,
    enabled: true,
    order: 6,
  },
  {
    key: "birth",
    label: "Date of Birth",
    placeholder: "Date of birth",
    type: "text",
    required: false,
    enabled: true,
    order: 7,
  },
  {
    key: "maritalStatus",
    label: "Marital Status",
    placeholder: "Marital status",
    type: "text",
    required: false,
    enabled: true,
    order: 8,
  },
  {
    key: "dependants",
    label: "Dependants",
    placeholder: "Dependants",
    type: "text",
    required: false,
    enabled: true,
    order: 9,
  },
  {
    key: "city",
    label: "Town / City",
    placeholder: "Town/City",
    type: "text",
    required: false,
    enabled: true,
    order: 10,
  },
  {
    key: "street",
    label: "Street",
    placeholder: "Street",
    type: "text",
    required: false,
    enabled: true,
    order: 11,
  },
  {
    key: "houseName",
    label: "House Name",
    placeholder: "House name",
    type: "text",
    required: false,
    enabled: true,
    order: 12,
  },
  {
    key: "homeTown",
    label: "Home Town",
    placeholder: "Home town",
    type: "text",
    required: false,
    enabled: true,
    order: 13,
  },
  {
    key: "timeAtAddress",
    label: "Time at Address",
    placeholder: "Time at address",
    type: "text",
    required: false,
    enabled: true,
    order: 14,
  },
  {
    key: "timeAtAddress2",
    label: "Time at Address 2",
    placeholder: "Time at address 2",
    type: "text",
    required: false,
    enabled: true,
    order: 15,
  },
  {
    key: "employmentStatus",
    label: "Employment Status",
    placeholder: "Employment status",
    type: "text",
    required: false,
    enabled: true,
    order: 16,
  },
  {
    key: "employerName",
    label: "Employer Name",
    placeholder: "Employer name",
    type: "text",
    required: false,
    enabled: true,
    order: 17,
  },
  {
    key: "employmentIndustry",
    label: "Employment Industry",
    placeholder: "Employment industry",
    type: "text",
    required: false,
    enabled: true,
    order: 18,
  },
  {
    key: "employmentLength",
    label: "Employment Length",
    placeholder: "Employment length",
    type: "text",
    required: false,
    enabled: true,
    order: 19,
  },
  {
    key: "income",
    label: "Monthly Income ($)",
    placeholder: "Monthly income",
    type: "number",
    required: false,
    enabled: true,
    order: 20,
  },
] as const;

// ── About Page ───────────────────────────────────────────
const aboutHistoryItemSchema = new Schema(
  {
    period: { type: String, default: "" },
    frontDesc1: { type: String, default: "" },
    frontDesc2: { type: String, default: "" },
    backDesc1: { type: String, default: "" },
    backDesc2: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { _id: true },
);

const aboutPageSchema = new Schema(
  {
    // Section 1
    sec1Heading: { type: String, default: "Why we are starting our company?" },
    sec1Sub: {
      type: String,
      default:
        "We are here to help you when you need your financial support, then we are help you.",
    },
    sec1Body1: {
      type: String,
      default:
        "We all know how hard it can be to make a site look like the demo, so to make your start into the world of as easy as possible have included the demo content from showcase site. Simply import the sample files we ship with the theme and the core structure for your site is already built mind that even if you don't use the demo content,.",
    },
    sec1Body2: {
      type: String,
      default:
        "We all know how hard it can be to make a site look like the demo, so to make your start into the world of as easy as possible have included the demo content.",
    },
    sec1Image: { type: String, default: "/images/about/1.png" },
    // Section 2
    sec2Heading: {
      type: String,
      default: "We are leading Smart Loans financial company.",
    },
    sec2Sub: {
      type: String,
      default:
        "We are here to help you when you need your financial support, then we are help you.",
    },
    sec2Link: {
      type: String,
      default:
        "We all know how hard it can be to make a site look like the demo, so to make your start into the world of as easy as possible have included the demo content.",
    },
    sec2Body: {
      type: String,
      default:
        "We all know how hard it can be to make a site look like the demo, so to make your start into the world of as easy as possible have included the demo content from showcase site. Simply import the sample files we ship with the theme and the core structure for your site is already built mind that even if you don't use the demo content,.",
    },
    sec2Image: { type: String, default: "/images/about/2.png" },
    // History section
    historyTitle: {
      type: String,
      default: "We have 25 years experienced\nsee our company history",
    },
    historyDesc: {
      type: String,
      default:
        "We are here to help you when you need your financial support, then we are help you.",
    },
    // Preferred: dynamic list of history cards. Replaces the hardcoded
    // history1/history2/history3 fields below (kept for back-compat only).
    historyItems: { type: [aboutHistoryItemSchema], default: [] },
    history1Period: { type: String, default: "2010 to 2013" },
    history1FrontDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make your start into the world of as easy possible.",
    },
    history1FrontDesc2: {
      type: String,
      default: "We all know how hard it can be to as easy possible.",
    },
    history1BackDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    },
    history1BackDesc2: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into.",
    },
    history2Period: { type: String, default: "2014 to 2016" },
    history2FrontDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make your start into the world of as easy possible.",
    },
    history2FrontDesc2: {
      type: String,
      default: "We all know how hard it can be to as easy possible.",
    },
    history2BackDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    },
    history2BackDesc2: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into.",
    },
    history3Period: { type: String, default: "2017 to 2019" },
    history3FrontDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make your start into the world of as easy possible.",
    },
    history3FrontDesc2: {
      type: String,
      default: "We all know how hard it can be to as easy possible.",
    },
    history3BackDesc1: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
    },
    history3BackDesc2: {
      type: String,
      default:
        "We all know how hard it can be to make site look like the demo so to make your start into.",
    },
    // Banner
    bannerTitle: { type: String, default: "About us" },
    bannerDesc: {
      type: String,
      default:
        "We are here to help you when you need your<br>financial support, then we are help you.",
    },
  },
  { timestamps: true },
);

export const AboutPage =
  mongoose.models.AboutPage ?? mongoose.model("AboutPage", aboutPageSchema);

// ── Conveyancing Service ──────────────────────────────────
const conveyancingSchema = new Schema(
  {
    icon: { type: String, default: "icofont-law-document" },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    features: { type: [String], default: [] },
    color: { type: String, default: "#2cbbdf" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export const ConveyancingService =
  mongoose.models.ConveyancingService ??
  mongoose.model("ConveyancingService", conveyancingSchema);

// ── Chatbot Q&A ───────────────────────────────────────────
const chatbotQASchema = new Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    keywords: { type: [String], default: [] },
    isQuickReply: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// ── Chat Lead (name + phone collected via chatbot) ────────
const chatLeadSchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, default: "" },
    query: { type: String, default: "" },
  },
  { timestamps: true },
);

export const ChatbotQA =
  mongoose.models.ChatbotQA ?? mongoose.model("ChatbotQA", chatbotQASchema);

export const ChatLead =
  mongoose.models.ChatLead ?? mongoose.model("ChatLead", chatLeadSchema);

// ── Homepage Section Content ──────────────────────────────
// Single-document collection that stores all the editable copy
// (headings, badges, image paths, CTA labels, etc.) for every
// section on the homepage. Each admin sub-page edits its own
// prefixed subset of fields.
const homeContentSchema = new Schema(
  {
    // Services intro section (HomeServicesSection)
    servicesBadge: { type: String, default: "Our Services" },
    servicesHeading: {
      type: String,
      default: "We provide awesome services, it's here.",
    },
    servicesSubtitle: {
      type: String,
      default:
        "We are here to help you when you need your financial support, then we are here to guide you every step of the way.",
    },
    servicesCtaText: { type: String, default: "View More" },
    servicesCtaUrl: { type: String, default: "/services" },
    servicesFeature1Icon: { type: String, default: "icofont-check-circled" },
    servicesFeature1Text: {
      type: String,
      default: "Fastest loan approval in 24 hrs",
    },
    servicesFeature2Icon: { type: String, default: "icofont-shield" },
    servicesFeature2Text: {
      type: String,
      default: "100% secure & confidential process",
    },
    servicesFeature3Icon: { type: String, default: "icofont-ui-calculator" },
    servicesFeature3Text: {
      type: String,
      default: "Flexible EMI plans to suit you",
    },
    servicesFeature4Icon: { type: String, default: "icofont-support" },
    servicesFeature4Text: {
      type: String,
      default: "24/7 dedicated customer support",
    },

    // Loan Products section
    loanProductsBadge: { type: String, default: "Loan Products" },
    loanProductsHeading: {
      type: String,
      default: "Choose the right loan\nfor your needs",
    },
    loanProductsSubtitle: {
      type: String,
      default:
        "From personal to business, we have a loan product crafted\nfor every milestone in your life.",
    },
    loanProductsTags: {
      type: [String],
      default: [
        "Most Popular",
        "Best Rate",
        "Low Interest",
        "Fast Approval",
        "Lowest Rate",
        "Emergency",
      ],
    },
    loanProductsCtaText: { type: String, default: "Apply Now" },
    loanProductsCtaUrl: { type: String, default: "/application-form" },

    // Why Choose Us section
    whyBadge: { type: String, default: "Why Smart Loans" },
    whyHeading: {
      type: String,
      default: "Why thousands of people\nchoose us every day",
    },
    whySubtitle: {
      type: String,
      default:
        "We combine speed, trust, and flexibility to deliver the best\nloan experience you've ever had.",
    },
    whyHighlight1: { type: String, default: "No prepayment penalty" },
    whyHighlight2: { type: String, default: "Minimal documentation" },
    whyHighlight3: { type: String, default: "Instant e-approval letter" },
    whyHighlight4: { type: String, default: "Doorstep document pickup" },
    whyHighlightIcon: { type: String, default: "icofont-check-alt" },

    // Home Contact section
    contactBadge: { type: String, default: "Get In Touch" },
    contactHeading: {
      type: String,
      default: "Our manager will contact you to clear the details.",
    },
    contactSubtitle: {
      type: String,
      default:
        "We are here to help you when you need your financial support, then we are here to guide you.",
    },
    contactCtaText: { type: String, default: "Call Us Now" },
    contactCtaUrl: { type: String, default: "/contact" },
    contactImage: { type: String, default: "/images/home/1.png" },
    contactImageAlt: { type: String, default: "Contact" },
    contactBadge1Title: { type: String, default: "100% Secure" },
    contactBadge1Subtitle: { type: String, default: "Bank-level safety" },
    contactBadge1Icon: { type: String, default: "icofont-shield-alt" },
    contactBadge2Title: { type: String, default: "Response Time" },
    contactBadge2Subtitle: { type: String, default: "Under 2 Hours" },
    contactBadge2Icon: { type: String, default: "icofont-clock-time" },
    contactPhoneLabel: { type: String, default: "Call us anytime" },
    contactEmailLabel: { type: String, default: "Send us an email" },
    contactAddressLabel: { type: String, default: "Our headquarters" },

    // Application Process section
    processBadge: { type: String, default: "Simple Steps" },
    processHeading: {
      type: String,
      default: "Fast and very easy\napplication process here",
    },
    processSubtitle: {
      type: String,
      default:
        "We are here to help you when you need your financial\nsupport, then we are help you.",
    },

    // Conveyancing section
    conveyancingBadge: { type: String, default: "Conveyancing Services" },
    conveyancingHeading: {
      type: String,
      default: "Expert Property Transfer & Legal Services",
    },
    conveyancingSubtitle: {
      type: String,
      default:
        "From residential settlements to commercial title transfers, our licensed conveyancers ensure every transaction is secure, compliant, and hassle-free.",
    },
    conveyancingCtaCompactText: {
      type: String,
      default: "View All Conveyancing Services",
    },
    conveyancingCtaCompactUrl: { type: String, default: "/services" },
    conveyancingCtaFullText: {
      type: String,
      default: "Get a Free Consultation",
    },
    conveyancingCtaFullUrl: { type: String, default: "/application-form" },

    // Apply Amount Form section
    applyAmountHeading: {
      type: String,
      default: "Get your amount\nfor fillup this form",
    },
    applyAmountField1Placeholder: { type: String, default: "Amount" },
    applyAmountField2Placeholder: { type: String, default: "Long of months?" },
    applyAmountField3Placeholder: {
      type: String,
      default: "Installment amount.",
    },
    applyAmountButtonText: { type: String, default: "Subscribe Now" },

    // EMI Calculator section
    emiHeading: { type: String, default: "EMI Calculator" },
    emiSubtitle: {
      type: String,
      default:
        "Plan your loan repayment easily. Adjust the sliders to see your monthly\ninstallment, total interest, and total payment instantly.",
    },
    emiLoanAmountLabel: { type: String, default: "Loan Amount" },
    emiInterestLabel: { type: String, default: "Annual Interest Rate" },
    emiTenureLabel: { type: String, default: "Loan Tenure" },
    emiLoanAmountMin: { type: Number, default: 10000 },
    emiLoanAmountMax: { type: Number, default: 5000000 },
    emiLoanAmountStep: { type: Number, default: 10000 },
    emiLoanAmountDefault: { type: Number, default: 500000 },
    emiInterestMin: { type: Number, default: 1 },
    emiInterestMax: { type: Number, default: 30 },
    emiInterestStep: { type: Number, default: 0.1 },
    emiInterestDefault: { type: Number, default: 8.5 },
    emiTenureMin: { type: Number, default: 6 },
    emiTenureMax: { type: Number, default: 360 },
    emiTenureStep: { type: Number, default: 6 },
    emiTenureDefault: { type: Number, default: 60 },
    emiCurrency: { type: String, default: "USD" },
    emiMonthlyEmiLabel: { type: String, default: "Monthly EMI" },
    emiPrincipalLabel: { type: String, default: "Principal Amount" },
    emiInterestTotalLabel: { type: String, default: "Total Interest" },
    emiTotalPaymentLabel: { type: String, default: "Total Payment" },

    // Team section intro
    teamBadge: { type: String, default: "Our Experts" },
    teamHeading: { type: String, default: "Expert team members" },
    teamSubtitle: {
      type: String,
      default:
        "We are here to help you when you need your financial\nsupport, then we are help you.",
    },

    // Testimonials section intro
    testimonialsBadge: { type: String, default: "Testimonials" },
    testimonialsHeading: {
      type: String,
      default: "How to say our most\nhonorable customer",
    },
    testimonialsSubtitle: {
      type: String,
      default:
        "We are here to help you when you need your financial\nsupport, then we are help you.",
    },
    testimonialsRatingValue: { type: String, default: "4.9" },
    testimonialsRatingLabel: { type: String, default: "Customer Rating" },
    testimonialsImage: { type: String, default: "/images/about/3.png" },
    testimonialsImageAlt: { type: String, default: "Customer" },
  },
  { timestamps: true },
);

export const HomeContent =
  mongoose.models.HomeContent ??
  mongoose.model("HomeContent", homeContentSchema);

// ── Footer Content ────────────────────────────────────────
// Single-document collection that drives every editable bit
// of <Footer /> and <Copyright />. Site-wide contact info
// (phone/email/social) still lives in `Settings`.
const footerLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, default: "#" },
    icon: { type: String, default: "" },
  },
  { _id: false },
);

const footerBottomLinkSchema = new Schema(
  {
    label: { type: String, required: true },
    href: { type: String, default: "#" },
  },
  { _id: false },
);

const footerTrustBadgeSchema = new Schema(
  {
    icon: { type: String, default: "icofont-lock" },
    text: { type: String, required: true },
  },
  { _id: false },
);

const footerContentSchema = new Schema(
  {
    // Brand column
    brandLogo: { type: String, default: "/images/logo.png" },
    brandLogoAlt: { type: String, default: "Smart Loans" },
    brandDescription: {
      type: String,
      default:
        "Smart Loans helps you access fast, affordable financing with zero hassle. Trusted by 50,000+ customers across the country.",
    },

    // Quick links column
    quickLinksHeading: { type: String, default: "Quick Links" },
    quickLinks: {
      type: [footerLinkSchema],
      default: [
        { label: "Home", href: "/", icon: "icofont-home" },
        { label: "About Us", href: "/about", icon: "icofont-people" },
        { label: "Services", href: "/services", icon: "icofont-briefcase" },
        { label: "Contact", href: "/contact", icon: "icofont-phone" },
        {
          label: "Application Form",
          href: "/application-form",
          icon: "icofont-paper",
        },
      ],
    },

    // Loan types column
    loanLinksHeading: { type: String, default: "Loan Types" },
    loanLinks: {
      type: [footerLinkSchema],
      default: [
        { label: "Personal Loan", href: "/services", icon: "icofont-people" },
        {
          label: "Business Loan",
          href: "/services",
          icon: "icofont-businessman",
        },
        { label: "Home Loan", href: "/services", icon: "icofont-building" },
        { label: "Education Loan", href: "/services", icon: "icofont-student" },
        { label: "Car Loan", href: "/services", icon: "icofont-car" },
        { label: "Medical Loan", href: "/services", icon: "icofont-heartbeat" },
      ],
    },

    // Newsletter column
    newsletterHeading: { type: String, default: "Newsletter" },
    newsletterDescription: {
      type: String,
      default:
        "Get the latest loan tips, rate updates, and exclusive offers straight to your inbox.",
    },
    newsletterPlaceholder: { type: String, default: "Your email address" },
    newsletterButtonText: { type: String, default: "Subscribe Now" },
    newsletterButtonIcon: { type: String, default: "icofont-paper-plane" },
    newsletterSuccessText: { type: String, default: "You're subscribed!" },
    trustBadges: {
      type: [footerTrustBadgeSchema],
      default: [
        { icon: "icofont-lock", text: "SSL Secure" },
        { icon: "icofont-shield", text: "No Spam" },
      ],
    },

    // Bottom bar
    copyrightText: {
      type: String,
      default: "© {year} {siteName}. All rights reserved.",
    },
    bottomLinks: {
      type: [footerBottomLinkSchema],
      default: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Use", href: "#" },
        { label: "Sitemap", href: "#" },
      ],
    },

    // Copyright bar (separate <Copyright /> component)
    copyrightBarText: {
      type: String,
      default: "Copyright {siteName}. All rights reserved",
    },
  },
  { timestamps: true },
);

export const FooterContent =
  mongoose.models.FooterContent ??
  mongoose.model("FooterContent", footerContentSchema);
