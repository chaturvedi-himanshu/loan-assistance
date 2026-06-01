import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function FooterLoanTypesAdminPage() {
  return (
    <AdminSingleForm
      title="Footer – Loan Types Links"
      description="Edit the column heading and list of loan-type links."
      apiPath="footer"
      fields={[
        { key: "loanLinksHeading", label: "Column Heading", placeholder: "Loan Types" },
        {
          key: "loanLinks",
          label: "Links",
          type: "links",
          help: "Use any internal path (e.g. /services) or external URL. Icon class is optional.",
        },
      ]}
    />
  );
}
