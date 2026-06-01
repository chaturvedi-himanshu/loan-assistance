import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminAboutPage() {
  return (
    <AdminSingleForm
      title="About Page"
      description="Edit every section of the About page. Each card below maps to one part of the page."
      apiPath="about"
      sections={[
        {
          title: "Page Banner",
          description: "The hero banner shown at the top of the About page.",
          fields: [
            { key: "bannerTitle", label: "Banner Title", placeholder: "About us" },
            {
              key: "bannerDesc",
              label: "Banner Description (HTML allowed)",
              type: "textarea",
              placeholder: "We are here to help you...",
            },
          ],
        },

        {
          title: "Section 1 — Why we started",
          description: "Image + heading + body shown in the first intro section.",
          fields: [
            { key: "sec1Heading", label: "Heading", placeholder: "Why we are starting our company?" },
            { key: "sec1Sub", label: "Subtext", placeholder: "We are here to help you..." },
            { key: "sec1Body1", label: "Paragraph 1", type: "textarea", placeholder: "Body text..." },
            { key: "sec1Body2", label: "Paragraph 2", type: "textarea", placeholder: "Body text..." },
            { key: "sec1Image", label: "Image", type: "image", placeholder: "/images/about/1.png" },
          ],
        },

        {
          title: "Section 2 — Leading company",
          description: "Image + heading + body shown in the second intro section.",
          fields: [
            { key: "sec2Heading", label: "Heading", placeholder: "We are leading Smart Loans financial company." },
            { key: "sec2Sub", label: "Subtext", placeholder: "We are here to help you..." },
            { key: "sec2Link", label: "Link Paragraph", type: "textarea", placeholder: "Link paragraph text..." },
            { key: "sec2Body", label: "Body Paragraph", type: "textarea", placeholder: "Body text..." },
            { key: "sec2Image", label: "Image", type: "image", placeholder: "/images/about/2.png" },
          ],
        },

        {
          title: "Company History — Heading",
          description: "Title and short description shown above the timeline cards.",
          fields: [
            {
              key: "historyTitle",
              label: "Section Title",
              type: "textarea",
              placeholder: "We have 25 years experienced...",
              help: "Use newlines for line breaks (they render as <br />).",
            },
            { key: "historyDesc", label: "Section Description", placeholder: "We are here to help you..." },
          ],
        },

        {
          title: "Company History — Timeline Cards",
          description: "Add as many cards as you like. Use the arrows on each card to reorder them.",
          fields: [
            {
              key: "historyItems",
              label: "",
              type: "repeater",
              itemLabel: "History Card",
              addLabel: "+ Add history card",
              defaultItem: {
                period: "",
                frontDesc1: "",
                frontDesc2: "",
                backDesc1: "",
                backDesc2: "",
              },
              itemFields: [
                { key: "period", label: "Period", placeholder: "2020 to 2023" },
                { key: "frontDesc1", label: "Front — Paragraph 1", type: "textarea", placeholder: "Short summary..." },
                { key: "frontDesc2", label: "Front — Paragraph 2", type: "textarea", placeholder: "Optional second paragraph..." },
                { key: "backDesc1", label: "Back — Paragraph 1", type: "textarea", placeholder: "Detailed copy shown on hover..." },
                { key: "backDesc2", label: "Back — Paragraph 2", type: "textarea", placeholder: "Optional second paragraph..." },
              ],
            },
          ],
        },
      ]}
    />
  );
}
