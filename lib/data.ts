/**
 * Server-side data helpers.
 * Each function connects to MongoDB directly (no HTTP round-trip) and always
 * returns hardcoded fallback data when the DB is unavailable or empty.
 */

import { connectDB } from "./mongodb";
import {
  Settings,
  Hero,
  Stat,
  Service,
  WhyChooseUs,
  TeamMember,
  Testimonial,
  BlogPost,
  ProcessStep,
  Partner,
  AboutPage,
  ContactPage,
  ApplicationPage,
  ConveyancingService,
  HomeContent,
  FooterContent,
} from "./models";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface SiteSettings {
  siteName: string;
  tagline: string;
  phone1: string;
  phone2: string;
  email: string;
  whatsapp: string;
  address: string;
  workingHours: string;
  facebookUrl: string;
  twitterUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  youtubeUrl: string;
}

export interface HeroData {
  eyebrow: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaPrimaryUrl: string;
  ctaSecondary: string;
  ctaSecondaryUrl: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  image: string;
  imageAlt: string;
  badge1Title: string;
  badge1Subtitle: string;
  badge1Icon: string;
  badge2Title: string;
  badge2Subtitle: string;
  badge2Icon: string;
}

export interface WhyLogo {
  image: string;
  alt: string;
}

export interface HomeContentData {
  // Services intro
  servicesBadge: string;
  servicesHeading: string;
  servicesSubtitle: string;
  servicesCtaText: string;
  servicesCtaUrl: string;
  servicesFeature1Icon: string;
  servicesFeature1Text: string;
  servicesFeature2Icon: string;
  servicesFeature2Text: string;
  servicesFeature3Icon: string;
  servicesFeature3Text: string;
  servicesFeature4Icon: string;
  servicesFeature4Text: string;
  // Loan Products
  loanProductsBadge: string;
  loanProductsHeading: string;
  loanProductsSubtitle: string;
  loanProductsTags: string[];
  loanProductsCtaText: string;
  loanProductsCtaUrl: string;
  // Why Choose Us
  whyBadge: string;
  whyHeading: string;
  whySubtitle: string;
  whyLogosHeading: string;
  whyLogos: WhyLogo[];
  // Home Contact
  contactBadge: string;
  contactHeading: string;
  contactSubtitle: string;
  contactCtaText: string;
  contactCtaUrl: string;
  contactImage: string;
  contactImageAlt: string;
  contactBadge1Title: string;
  contactBadge1Subtitle: string;
  contactBadge1Icon: string;
  contactBadge2Title: string;
  contactBadge2Subtitle: string;
  contactBadge2Icon: string;
  contactPhoneLabel: string;
  contactEmailLabel: string;
  contactAddressLabel: string;
  // Process
  processBadge: string;
  processHeading: string;
  processSubtitle: string;
  // Conveyancing
  conveyancingBadge: string;
  conveyancingHeading: string;
  conveyancingSubtitle: string;
  conveyancingCtaCompactText: string;
  conveyancingCtaCompactUrl: string;
  conveyancingCtaFullText: string;
  conveyancingCtaFullUrl: string;
  // Apply Amount
  applyAmountHeading: string;
  applyAmountField1Placeholder: string;
  applyAmountField2Placeholder: string;
  applyAmountField3Placeholder: string;
  applyAmountButtonText: string;
  // EMI Calculator
  emiHeading: string;
  emiSubtitle: string;
  emiLoanAmountLabel: string;
  emiInterestLabel: string;
  emiTenureLabel: string;
  emiLoanAmountMin: number;
  emiLoanAmountMax: number;
  emiLoanAmountStep: number;
  emiLoanAmountDefault: number;
  emiInterestMin: number;
  emiInterestMax: number;
  emiInterestStep: number;
  emiInterestDefault: number;
  emiTenureMin: number;
  emiTenureMax: number;
  emiTenureStep: number;
  emiTenureDefault: number;
  emiCurrency: string;
  emiMonthlyEmiLabel: string;
  emiPrincipalLabel: string;
  emiInterestTotalLabel: string;
  emiTotalPaymentLabel: string;
  // Team
  teamBadge: string;
  teamHeading: string;
  teamSubtitle: string;
  // Testimonials
  testimonialsBadge: string;
  testimonialsHeading: string;
  testimonialsSubtitle: string;
  testimonialsRatingValue: string;
  testimonialsRatingLabel: string;
  testimonialsImage: string;
  testimonialsImageAlt: string;
}

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}
export interface FooterBottomLink {
  label: string;
  href: string;
}
export interface FooterTrustBadge {
  icon: string;
  text: string;
}

export interface FooterContentData {
  brandLogo: string;
  brandLogoAlt: string;
  brandDescription: string;
  quickLinksHeading: string;
  quickLinks: FooterLink[];
  loanLinksHeading: string;
  loanLinks: FooterLink[];
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterButtonIcon: string;
  newsletterSuccessText: string;
  trustBadges: FooterTrustBadge[];
  copyrightText: string;
  bottomLinks: FooterBottomLink[];
  copyrightBarText: string;
}

