import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminWhyChooseUsIntroPage() {
  return (
    <AdminSingleForm
      title="Why Choose Us Section"
      description="Edit headings and the looping partner/bank logo carousel for the 'Why Choose Us' section."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/why-choose-us"
          icon="icofont-star"
          label="Manage Feature Cards"
          description="Add, edit, or delete the six feature cards shown in this section."
        />
      }
      fields={[
        {
          key: "whyBadge",
          label: "Section Badge Text",
          placeholder: "Why Smart Loans",
        },
        {
          key: "whyHeading",
          label: "Heading (use \\n for line break)",
          type: "textarea",
          placeholder: "Why thousands of people\nchoose us every day",
        },
        {
          key: "whySubtitle",
          label: "Subtitle / Description",
          type: "textarea",
          placeholder: "We combine speed, trust...",
        },

        {
          key: "whyLogosHeading",
          label: "Logo Carousel Caption (optional)",
          placeholder: "Trusted by Australia's leading banks",
          help: "Small caption shown above the looping logo strip. Leave blank to hide it.",
        },
        {
          key: "whyLogos",
          label: "Partner / Bank Logos",
          type: "repeater",
          itemLabel: "Logo",
          addLabel: "+ Add logo",
          defaultItem: { image: "", alt: "" },
          help: "Logos scroll in a continuous loop (about 6 visible at a time). Reorder with the arrows.",
          itemFields: [
            { key: "image", label: "Logo Image", type: "image", placeholder: "/images/banks/logo.png" },
            { key: "alt", label: "Alt Text / Bank Name", placeholder: "Commonwealth Bank" },
          ],
        },
      ]}
    />
  );
}
