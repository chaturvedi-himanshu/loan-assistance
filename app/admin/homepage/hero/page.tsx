import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminHomeHeroPage() {
  return (
    <AdminSingleForm
      title="Hero Section"
      description="Edit the main banner shown at the top of the homepage."
      apiPath="hero"
      fields={[
        { key: "eyebrow", label: "Eyebrow Badge Text", placeholder: "Trusted by 50,000+ customers" },
        { key: "title", label: "Main Heading", placeholder: "Fast, Flexible & Trusted Loan Solutions", fullWidth: true },
        { key: "subtitle", label: "Subtitle / Description", type: "textarea", placeholder: "Short intro text..." },

        { key: "ctaPrimary", label: "Primary CTA – Text", placeholder: "Apply Now" },
        { key: "ctaPrimaryUrl", label: "Primary CTA – URL", placeholder: "/application-form" },
        { key: "ctaSecondary", label: "Secondary CTA – Text", placeholder: "Learn More" },
        { key: "ctaSecondaryUrl", label: "Secondary CTA – URL", placeholder: "/services" },

        { key: "stat1Value", label: "Stat 1 – Value", placeholder: "50K+" },
        { key: "stat1Label", label: "Stat 1 – Label", placeholder: "Happy Customers" },
        { key: "stat2Value", label: "Stat 2 – Value", placeholder: "$500M+" },
        { key: "stat2Label", label: "Stat 2 – Label", placeholder: "Disbursed" },
        { key: "stat3Value", label: "Stat 3 – Value", placeholder: "24 Hrs" },
        { key: "stat3Label", label: "Stat 3 – Label", placeholder: "Approval Time" },

        { key: "image", label: "Hero Image", type: "image", placeholder: "/images/slider/2.png" },
        { key: "imageAlt", label: "Hero Image Alt Text", placeholder: "Loan" },

        { key: "badge1Title", label: "Floating Badge 1 – Title", placeholder: "Instant Approval" },
        { key: "badge1Subtitle", label: "Floating Badge 1 – Subtitle", placeholder: "Within 24 hours" },
        { key: "badge1Icon", label: "Floating Badge 1 – Icon Class", placeholder: "icofont-check-alt" },

        { key: "badge2Title", label: "Floating Badge 2 – Title", placeholder: "Low Interest" },
        { key: "badge2Subtitle", label: "Floating Badge 2 – Subtitle", placeholder: "From 8.5%" },
        { key: "badge2Icon", label: "Floating Badge 2 – Icon Class", placeholder: "icofont-rupee" },
      ]}
    />
  );
}
