import AdminSingleForm from "@/components/admin/AdminSingleForm";
import CrudLinkBanner from "@/components/admin/CrudLinkBanner";

export default function AdminTestimonialsIntroPage() {
  return (
    <AdminSingleForm
      title="Testimonials Section"
      description="Edit the heading, side image and rating badge for the testimonials carousel."
      apiPath="home-content"
      banner={
        <CrudLinkBanner
          href="/admin/testimonials"
          icon="icofont-speech-comments"
          label="Manage Testimonial Quotes"
          description="Add, edit, or delete individual customer testimonials."
        />
      }
      fields={[
        { key: "testimonialsBadge", label: "Section Badge Text", placeholder: "Testimonials" },
        { key: "testimonialsHeading", label: "Heading (use \\n for line break)", type: "textarea", placeholder: "How to say our most\nhonorable customer" },
        { key: "testimonialsSubtitle", label: "Subtitle / Description", type: "textarea", placeholder: "We are here to help you..." },

        { key: "testimonialsImage", label: "Right-side Image", type: "image", placeholder: "/images/about/3.png" },
        { key: "testimonialsImageAlt", label: "Image Alt Text", placeholder: "Customer" },

        { key: "testimonialsRatingValue", label: "Rating Badge – Value", placeholder: "4.9" },
        { key: "testimonialsRatingLabel", label: "Rating Badge – Label", placeholder: "Customer Rating" },
      ]}
    />
  );
}
