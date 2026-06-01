import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterQuickLinksAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Quick Links"
      description="Edit the column heading and list of quick navigation links."
      apiPath="footer"
      fields={[
        { key: "quickLinksHeading", label: "Column Heading", placeholder: "Quick Links" },
        {
          key: "quickLinks",
          label: "Links",
          type: "links",
          help: "Use any internal path (e.g. /about) or external URL. Icon class is optional (e.g. icofont-home).",
        },
      ]}
    />
  );
}
