import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminLoanProductsPage() {
  return (
    <AdminSingleForm
      title="Loan Products Section"
      description="Edit headings and tag labels for the loan products card grid."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/services"
          icon="icofont-bank-alt"
          label="Manage Loan Product Cards"
          description="Loan products are sourced from the Services collection — edit cards there."
        />
      }
      fields={[
        { key: "loanProductsBadge", label: "Section Badge Text", placeholder: "Loan Products" },
        { key: "loanProductsHeading", label: "Heading (use \\n for line break)", type: "textarea", placeholder: "Choose the right loan\nfor your needs" },
        { key: "loanProductsSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "From personal to business..." },

        {
          key: "loanProductsTags",
          label: "Card Tag Labels (assigned in order)",
          type: "tags",
          placeholder: "Type a tag and press Enter",
          help: "Each tag is assigned to a card in the same order as services (Most Popular, Best Rate…).",
        },

        { key: "loanProductsCtaText", label: "Card CTA Button Text", placeholder: "Apply Now" },
        { key: "loanProductsCtaUrl", label: "Card CTA Button URL", placeholder: "/application-form" },
      ]}
    />
  );
}