export interface StatItem {
  _id: string;
  icon: string;
  value: string;
  label: string;
  color: string;
  order: number;
}
export interface ServiceItem {
  _id: string;
  /** URL-friendly identifier used in /service-details/<slug>. Optional on
   *  legacy documents; the data layer falls back to `_id` lookup when
   *  the slug isn't available. */
  slug?: string;
  icon: string;
  rate: string;
  title: string;
  amount: string;
  tenure: string;
  desc: string;
  features: string[];
  color: string;
  order: number;
}
export interface WhyItem {
  _id: string;
  icon: string;
  title: string;
  desc: string;
  color: string;
  bg: string;
  order: number;
}
export interface TeamItem {
  _id: string;
  name: string;
  role: string;
  description: string;
  image: string;
  order: number;
}
export interface TestimonialItem {
  _id: string;
  name: string;
  role: string;
  image: string;
  text: string;
  stars: number;
  order: number;
}
export interface BlogItem {
  _id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  date: string;
  image: string;
  excerpt: string;
  content: string;
  published: boolean;
}
export interface ProcessStepItem {
  _id: string;
  num: string;
  title: string;
  desc: string;
  icon: string;
  order: number;
}
export interface PartnerItem {
  _id: string;
  type: "partner" | "award" | "certification";
  name: string;
  icon: string;
  color: string;
  org: string;
  text: string;
  order: number;
}
export interface ConveyancingItem {
  _id: string;
  icon: string;
  title: string;
  desc: string;
  features: string[];
  color: string;
  order: number;
}

export interface AboutHistoryItem {
  _id?: string;
  period: string;
  frontDesc1: string;
  frontDesc2: string;
  backDesc1: string;
  backDesc2: string;
  order: number;
}

export interface AboutPageData {
  sec1Heading: string;
  sec1Sub: string;
  sec1Body1: string;
  sec1Body2: string;
  sec1Image: string;
  sec2Heading: string;
  sec2Sub: string;
  sec2Link: string;
  sec2Body: string;
  sec2Image: string;
  historyTitle: string;
  historyDesc: string;
  /** Canonical, dynamic history cards (sorted by `order` ASC). */
  historyItems: AboutHistoryItem[];
  // Legacy fields preserved for backwards-compat on older documents.
  // Prefer historyItems on the rendering side.
  history1Period: string;
  history1FrontDesc1: string;
  history1FrontDesc2: string;
  history1BackDesc1: string;
  history1BackDesc2: string;
  history2Period: string;
  history2FrontDesc1: string;
  history2FrontDesc2: string;
  history2BackDesc1: string;
  history2BackDesc2: string;
  history3Period: string;
  history3FrontDesc1: string;
  history3FrontDesc2: string;
  history3BackDesc1: string;
  history3BackDesc2: string;
  bannerTitle: string;
  bannerDesc: string;
}

export interface ContactPageData {
  bannerTitle: string;
  bannerDesc: string;
  infoEyebrow: string;
  infoHeading: string;
  infoDescription: string;
  phoneLabel: string;
  emailLabel: string;
  whatsappLabel: string;
  addressLabel: string;
  hoursLabel: string;
  followLabel: string;
  formHeading: string;
  formSubtitle: string;
}

export interface ApplyBenefit {
  icon: string;
  title: string;
  desc: string;
}

export interface ApplyStep {
  num: string;
  title: string;
  desc: string;
}

export interface ApplicationPageData {
  bannerTitle: string;
  bannerEyebrow: string;
  bannerDesc: string;
  sideBadge: string;
  sideHeading: string;
  sideDescription: string;
  benefits: ApplyBenefit[];
  processHeading: string;
  steps: ApplyStep[];
  helpLabel: string;
  formHeading: string;
  formSubtitle: string;
}

// ── Fallbacks ─────────────────────────────────────────────────────────────────

const FALLBACK_SETTINGS: SiteSettings = {
  siteName: "Smart Loans",
  tagline: "Banking & Business Loan",
  phone1: "+1 (800) 694-8956",
  phone2: "88 487 983 576",
  email: "hello@Smart Loans.com",
  whatsapp: "+1 (800) 694-8956",
  address: "42 Finance Tower, New York, NY 10001",
  workingHours: "Mon – Sat: 9 AM – 6 PM",
  facebookUrl: "#",
  twitterUrl: "#",
  linkedinUrl: "#",
  instagramUrl: "#",
  youtubeUrl: "#",
};

const FALLBACK_HERO: HeroData = {
  eyebrow: "Trusted by 50,000+ customers",
  title: "Fast, Flexible & Trusted Loan Solutions",
  subtitle:
    "Get instant approval with lowest interest rates, flexible repayment, and zero hidden charges.",
  ctaPrimary: "Apply Now",
  ctaPrimaryUrl: "/application-form",
  ctaSecondary: "Learn More",
  ctaSecondaryUrl: "/services",
  stat1Value: "50K+",
  stat1Label: "Happy Customers",
  stat2Value: "$500M+",
  stat2Label: "Disbursed",
  stat3Value: "24 Hrs",
  stat3Label: "Approval Time",
  image: "/images/slider/2.png",
  imageAlt: "Loan",
  badge1Title: "Instant Approval",
  badge1Subtitle: "Within 24 hours",
  badge1Icon: "icofont-check-alt",
  badge2Title: "Low Interest",
  badge2Subtitle: "From 8.5%",
  badge2Icon: "icofont-dollar",
};

