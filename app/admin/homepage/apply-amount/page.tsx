import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminApplyAmountPage() {
  return (
    <AdminSingleForm
      title="Apply Amount Form Section"
      description="Edit the heading, input placeholders and submit button for the centered amount form."
      apiPath="home-content"
      fields={[
        { key: "applyAmountHeading", label: "Heading (use \\n for line break)", type: "textarea", placeholder: "Get your amount\nfor fillup this form" },

        { key: "applyAmountField1Placeholder", label: "Amount Input – Placeholder", placeholder: "Amount" },
        { key: "applyAmountField2Placeholder", label: "Months Input – Placeholder", placeholder: "Long of months?" },
        { key: "applyAmountField3Placeholder", label: "Installment Input – Placeholder", placeholder: "Installment amount." },

        { key: "applyAmountButtonText", label: "Submit Button Text", placeholder: "Subscribe Now" },
      ]}
    />
  );
}
