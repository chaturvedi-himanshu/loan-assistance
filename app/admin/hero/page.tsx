import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminHeroPage() {
  return (
    <AdminSingleForm
      title="Hero Section"
      description="Edit the main banner shown at the top of the homepage."
      apiPath="hero"
      fields={[
        { key: "eyebrow", label: "Eyebrow Badge Text", placeholder: "Trusted by 50,000+ customers" },
        { key: "title", label: "Main Heading", placeholder: "Fast, Flexible & Trusted Loan Solutions" },
        { key: "subtitle", label: "Subtitle / Description", type: "textarea", placeholder: "Short intro text..." },
        { key: "ctaPrimary", label: "Primary CTA Button Text", placeholder: "Apply Now" },
        { key: "ctaSecondary", label: "Secondary CTA Button Text", placeholder: "Learn More" },
        { key: "stat1Value", label: "Stat 1 – Value", placeholder: "50K+" },
        { key: "stat1Label", label: "Stat 1 – Label", placeholder: "Happy Customers" },
        { key: "stat2Value", label: "Stat 2 – Value", placeholder: "$500M+" },
        { key: "stat2Label", label: "Stat 2 – Label", placeholder: "Disbursed" },
        { key: "stat3Value", label: "Stat 3 – Value", placeholder: "24 Hrs" },
        { key: "stat3Label", label: "Stat 3 – Label", placeholder: "Approval Time" },
        { key: "image", label: "Hero Image", type: "image", placeholder: "/images/banner/banner_img.png" },
      ]}
    />
  );
}
