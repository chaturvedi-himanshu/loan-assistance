import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminProcessIntroPage() {
  return (
    <AdminSingleForm
      title="Application Process Section"
      description="Edit the heading and subtitle for the application process steps."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/process-steps"
          icon="icofont-rocket-alt-2"
          label="Manage Process Steps"
          description="Add, edit, or delete the individual numbered steps shown in this section."
        />
      }
      fields={[
        { key: "processBadge", label: "Section Badge Text", placeholder: "Simple Steps" },
        { key: "processHeading", label: "Heading (use \\n for line break)", type: "textarea", placeholder: "Fast and very easy\napplication process here" },
        { key: "processSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "We are here to help you..." },
      ]}
    />
  );
}
