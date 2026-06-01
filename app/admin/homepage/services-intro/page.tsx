import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminServicesIntroPage() {
  return (
    <AdminSingleForm
      title="Services Intro Section"
      description="Edit the right-hand intro panel of the homepage services section."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/services"
          icon="icofont-briefcase"
          label="Manage Service Cards"
          description="Add, edit, or delete the individual loan service cards shown on this section."
        />
      }
      fields={[
        { key: "servicesBadge", label: "Section Badge Text", placeholder: "Our Services" },
        { key: "servicesHeading", label: "Heading", placeholder: "We provide awesome services, it's here.", fullWidth: true },
        { key: "servicesSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "Short intro text..." },

        { key: "servicesCtaText", label: "CTA Button Text", placeholder: "View More" },
        { key: "servicesCtaUrl", label: "CTA Button URL", placeholder: "/services" },

        { key: "servicesFeature1Icon", label: "Feature 1 – Icon Class", placeholder: "icofont-check-circled" },
        { key: "servicesFeature1Text", label: "Feature 1 – Text", placeholder: "Fastest loan approval in 24 hrs" },

        { key: "servicesFeature2Icon", label: "Feature 2 – Icon Class", placeholder: "icofont-shield" },
        { key: "servicesFeature2Text", label: "Feature 2 – Text", placeholder: "100% secure & confidential process" },

        { key: "servicesFeature3Icon", label: "Feature 3 – Icon Class", placeholder: "icofont-ui-calculator" },
        { key: "servicesFeature3Text", label: "Feature 3 – Text", placeholder: "Flexible EMI plans to suit you" },

        { key: "servicesFeature4Icon", label: "Feature 4 – Icon Class", placeholder: "icofont-support" },
        { key: "servicesFeature4Text", label: "Feature 4 – Text", placeholder: "24/7 dedicated customer support" },
      ]}
    />
  );
}