const FALLBACK_HOME_CONTENT: HomeContentData = {
  servicesBadge: "Our Services",
  servicesHeading: "We provide awesome services, it's here.",
  servicesSubtitle:
    "We are here to help you when you need your financial support, then we are here to guide you every step of the way.",
  servicesCtaText: "View More",
  servicesCtaUrl: "/services",
  servicesFeature1Icon: "icofont-check-circled",
  servicesFeature1Text: "Fastest Loan Approval",
  servicesFeature2Icon: "icofont-ui-calculator",
  servicesFeature2Text: "Flexible / Transparent EMI",
  servicesFeature3Icon: "icofont-support",
  servicesFeature3Text: "Making Every Step Simple and Stress-Free",
  servicesFeature4Icon: "",
  servicesFeature4Text: "",

  loanProductsBadge: "Loan Products",
  loanProductsHeading: "Choose the right loan\nfor your needs",
  loanProductsSubtitle:
    "From personal to business, we have a loan product crafted\nfor every milestone in your life.",
  loanProductsTags: [
    "Most Popular",
    "Best Rate",
    "Low Interest",
    "Fast Approval",
    "Lowest Rate",
    "Emergency",
  ],
  loanProductsCtaText: "Apply Now",
  loanProductsCtaUrl: "/application-form",

  whyBadge: "Why Smart Loans",
  whyHeading: "Why thousands of people\nchoose us every day",
  whySubtitle:
    "We combine speed, trust, and flexibility to deliver the best\nloan experience you've ever had.",
  whyLogosHeading: "",
  whyLogos: [],

  contactBadge: "Get In Touch",
  contactHeading: "Our manager will contact you to clear the details.",
  contactSubtitle:
    "We are here to help you when you need your financial support, then we are here to guide you.",
  contactCtaText: "Call Us Now",
  contactCtaUrl: "/contact",
  contactImage: "/images/home/1.png",
  contactImageAlt: "Contact",
  contactBadge1Title: "100% Secure",
  contactBadge1Subtitle: "Bank-level safety",
  contactBadge1Icon: "icofont-shield-alt",
  contactBadge2Title: "Response Time",
  contactBadge2Subtitle: "Under 2 Hours",
  contactBadge2Icon: "icofont-clock-time",
  contactPhoneLabel: "Call us anytime",
  contactEmailLabel: "Send us an email",
  contactAddressLabel: "Our headquarters",

  processBadge: "Simple Steps",
  processHeading: "Fast and Very Easy\nApplication Process",
  processSubtitle:
    "Three simple steps and our team takes care of the rest —\nfast, transparent, and stress-free.",

  conveyancingBadge: "Conveyancing Services",
  conveyancingHeading: "Expert Property Transfer & Legal Services",
  conveyancingSubtitle:
    "From residential settlements to commercial title transfers, our licensed conveyancers ensure every transaction is secure, compliant, and hassle-free.",
  conveyancingCtaCompactText: "View All Conveyancing Services",
  conveyancingCtaCompactUrl: "/services",
  conveyancingCtaFullText: "Get a Free Consultation",
  conveyancingCtaFullUrl: "/application-form",

  applyAmountHeading: "",
  applyAmountField1Placeholder: "Amount",
  applyAmountField2Placeholder: "Long of months?",
  applyAmountField3Placeholder: "Installment amount.",
  applyAmountButtonText: "Subscribe Now",

  emiHeading: "EMI Calculator",
  emiSubtitle:
    "Plan your loan repayment easily. Adjust the sliders to see your monthly\ninstallment, total interest, and total payment instantly.",
  emiLoanAmountLabel: "Loan Amount",
  emiInterestLabel: "Annual Interest Rate",
  emiTenureLabel: "Loan Tenure",
  emiLoanAmountMin: 10000,
  emiLoanAmountMax: 5000000,
  emiLoanAmountStep: 10000,
  emiLoanAmountDefault: 500000,
  emiInterestMin: 1,
  emiInterestMax: 30,
  emiInterestStep: 0.1,
  emiInterestDefault: 8.5,
  emiTenureMin: 6,
  emiTenureMax: 360,
  emiTenureStep: 6,
  emiTenureDefault: 60,
  emiCurrency: "USD",
  emiMonthlyEmiLabel: "Monthly EMI",
  emiPrincipalLabel: "Principal Amount",
  emiInterestTotalLabel: "Total Interest",
  emiTotalPaymentLabel: "Total Payment",

  teamBadge: "Our Experts",
  teamHeading: "Expert team members",
  teamSubtitle:
    "We are here to help you when you need your financial\nsupport, then we are help you.",

  testimonialsBadge: "Testimonials",
  testimonialsHeading: "What Our Clients\nSay About Us",
  testimonialsSubtitle:
    "Real stories from people who chose Smart Loans\nto power their next big step.",
  testimonialsRatingValue: "5",
  testimonialsRatingLabel: "Customer Rating",
  testimonialsImage: "/images/about/3.png",
  testimonialsImageAlt: "Customer",
};

const FALLBACK_STATS: StatItem[] = [
  {
    _id: "1",
    icon: "icofont-people",
    value: "25,000+",
    label: "Happy Customers",
    color: "#2cbbdf",
    order: 1,
  },
  {
    _id: "2",
    icon: "icofont-money",
    value: "$2B+",
    label: "Loans Processed",
    color: "#f0734a",
    order: 2,
  },
  {
    _id: "3",
    icon: "icofont-check-circled",
    value: "98%",
    label: "Approval Rate",
    color: "#27ae60",
    order: 3,
  },
  {
    _id: "4",
    icon: "icofont-globe",
    value: "50+",
    label: "Cities Covered",
    color: "#e91e8c",
    order: 4,
  },
];

