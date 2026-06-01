import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterCopyrightBarAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Copyright Bar"
      description="Edit the small copyright bar shown directly below the footer."
      apiPath="footer"
      fields={[
        {
          key: "copyrightBarText",
          label: "Copyright Bar Text",
          placeholder: "Copyright {siteName}. All rights reserved",
          help: "Use {siteName} for the site name from Settings and {year} for the current year.",
          fullWidth: true,
        },
      ]}
    />
  );
}
