import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminServicesPage() {
  return (
    <AdminSingleForm
      title="Services Page"
      description="Edit the banner, intro heading and call-to-action shown on the public Services page. The loan cards themselves are managed under Services (CRUD)."
      apiPath="services-page"
      sections={[
        {
          title: "Page Banner",
          description: "The hero banner shown at the top of the Services page.",
          fields: [
            { key: "bannerEyebrow", label: "Eyebrow", placeholder: "Smart Loans" },
            { key: "bannerTitle", label: "Banner Title", placeholder: "Services of Smart Loans" },
            {
              key: "bannerDesc",
              label: "Banner Description (HTML allowed)",
              type: "textarea",
              placeholder: "We are here to help you...",
              help: "Use <br> for a line break.",
            },
          ],
        },
        {
          title: "Section Intro",
          description: "The heading block shown above the loan service cards.",
          fields: [
            { key: "introEyebrow", label: "Eyebrow Badge", placeholder: "Our Loan Services" },
            { key: "introHeading", label: "Heading", placeholder: "Find the right loan product for your goals" },
            {
              key: "introDesc",
              label: "Description",
              type: "textarea",
              placeholder: "Each service is designed with competitive rates...",
            },
          ],
        },
        {
          title: "Call-to-Action Banner",
          description: "The highlighted banner shown below the service cards.",
          fields: [
            { key: "ctaHeading", label: "Heading", placeholder: "Need help choosing the right loan?" },
            {
              key: "ctaSubtitle",
              label: "Subtitle",
              type: "textarea",
              placeholder: "Talk to our advisor and get a tailored recommendation in minutes.",
            },
            { key: "ctaButtonLabel", label: "Button Label", placeholder: "Apply Now" },
            { key: "ctaButtonHref", label: "Button Link", placeholder: "/application-form" },
          ],
        },
      ]}
    />
  );
}