const FALLBACK_SERVICES: ServiceItem[] = [
  {
    _id: "1",
    slug: "home-loan",
    icon: "flaticon-mortgage-loan",
    rate: "6.90%",
    title: "Home Loan",
    amount: "$5,000,000",
    tenure: "Up to 360 months",
    desc: "Own your dream home with Smart Loans.",
    features: ["Top-up facility", "Balance transfer", "Dedicated manager"],
    color: "#ff9800",
    order: 1,
  },
  {
    _id: "2",
    slug: "business-loan",
    icon: "flaticon-mortgage-loan",
    rate: "10.2%",
    title: "Business Loan",
    amount: "$500,000",
    tenure: "Up to 84 months",
    desc: "Working capital for SMEs and startups, powered by Smart Loans.",
    features: ["Fast disbursal", "Minimal paperwork", "Overdraft"],
    color: "#f0734a",
    order: 2,
  },
  {
    _id: "3",
    slug: "car-loan",
    icon: "flaticon-loan-2",
    rate: "9.35%",
    title: "Car Loan",
    amount: "$300,000",
    tenure: "Up to 60 months",
    desc: "Buy a new or used car easily with Smart Loans.",
    features: ["Up to 95% financing", "Used car", "Doorstep processing"],
    color: "#27ae60",
    order: 3,
  },
];

const FALLBACK_WHY: WhyItem[] = [
  {
    _id: "1",
    icon: "icofont-flash",
    title: "Lightning Fast Approval",
    desc: "Approved within 24 hours.",
    color: "#2cbbdf",
    bg: "rgba(44,187,223,0.10)",
    order: 1,
  },
  {
    _id: "2",
    icon: "icofont-shield-alt",
    title: "Bank-Level Security",
    desc: "256-bit SSL protection.",
    color: "#27ae60",
    bg: "rgba(39,174,96,0.10)",
    order: 2,
  },
  {
    _id: "3",
    icon: "icofont-money",
    title: "Lowest Interest Rates",
    desc: "Starting from just 8.5% p.a.",
    color: "#f0734a",
    bg: "rgba(240,115,74,0.10)",
    order: 3,
  },
  {
    _id: "4",
    icon: "icofont-ui-calculator",
    title: "Flexible Repayment",
    desc: "Tenure from 6 to 360 months.",
    color: "#e91e8c",
    bg: "rgba(233,30,140,0.10)",
    order: 4,
  },
  {
    _id: "5",
    icon: "icofont-support",
    title: "24 / 7 Expert Support",
    desc: "Advisors always available.",
    color: "#2196f3",
    bg: "rgba(33,150,243,0.10)",
    order: 5,
  },
  {
    _id: "6",
    icon: "icofont-paper",
    title: "Zero Hidden Charges",
    desc: "Complete transparency guaranteed.",
    color: "#ff9800",
    bg: "rgba(255,152,0,0.10)",
    order: 6,
  },
];

const FALLBACK_TEAM: TeamItem[] = [
  {
    _id: "1",
    name: "Roxanne Bryant",
    role: "Managing Director",
    description:
      "Leads the company with 15+ years in financial services and a passion for client success.",
    image: "/images/team/1.png",
    order: 1,
  },
  {
    _id: "2",
    name: "Dominic Jefferson",
    role: "Head of Marketing",
    description:
      "Drives brand growth and customer engagement through data-driven marketing strategies.",
    image: "/images/team/2.png",
    order: 2,
  },
  {
    _id: "3",
    name: "Mercedes Baldwin",
    role: "General Manager",
    description:
      "Oversees daily operations ensuring seamless loan processing and team performance.",
    image: "/images/team/3.png",
    order: 3,
  },
  {
    _id: "4",
    name: "Gertrude Keller",
    role: "Commercial Manager",
    description:
      "Manages key commercial partnerships and helps businesses secure the right financing.",
    image: "/images/team/4.png",
    order: 4,
  },
];

const FALLBACK_TESTIMONIALS: TestimonialItem[] = [
  {
    _id: "1",
    name: "Austin Matthews",
    role: "Business Owner",
    stars: 5,
    text: "From time to time we need generate sample names to populate a test database.",
    image: "/images/about/5.png",
    order: 1,
  },
  {
    _id: "2",
    name: "Evelyn Goodman",
    role: "Freelancer",
    stars: 5,
    text: "From time to time we need generate sample names to populate a test database.",
    image: "/images/about/5.png",
    order: 2,
  },
  {
    _id: "3",
    name: "Calvin Cannon",
    role: "Entrepreneur",
    stars: 5,
    text: "From time to time we need generate sample names to populate a test database.",
    image: "/images/about/5.png",
    order: 3,
  },
];

