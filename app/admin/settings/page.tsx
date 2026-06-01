import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminSettingsPage() {
  return (
    <AdminSingleForm
      title="Site Settings"
      description="Manage global contact info, social media links, and site identity."
      apiPath="settings"
      fields={[
        { key: "siteName", label: "Site Name", placeholder: "Smart Loans" },
        {
          key: "tagline",
          label: "Tagline",
          placeholder: "Banking & Business Loan",
        },
        {
          key: "phone1",
          label: "Primary Phone",
          placeholder: "+1 (800) 694-8956",
        },
        {
          key: "phone2",
          label: "Secondary Phone",
          placeholder: "88 487 983 576",
        },
        {
          key: "email",
          label: "Email Address",
          placeholder: "hello@Smart Loans.com",
        },
        {
          key: "address",
          label: "Office Address",
          placeholder: "42 Finance Tower...",
        },
        {
          key: "workingHours",
          label: "Working Hours",
          placeholder: "Mon – Sat: 9 AM – 6 PM",
        },
        {
          key: "facebookUrl",
          label: "Facebook URL",
          type: "url",
          placeholder: "https://facebook.com/...",
        },
        {
          key: "twitterUrl",
          label: "Twitter URL",
          type: "url",
          placeholder: "https://twitter.com/...",
        },
        {
          key: "linkedinUrl",
          label: "LinkedIn URL",
          type: "url",
          placeholder: "https://linkedin.com/...",
        },
        {
          key: "instagramUrl",
          label: "Instagram URL",
          type: "url",
          placeholder: "https://instagram.com/...",
        },
        {
          key: "youtubeUrl",
          label: "YouTube URL",
          type: "url",
          placeholder: "https://youtube.com/...",
        },
      ]}
    />
  );
}
