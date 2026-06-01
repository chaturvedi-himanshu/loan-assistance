import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminTeamIntroPage() {
  return (
    <AdminSingleForm
      title="Team Section"
      description="Edit the heading and subtitle for the team members grid."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/team"
          icon="icofont-people"
          label="Manage Team Members"
          description="Add, edit, or delete individual team member cards."
        />
      }
      fields={[
        { key: "teamBadge", label: "Section Badge Text", placeholder: "Our Experts" },
        { key: "teamHeading", label: "Heading", placeholder: "Expert team members", fullWidth: true },
        { key: "teamSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "We are here to help you..." },
      ]}
    />
  );
}
