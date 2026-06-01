import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminConveyancingIntroPage() {
  return (
    <AdminSingleForm
      title="Conveyancing Section"
      description="Edit the dark conveyancing section heading and CTAs shown on the home and services pages."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/conveyancing"
          icon="icofont-law-document"
          label="Manage Conveyancing Service Cards"
          description="Add, edit, or delete the individual conveyancing services shown in this section."
        />
      }
      fields={[
        { key: "conveyancingBadge", label: "Section Badge Text", placeholder: "Conveyancing Services" },
        { key: "conveyancingHeading", label: "Heading", placeholder: "Expert Property Transfer & Legal Services", fullWidth: true },
        { key: "conveyancingSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "From residential settlements..." },

        { key: "conveyancingCtaCompactText", label: "Homepage CTA Text", placeholder: "View All Conveyancing Services" },
        { key: "conveyancingCtaCompactUrl", label: "Homepage CTA URL", placeholder: "/services" },

        { key: "conveyancingCtaFullText", label: "Services Page CTA Text", placeholder: "Get a Free Consultation" },
        { key: "conveyancingCtaFullUrl", label: "Services Page CTA URL", placeholder: "/application-form" },
      ]}
    />
  );
}
