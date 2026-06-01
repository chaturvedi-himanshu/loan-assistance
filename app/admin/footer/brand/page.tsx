import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterBrandAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Brand Column"
      description="Edit the logo, alt text and description in the first column of the footer."
      apiPath="footer"
      fields={[
        {
          key: "brandLogo",
          label: "Logo Image",
          type: "image",
          placeholder: "/images/logo.png",
        },
        {
          key: "brandLogoAlt",
          label: "Logo Alt Text",
          placeholder: "Smart Loans",
        },
        {
          key: "brandDescription",
          label: "Brand Description",
          type: "textarea",
          placeholder:
            "Smart Loans helps you access fast, affordable financing...",
        },
      ]}
    />
  );
}
