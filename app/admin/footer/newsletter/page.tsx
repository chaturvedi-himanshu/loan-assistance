import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterNewsletterAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Newsletter"
      description="Edit the newsletter signup heading, copy, button labels and trust badges."
      apiPath="footer"
      fields={[
        { key: "newsletterHeading", label: "Column Heading", placeholder: "Newsletter" },
        {
          key: "newsletterDescription",
          label: "Description",
          type: "textarea",
          placeholder: "Get the latest loan tips, rate updates...",
        },
        { key: "newsletterPlaceholder", label: "Email Input Placeholder", placeholder: "Your email address" },
        { key: "newsletterButtonText", label: "Subscribe Button Text", placeholder: "Subscribe Now" },
        { key: "newsletterButtonIcon", label: "Subscribe Button Icon", placeholder: "icofont-paper-plane" },
        { key: "newsletterSuccessText", label: "Success Message", placeholder: "You're subscribed!" },
        {
          key: "trustBadges",
          label: "Trust Badges (under the form)",
          type: "trust-badges",
          help: "Small pills shown below the subscribe button.",
        },
      ]}
    />
  );
}