const FALLBACK_BLOG: BlogItem[] = [
  {
    _id: "1",
    title: "What should you need do to get personal loan very easily.",
    slug: "how-to-get-personal-loan",
    category: "Finance",
    author: "Admin",
    date: "2026-04-02",
    image: "/images/blog/1.jpg",
    excerpt:
      "Many modern alternatives often eumen incorpo other content actually detracts from...",
    content: "",
    published: true,
  },
  {
    _id: "2",
    title: "Top 5 tips to improve your credit score before applying.",
    slug: "improve-credit-score-tips",
    category: "Tips",
    author: "Admin",
    date: "2026-04-07",
    image: "/images/blog/2.jpg",
    excerpt:
      "Many modern alternatives often eumen incorpo other content actually detracts from...",
    content: "",
    published: true,
  },
  {
    _id: "3",
    title: "Understanding EMI: A complete guide for first-time borrowers.",
    slug: "understanding-emi-guide",
    category: "Personal Finance",
    author: "Admin",
    date: "2026-04-12",
    image: "/images/blog/3.jpg",
    excerpt: "EMI stands for Equated Monthly Installment.",
    content: "",
    published: true,
  },
];

const FALLBACK_ABOUT: AboutPageData = {
  sec1Heading: "Why we started Smart Loans?",
  sec1Sub:
    "Smart Loans was founded to make financing simple, transparent, and accessible for every Indian household and business.",
  sec1Body1:
    "Smart Loans was started with one goal — to take the friction out of borrowing. We help you cut through paperwork, jargon, and waiting rooms, and connect you with the right lender for your needs.",
  sec1Body2:
    "Whether you are looking for a Home Loan for your dream property, a Business Loan to fuel growth, or a Car Loan for your next ride, our team is here to guide you end-to-end.",
  sec1Image: "/images/about/1.png",
  sec2Heading: "A leading consumer finance company you can trust.",
  sec2Sub:
    "We combine deep lender relationships with a customer-first approach so you always get a clear, honest deal.",
  sec2Link:
    "Smart Loans partners with multiple banks and NBFCs so you can compare offers in one place and pick the one that fits you best.",
  sec2Body:
    "Since 2017 we have helped thousands of customers find the right loan — from first-time home buyers to growing businesses. Every application is reviewed by a real human, and our advisors are with you from the first conversation until disbursal.",
  sec2Image: "/images/about/2.png",
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
        "Crossed the milestone of $100M in loans facilitated within two years.",
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
  history1Period: "2010 to 2013",
  history1FrontDesc1:
    "We all know how hard it can be to make your start into the world of as easy possible.",
  history1FrontDesc2: "We all know how hard it can be to as easy possible.",
  history1BackDesc1:
    "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
  history1BackDesc2:
    "We all know how hard it can be to make site look like the demo so to make your start into.",
  history2Period: "2014 to 2016",
  history2FrontDesc1:
    "We all know how hard it can be to make your start into the world of as easy possible.",
  history2FrontDesc2: "We all know how hard it can be to as easy possible.",
  history2BackDesc1:
    "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
  history2BackDesc2:
    "We all know how hard it can be to make site look like the demo so to make your start into.",
  history3Period: "2017 to 2019",
  history3FrontDesc1:
    "We all know how hard it can be to make your start into the world of as easy possible.",
  history3FrontDesc2: "We all know how hard it can be to as easy possible.",
  history3BackDesc1:
    "We all know how hard it can be to make site look like the demo so to make your start into the world of as easy possible.",
  history3BackDesc2:
    "We all know how hard it can be to make site look like the demo so to make your start into.",
  bannerTitle: "About us",
  bannerDesc:
    "We are here to help you when you need your<br>financial support, then we are help you.",
};

// ── Fetch helpers ─────────────────────────────────────────────────────────────

// Converts BSON ObjectIds (and any other non-plain values) to plain JS so
// Mongoose .lean() results can safely be passed as props to Client Components.
function serialize<T>(val: T): T {
  return JSON.parse(JSON.stringify(val));
}

