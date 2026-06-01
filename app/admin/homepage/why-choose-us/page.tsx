import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminWhyChooseUsIntroPage() {
  return (
    <AdminSingleForm
      title="Why Choose Us Section"
      description="Edit headings and bottom highlights for the 'Why Choose Us' section."
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
          key: "whyHighlight1",
          label: "Bottom Strip Highlight 1",
          placeholder: "No prepayment penalty",
        },
        {
          key: "whyHighlight2",
          label: "Bottom Strip Highlight 2",
          placeholder: "Minimal documentation",
        },
        {
          key: "whyHighlight3",
          label: "Bottom Strip Highlight 3",
          placeholder: "Instant e-approval letter",
        },
        {
          key: "whyHighlight4",
          label: "Bottom Strip Highlight 4",
          placeholder: "Doorstep document pickup",
        },
        {
          key: "whyHighlightIcon",
          label: "Highlight Icon Class",
          placeholder: "icofont-check-alt",
        },
      ]}
    />
  );
}
