import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminHomeContactPage() {
  return (
    <AdminSingleForm
      title="Contact Banner Section"
      description="Edit the contact callout shown mid-page with the floating badges."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/settings"
          icon="icofont-settings-alt"
          label="Update Phone / Email / Address"
          description="The contact rows below pull live values from Site Settings."
        />
      }
      fields={[
        { key: "contactBadge", label: "Section Badge Text", placeholder: "Get In Touch" },
        { key: "contactHeading", label: "Heading", placeholder: "Our manager will contact you...", fullWidth: true },
        { key: "contactSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "We are here to help you..." },

        { key: "contactCtaText", label: "CTA Button Text", placeholder: "Call Us Now" },
        { key: "contactCtaUrl", label: "CTA Button URL", placeholder: "/contact" },

        { key: "contactImage", label: "Right-side Image", type: "image", placeholder: "/images/home/1.png" },
        { key: "contactImageAlt", label: "Image Alt Text", placeholder: "Contact" },

        { key: "contactPhoneLabel", label: "Phone Row Label", placeholder: "Call us anytime" },
        { key: "contactEmailLabel", label: "Email Row Label", placeholder: "Send us an email" },
        { key: "contactAddressLabel", label: "Address Row Label", placeholder: "Our headquarters" },

        { key: "contactWhatsapp", label: "WhatsApp Number (this section only)", placeholder: "+61 400 000 000", help: "Shown as a tap-to-chat row in this section. Independent of the global Settings number. Leave blank to hide." },
        { key: "contactWhatsappLabel", label: "WhatsApp Row Label", placeholder: "Chat on WhatsApp" },

        { key: "contactBadge1Title", label: "Floating Badge 1 – Title", placeholder: "100% Secure" },
        { key: "contactBadge1Subtitle", label: "Floating Badge 1 – Subtitle", placeholder: "Bank-level safety" },
        { key: "contactBadge1Icon", label: "Floating Badge 1 – Icon", placeholder: "icofont-shield-alt" },

        { key: "contactBadge2Title", label: "Floating Badge 2 – Title", placeholder: "Response Time" },
        { key: "contactBadge2Subtitle", label: "Floating Badge 2 – Subtitle", placeholder: "Under 2 Hours" },
        { key: "contactBadge2Icon", label: "Floating Badge 2 – Icon", placeholder: "icofont-clock-time" },
      ]}
    />
  );
}