async function safeConnect() {
  try {
    await connectDB();
    return true;
  } catch {
    return false;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  if (!(await safeConnect())) return FALLBACK_SETTINGS;
  try {
    const doc = await Settings.findOne().lean<SiteSettings>();
    return serialize(doc ?? FALLBACK_SETTINGS);
  } catch {
    return FALLBACK_SETTINGS;
  }
}

export async function getHero(): Promise<HeroData> {
  if (!(await safeConnect())) return FALLBACK_HERO;
  try {
    const doc = await Hero.findOne().lean<HeroData>();
    return serialize(doc ?? FALLBACK_HERO);
  } catch {
    return FALLBACK_HERO;
  }
}

export async function getStats(): Promise<StatItem[]> {
  if (!(await safeConnect())) return FALLBACK_STATS;
  try {
    const docs = await Stat.find().sort({ order: 1 }).lean<StatItem[]>();
    return serialize(docs.length ? docs : FALLBACK_STATS);
  } catch {
    return FALLBACK_STATS;
  }
}

/**
 * Convert a title to a URL-safe slug. Used as an in-memory fallback when an
 * older document hasn't yet been saved with the auto-generated slug from
 * the model's pre-hook.
 */
function fallbackSlug(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

/** Ensure every returned service has a non-empty `slug` so callers can
 *  always build URLs like `/service-details/<slug>` without falling back
 *  to the raw `_id`. */
function ensureSlugs(items: ServiceItem[]): ServiceItem[] {
  return items.map((s) =>
    s.slug && s.slug.length > 0
      ? s
      : { ...s, slug: fallbackSlug(s.title) || s._id },
  );
}

export async function getServices(): Promise<ServiceItem[]> {
  if (!(await safeConnect())) return ensureSlugs(FALLBACK_SERVICES);
  try {
    const docs = await Service.find().sort({ order: 1 }).lean<ServiceItem[]>();
    return ensureSlugs(serialize(docs.length ? docs : FALLBACK_SERVICES));
  } catch {
    return ensureSlugs(FALLBACK_SERVICES);
  }
}

export async function getServiceById(id: string): Promise<ServiceItem | null> {
  if (!(await safeConnect()))
    return FALLBACK_SERVICES.find((s) => s._id === id) ?? null;
  try {
    const doc = await Service.findById(id).lean<ServiceItem>();
    return doc ? serialize(doc) : null;
  } catch {
    return null;
  }
}

/**
 * Look up a service by its URL slug. For backwards compatibility with any
 * old links / bookmarks, if no document matches by slug AND the input looks
 * like a 24-char hex ObjectId, we fall back to an `_id` lookup so existing
 * `/service-details/<id>` URLs keep working.
 */
export async function getServiceBySlug(
  slugOrId: string,
): Promise<ServiceItem | null> {
  if (!slugOrId) return null;

  if (!(await safeConnect())) {
    return (
      FALLBACK_SERVICES.find((s) => s.slug === slugOrId) ??
      FALLBACK_SERVICES.find((s) => s._id === slugOrId) ??
      null
    );
  }

  try {
    const bySlug = await Service.findOne({ slug: slugOrId }).lean<ServiceItem>();
    if (bySlug) return serialize(bySlug);

    if (/^[a-f0-9]{24}$/i.test(slugOrId)) {
      const byId = await Service.findById(slugOrId).lean<ServiceItem>();
      if (byId) return serialize(byId);
    }

    // Last resort: match against the title-derived fallback slug for
    // legacy documents that have not yet been saved with a real slug.
    const all = await Service.find().lean<ServiceItem[]>();
    const match = all.find(
      (s) => fallbackSlug(s.title) === slugOrId,
    );
    return match ? serialize(match) : null;
  } catch {
    return null;
  }
}

export async function getWhyChooseUs(): Promise<WhyItem[]> {
  if (!(await safeConnect())) return FALLBACK_WHY;
  try {
    const docs = await WhyChooseUs.find().sort({ order: 1 }).lean<WhyItem[]>();
    return serialize(docs.length ? docs : FALLBACK_WHY);
  } catch {
    return FALLBACK_WHY;
  }
}

export async function getTeam(): Promise<TeamItem[]> {
  if (!(await safeConnect())) return FALLBACK_TEAM;
  try {
    const docs = await TeamMember.find().sort({ order: 1 }).lean<TeamItem[]>();
    return serialize(docs.length ? docs : FALLBACK_TEAM);
  } catch {
    return FALLBACK_TEAM;
  }
}

export async function getTestimonials(): Promise<TestimonialItem[]> {
  if (!(await safeConnect())) return FALLBACK_TESTIMONIALS;
  try {
    const docs = await Testimonial.find()
      .sort({ order: 1 })
      .lean<TestimonialItem[]>();
    return serialize(docs.length ? docs : FALLBACK_TESTIMONIALS);
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getBlogPosts(publishedOnly = true): Promise<BlogItem[]> {
  if (!(await safeConnect())) return FALLBACK_BLOG;
  try {
    const query = publishedOnly ? { published: true } : {};
    const docs = await BlogPost.find(query)
      .sort({ date: -1 })
      .lean<BlogItem[]>();
    return serialize(docs.length ? docs : FALLBACK_BLOG);
  } catch {
    return FALLBACK_BLOG;
  }
}

const FALLBACK_PROCESS: ProcessStepItem[] = [
  {
    _id: "1",
    num: "01",
    title: "Apply Bank Loan",
    desc: "Fill out our simple online form in just a few minutes.",
    icon: "icofont-paper",
    order: 1,
  },
  {
    _id: "2",
    num: "02",
    title: "Approved Bank Loan",
    desc: "Our team reviews and approves your application quickly.",
    icon: "icofont-check-circled",
    order: 2,
  },
  {
    _id: "3",
    num: "03",
    title: "Review Your Loan",
    desc: "Receive funds and manage repayments with ease.",
    icon: "icofont-money",
    order: 3,
  },
];

const FALLBACK_PARTNERS: PartnerItem[] = [
  {
    _id: "p1",
    type: "partner",
    name: "HDFC Bank",
    icon: "icofont-bank",
    color: "#004c8f",
    org: "",
    text: "",
    order: 1,
  },
  {
    _id: "p2",
    type: "partner",
    name: "ICICI Bank",
    icon: "icofont-institution",
    color: "#f37021",
    org: "",
    text: "",
    order: 2,
  },
  {
    _id: "p3",
    type: "partner",
    name: "Axis Bank",
    icon: "icofont-money",
    color: "#97144d",
    org: "",
    text: "",
    order: 3,
  },
  {
    _id: "p4",
    type: "partner",
    name: "SBI",
    icon: "icofont-building",
    color: "#22509d",
    org: "",
    text: "",
    order: 4,
  },
  {
    _id: "p5",
    type: "partner",
    name: "Kotak Bank",
    icon: "icofont-ui-wallet",
    color: "#ed1c24",
    org: "",
    text: "",
    order: 5,
  },
  {
    _id: "p6",
    type: "partner",
    name: "Yes Bank",
    icon: "icofont-chart-bar",
    color: "#0052a2",
    org: "",
    text: "",
    order: 6,
  },
  {
    _id: "a1",
    type: "award",
    name: "Best Loan Provider 2024",
    icon: "icofont-badge",
    color: "#2cbbdf",
    org: "Finance India Awards",
    text: "",
    order: 7,
  },
  {
    _id: "a2",
    type: "award",
    name: "Customer Choice Award",
    icon: "icofont-star",
    color: "#f0734a",
    org: "Banking Excellence 2024",
    text: "",
    order: 8,
  },
  {
    _id: "a3",
    type: "award",
    name: "Most Trusted Brand",
    icon: "icofont-shield-alt",
    color: "#27ae60",
    org: "Consumer Voice Report",
    text: "",
    order: 9,
  },
  {
    _id: "a4",
    type: "award",
    name: "ISO 9001:2015 Certified",
    icon: "icofont-certificate-alt-1",
    color: "#2196f3",
    org: "Quality Management",
    text: "",
    order: 10,
  },
  {
    _id: "c1",
    type: "certification",
    name: "256-bit SSL Encrypted",
    icon: "icofont-lock",
    color: "#2cbbdf",
    org: "",
    text: "256-bit SSL Encrypted",
    order: 11,
  },
  {
    _id: "c2",
    type: "certification",
    name: "RBI Registered NBFC",
    icon: "icofont-check-circled",
    color: "#27ae60",
    org: "",
    text: "RBI Registered NBFC",
    order: 12,
  },
  {
    _id: "c3",
    type: "certification",
    name: "ISO 27001 Certified",
    icon: "icofont-safety",
    color: "#f0734a",
    org: "",
    text: "ISO 27001 Certified",
    order: 13,
  },
  {
    _id: "c4",
    type: "certification",
    name: "PCI DSS Compliant",
    icon: "icofont-shield",
    color: "#e91e8c",
    org: "",
    text: "PCI DSS Compliant",
    order: 14,
  },
];

export async function getProcessSteps(): Promise<ProcessStepItem[]> {
  if (!(await safeConnect())) return FALLBACK_PROCESS;
  try {
    const docs = await ProcessStep.find()
      .sort({ order: 1 })
      .lean<ProcessStepItem[]>();
    return serialize(docs.length ? docs : FALLBACK_PROCESS);
  } catch {
    return FALLBACK_PROCESS;
  }
}

export async function getPartners(): Promise<PartnerItem[]> {
  if (!(await safeConnect())) return FALLBACK_PARTNERS;
  try {
    const docs = await Partner.find().sort({ order: 1 }).lean<PartnerItem[]>();
    return serialize(docs.length ? docs : FALLBACK_PARTNERS);
  } catch {
    return FALLBACK_PARTNERS;
  }
}

export async function getBlogPost(slug: string): Promise<BlogItem | null> {
  if (!(await safeConnect()))
    return FALLBACK_BLOG.find((b) => b.slug === slug) ?? null;
  try {
    const bySlug = await BlogPost.findOne({ slug }).lean<BlogItem>();
    if (bySlug) return serialize(bySlug);
    return (
      FALLBACK_BLOG.find((b) => b.slug === slug || String(b._id) === slug) ??
      null
    );
  } catch {
    return null;
  }
}

export async function getAboutPage(): Promise<AboutPageData> {
  if (!(await safeConnect())) return FALLBACK_ABOUT;
  try {
    const doc = await AboutPage.findOne().lean<AboutPageData>();
    if (!doc) return FALLBACK_ABOUT;
    const data = serialize(doc) as AboutPageData;

    // Back-compat: if the new dynamic list is empty, build it from the
    // legacy history1/2/3 fields so older documents keep rendering correctly.
    if (!Array.isArray(data.historyItems) || data.historyItems.length === 0) {
      const legacy: AboutHistoryItem[] = [];
      for (const i of [1, 2, 3] as const) {
        const period = (data as unknown as Record<string, string>)[`history${i}Period`];
        if (period) {
          legacy.push({
            period,
            frontDesc1: (data as unknown as Record<string, string>)[`history${i}FrontDesc1`] ?? "",
            frontDesc2: (data as unknown as Record<string, string>)[`history${i}FrontDesc2`] ?? "",
            backDesc1: (data as unknown as Record<string, string>)[`history${i}BackDesc1`] ?? "",
            backDesc2: (data as unknown as Record<string, string>)[`history${i}BackDesc2`] ?? "",
            order: i - 1,
          });
        }
      }
      data.historyItems = legacy.length ? legacy : FALLBACK_ABOUT.historyItems;
    }

    data.historyItems = [...data.historyItems].sort(
      (a, b) => (a.order ?? 0) - (b.order ?? 0),
    );

    return data;
  } catch {
    return FALLBACK_ABOUT;
  }
}

const FALLBACK_CONTACT: ContactPageData = {
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

export async function getContactPage(): Promise<ContactPageData> {
  if (!(await safeConnect())) return FALLBACK_CONTACT;
  try {
    const doc = await ContactPage.findOne().lean<ContactPageData>();
    if (!doc) return FALLBACK_CONTACT;
    return { ...FALLBACK_CONTACT, ...serialize(doc) };
  } catch {
    return FALLBACK_CONTACT;
  }
}

const FALLBACK_APPLICATION: ApplicationPageData = {
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

export async function getApplicationPage(): Promise<ApplicationPageData> {
  if (!(await safeConnect())) return FALLBACK_APPLICATION;
  try {
    const doc = await ApplicationPage.findOne().lean<ApplicationPageData>();
    if (!doc) return FALLBACK_APPLICATION;
    const data = { ...FALLBACK_APPLICATION, ...serialize(doc) };
    if (!Array.isArray(data.benefits) || data.benefits.length === 0)
      data.benefits = FALLBACK_APPLICATION.benefits;
    if (!Array.isArray(data.steps) || data.steps.length === 0)
      data.steps = FALLBACK_APPLICATION.steps;
    return data;
  } catch {
    return FALLBACK_APPLICATION;
  }
}

const FALLBACK_CONVEYANCING: ConveyancingItem[] = [
  {
    _id: "c1",
    icon: "icofont-home",
    title: "Residential Conveyancing",
    desc: "Seamless buying and selling of residential properties with full legal protection at every step.",
    features: [
      "Contract review & negotiation",
      "Title & encumbrance search",
      "Settlement coordination",
    ],
    color: "#2cbbdf",
    order: 1,
  },
  {
    _id: "c2",
    icon: "icofont-building-alt",
    title: "Commercial Conveyancing",
    desc: "Expert handling of commercial property transfers, leases, and developments for businesses of all sizes.",
    features: [
      "Due diligence & compliance",
      "Lease agreements",
      "Zoning & planning advice",
    ],
    color: "#f0734a",
    order: 2,
  },
  {
    _id: "c3",
    icon: "icofont-search-document",
    title: "Title Search & Verification",
    desc: "Thorough investigation of property titles to protect your investment from hidden disputes or claims.",
    features: [
      "Full title history report",
      "Caveat & lien detection",
      "Rapid turnaround",
    ],
    color: "#27ae60",
    order: 3,
  },
  {
    _id: "c4",
    icon: "icofont-law",
    title: "Mortgage & Settlement",
    desc: "End-to-end mortgage registration and settlement services ensuring a smooth and stress-free handover.",
    features: [
      "Mortgage registration",
      "Funds disbursement",
      "Key handover support",
    ],
    color: "#2196f3",
    order: 4,
  },
  {
    _id: "c5",
    icon: "icofont-files-stack",
    title: "Strata Title Services",
    desc: "Specialised conveyancing for strata, community title, and off-the-plan purchases with full transparency.",
    features: [
      "By-laws & levies review",
      "Off-the-plan contracts",
      "Body corporate advice",
    ],
    color: "#e91e8c",
    order: 5,
  },
  {
    _id: "c6",
    icon: "icofont-refresh",
    title: "Property Transfers",
    desc: "Fast and accurate transfer of property between family members, related parties, or through estates.",
    features: [
      "Stamp duty concessions",
      "Gift & family transfers",
      "Estate property transfers",
    ],
    color: "#ff9800",
    order: 6,
  },
];

export async function getConveyancingServices(): Promise<ConveyancingItem[]> {
  if (!(await safeConnect())) return FALLBACK_CONVEYANCING;
  try {
    const docs = await ConveyancingService.find()
      .sort({ order: 1 })
      .lean<ConveyancingItem[]>();
    return serialize(docs.length ? docs : FALLBACK_CONVEYANCING);
  } catch {
    return FALLBACK_CONVEYANCING;
  }
}

export async function getHomeContent(): Promise<HomeContentData> {
  if (!(await safeConnect())) return FALLBACK_HOME_CONTENT;
  try {
    const doc = await HomeContent.findOne().lean<HomeContentData>();
    return serialize({ ...FALLBACK_HOME_CONTENT, ...(doc ?? {}) });
  } catch {
    return FALLBACK_HOME_CONTENT;
  }
}

const FALLBACK_FOOTER: FooterContentData = {
  brandLogo: "/images/logo.png",
  brandLogoAlt: "Smart Loans",
  brandDescription:
    "Smart Loans helps you access fast, affordable financing with zero hassle. Trusted by 50,000+ customers across the country.",
  quickLinksHeading: "Quick Links",
  quickLinks: [
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
  loanLinksHeading: "Loan Types",
  loanLinks: [
    { label: "Home Loan", href: "/services", icon: "icofont-building" },
    { label: "Business Loan", href: "/services", icon: "icofont-businessman" },
    { label: "Car Loan", href: "/services", icon: "icofont-car" },
  ],
  newsletterHeading: "Newsletter",
  newsletterDescription:
    "Get the latest loan tips, rate updates, and exclusive offers straight to your inbox.",
  newsletterPlaceholder: "Your email address",
  newsletterButtonText: "Subscribe Now",
  newsletterButtonIcon: "icofont-paper-plane",
  newsletterSuccessText: "You're subscribed!",
  trustBadges: [
    { icon: "icofont-lock", text: "SSL Secure" },
    { icon: "icofont-shield", text: "No Spam" },
  ],
  copyrightText: "© {year} {siteName}. All rights reserved.",
  bottomLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Use", href: "#" },
    { label: "Sitemap", href: "#" },
  ],
  copyrightBarText: "Copyright {siteName}. All rights reserved",
};

export async function getFooterContent(): Promise<FooterContentData> {
  if (!(await safeConnect())) return FALLBACK_FOOTER;
  try {
    const doc = await FooterContent.findOne().lean<FooterContentData>();
    return serialize({ ...FALLBACK_FOOTER, ...(doc ?? {}) });
  } catch {
    return FALLBACK_FOOTER;
  }
}
