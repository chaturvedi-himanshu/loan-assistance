import Link from "next/link";

interface CrudLinkBannerProps {
  href: string;
  label: string;
  description?: string;
  icon?: string;
}

/**
 * Banner shown above a homepage-section editor that points the admin to the
 * matching CRUD page where the items in this section can be created/edited/deleted.
 */
export default function CrudLinkBanner({ href, label, description, icon = "icofont-list" }: CrudLinkBannerProps) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        background: "linear-gradient(135deg, rgba(44,187,223,0.10), rgba(56,207,232,0.06))",
        border: "1.5px solid rgba(44,187,223,0.25)",
        borderRadius: 12,
        padding: "14px 18px",
        textDecoration: "none",
        color: "inherit",
        transition: "all 0.2s",
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: 10,
          background: "rgba(44,187,223,0.18)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <i className={icon} style={{ color: "#2cbbdf", fontSize: 20 }}></i>
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, color: "#1a1a2e", fontSize: 14 }}>{label}</div>
        {description && (
          <div style={{ color: "#666", fontSize: 12, marginTop: 2 }}>{description}</div>
        )}
      </div>
      <i className="icofont-long-arrow-right" style={{ color: "#2cbbdf", fontSize: 20 }}></i>
    </Link>
  );
}
