import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminContactPage() {
  return (
    <AdminSingleForm
      title="Contact Page"
      description="Edit every text block on the public Contact page. Phone, email, WhatsApp, address and social links come from Settings."
      apiPath="contact-page"
      sections={[
        {
          title: "Page Banner",
          description: "The hero banner shown at the top of the Contact page.",
          fields: [
            { key: "bannerTitle", label: "Banner Title", placeholder: "Contact Us" },
            {
              key: "bannerDesc",
              label: "Banner Description (HTML allowed)",
              type: "textarea",
              placeholder: "Talk to a Smart Loans advisor...",
              help: "Use <br> for a line break.",
            },
          ],
        },
        {
          title: "Info Card",
          description: "The dark card on the left with the intro copy.",
          fields: [
            { key: "infoEyebrow", label: "Eyebrow Badge", placeholder: "We're here for you" },
            { key: "infoHeading", label: "Heading", placeholder: "Let's find the right loan for you." },
            {
              key: "infoDescription",
              label: "Description",
              type: "textarea",
              placeholder: "Reach out by phone, email, or the form...",
            },
            { key: "followLabel", label: "Social Links Label", placeholder: "Follow Smart Loans" },
          ],
        },
        {
          title: "Contact Item Labels",
          description:
            "Small captions above each contact detail. The values themselves (phone, email, WhatsApp, address, hours) are managed in Settings.",
          fields: [
            { key: "phoneLabel", label: "Phone Label", placeholder: "Call us anytime" },
            { key: "emailLabel", label: "Email Label", placeholder: "Email our team" },
            { key: "whatsappLabel", label: "WhatsApp Label", placeholder: "Chat on WhatsApp" },
            { key: "addressLabel", label: "Address Label", placeholder: "Visit our office" },
            { key: "hoursLabel", label: "Working Hours Label", placeholder: "Working hours" },
          ],
        },
        {
          title: "Message Form",
          description: "The header above the contact form on the right.",
          fields: [
            { key: "formHeading", label: "Form Heading", placeholder: "Send us a message" },
            {
              key: "formSubtitle",
              label: "Form Subtitle",
              type: "textarea",
              placeholder: "Fill in the form and we'll get back to you...",
            },
          ],
        },
      ]}
    />
  );
}
