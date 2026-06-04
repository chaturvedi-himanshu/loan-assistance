import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminApplicationPage() {
  return (
    <AdminSingleForm
      title="Application Page"
      description="Edit every text block on the public Application Form page. The form fields themselves are managed under Form Fields. Phone, email and WhatsApp come from Settings."
      apiPath="application-page"
      sections={[
        {
          title: "Page Banner",
          description: "The hero banner shown at the top of the Application page.",
          fields: [
            { key: "bannerEyebrow", label: "Eyebrow", placeholder: "Application Form" },
            { key: "bannerTitle", label: "Banner Title", placeholder: "Apply for Your Loan" },
            {
              key: "bannerDesc",
              label: "Banner Description (HTML allowed)",
              type: "textarea",
              placeholder: "Tell us a little about you...",
              help: "Use <br> for a line break.",
            },
          ],
        },
        {
          title: "Side Card — Intro",
          description: "The dark trust card on the left.",
          fields: [
            { key: "sideBadge", label: "Badge", placeholder: "Quick Application" },
            { key: "sideHeading", label: "Heading", placeholder: "Get a loan that fits your life." },
            {
              key: "sideDescription",
              label: "Description",
              type: "textarea",
              placeholder: "Fill in the form on the right...",
            },
          ],
        },
        {
          title: "Side Card — Benefits",
          description: "The benefit list inside the dark card. Reorder with the arrows on each card.",
          fields: [
            {
              key: "benefits",
              label: "",
              type: "repeater",
              itemLabel: "Benefit",
              addLabel: "+ Add benefit",
              defaultItem: { icon: "icofont-check-circled", title: "", desc: "" },
              itemFields: [
                { key: "icon", label: "Icon", placeholder: "icofont-bolt", help: "Any icofont-* class." },
                { key: "title", label: "Title", placeholder: "Quick response to your query" },
                { key: "desc", label: "Description", type: "textarea", placeholder: "Prompt responses..." },
              ],
            },
          ],
        },
        {
          title: "Process Card — Steps",
          description: "The 'What happens next' steps card.",
          fields: [
            { key: "processHeading", label: "Card Heading", placeholder: "What happens next" },
            {
              key: "steps",
              label: "",
              type: "repeater",
              itemLabel: "Step",
              addLabel: "+ Add step",
              defaultItem: { num: "", title: "", desc: "" },
              itemFields: [
                { key: "num", label: "Number", placeholder: "01" },
                { key: "title", label: "Title", placeholder: "Fill out the form" },
                { key: "desc", label: "Description", type: "textarea", placeholder: "Share a few details..." },
              ],
            },
            { key: "helpLabel", label: "Help Section Label", placeholder: "Need help right now?" },
          ],
        },
        {
          title: "Form Card Header",
          description: "The header above the application form on the right.",
          fields: [
            { key: "formHeading", label: "Form Heading", placeholder: "Contact Us" },
            {
              key: "formSubtitle",
              label: "Form Subtitle",
              type: "textarea",
              placeholder: "Complete the form below...",
            },
          ],
        },
      ]}
    />
  );
}
