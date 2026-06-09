"use client";

import AdminCrud from "@/components/admin/AdminCrud";
import DynamicImage from "@/components/DynamicImage";

function TeamCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)", display: "flex", alignItems: "center", gap: 14 }}>
      <DynamicImage src={(item.image as string) || "/images/team/1.jpg"} alt={item.name as string} width={54} height={54} style={{ borderRadius: "50%", objectFit: "cover", flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <h4 style={{ margin: 0, fontSize: 15 }}>{item.name as string}</h4>
        <p style={{ margin: "3px 0 0", fontSize: 13, color: "#2cbbdf" }}>{item.role as string}</p>
        {item.description as string &&
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#999", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: 1.45 }}>
            {item.description as string}
          </p>
        }
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg>
        </button>
        <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>
        </button>
      </div>
    </div>
  );
}

export default function AdminTeamPage() {
  return (
    <AdminCrud
      title="Team Members"
      apiPath="team"
      fields={[
        { key: "name", label: "Full Name", placeholder: "James Taylor" },
        { key: "role", label: "Role / Title", placeholder: "Financial Advisor" },
        { key: "description", label: "Short Bio", placeholder: "A brief description of this team member..." },
        { key: "image", label: "Image", type: "image", placeholder: "/images/team/1.jpg" },
        { key: "order", label: "Sort Order", type: "number", placeholder: "1" },
      ]}
      defaultValues={{ name: "", role: "", description: "", image: "/images/team/1.jpg", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <TeamCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
