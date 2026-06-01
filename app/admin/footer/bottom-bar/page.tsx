import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterBottomBarAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Bottom Bar"
      description="Edit the copyright line and bottom-strip links."
      apiPath="footer"
      fields={[
        {
          key: "copyrightText",
          label: "Copyright Text",
          placeholder: "© {year} {siteName}. All rights reserved.",
          help: "Use {year} for the current year and {siteName} for the site name from Settings.",
          fullWidth: true,
        },
        {
          key: "bottomLinks",
          label: "Bottom Links",
          type: "bottom-links",
          help: "Small links shown on the right of the bottom strip.",
        },
      ]}
    />
  );
}
