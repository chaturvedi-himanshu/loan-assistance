import AdminSingleForm from "@/components/admin/AdminSingleForm";

export default function AdminEmiCalculatorPage() {
  return (
    <AdminSingleForm
      title="EMI Calculator Section"
      description="Edit headings, slider ranges, defaults and labels for the EMI calculator."
      apiPath="home-content"
      fields={[
        { key: "emiHeading", label: "Heading", placeholder: "EMI Calculator" },
        { key: "emiSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "Plan your loan repayment easily..." },

        { key: "emiCurrency", label: "Currency Code (ISO 4217)", placeholder: "USD", help: "e.g. USD, INR, EUR — used for all amount formatting." },

        { key: "emiLoanAmountLabel", label: "Loan Amount – Label", placeholder: "Loan Amount" },
        { key: "emiLoanAmountMin", label: "Loan Amount – Min", type: "number", placeholder: "10000" },
        { key: "emiLoanAmountMax", label: "Loan Amount – Max", type: "number", placeholder: "5000000" },
        { key: "emiLoanAmountStep", label: "Loan Amount – Step", type: "number", placeholder: "10000" },
        { key: "emiLoanAmountDefault", label: "Loan Amount – Default", type: "number", placeholder: "500000" },

        { key: "emiInterestLabel", label: "Interest Rate – Label", placeholder: "Annual Interest Rate" },
        { key: "emiInterestMin", label: "Interest Rate – Min (%)", type: "number", placeholder: "1" },
        { key: "emiInterestMax", label: "Interest Rate – Max (%)", type: "number", placeholder: "30" },
        { key: "emiInterestStep", label: "Interest Rate – Step", type: "number", placeholder: "0.1" },
        { key: "emiInterestDefault", label: "Interest Rate – Default", type: "number", placeholder: "8.5" },

        { key: "emiTenureLabel", label: "Tenure – Label", placeholder: "Loan Tenure" },
        { key: "emiTenureMin", label: "Tenure – Min (months)", type: "number", placeholder: "6" },
        { key: "emiTenureMax", label: "Tenure – Max (months)", type: "number", placeholder: "360" },
        { key: "emiTenureStep", label: "Tenure – Step", type: "number", placeholder: "6" },
        { key: "emiTenureDefault", label: "Tenure – Default", type: "number", placeholder: "60" },

        { key: "emiMonthlyEmiLabel", label: "Result – Monthly EMI Label", placeholder: "Monthly EMI" },
        { key: "emiPrincipalLabel", label: "Result – Principal Label", placeholder: "Principal Amount" },
        { key: "emiInterestTotalLabel", label: "Result – Interest Label", placeholder: "Total Interest" },
        { key: "emiTotalPaymentLabel", label: "Result – Total Payment Label", placeholder: "Total Payment" },
      ]}
    />
  );
}
