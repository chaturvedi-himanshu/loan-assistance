"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function TestimonialCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div>
          <h4 style={{ margin: 0, fontSize: 15 }}>{item.name as string}</h4>
          <span style={{ fontSize: 12, color: "#2cbbdf" }}>{item.role as string}</span>
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
          </button>
          <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
          </button>
        </div>
      </div>
      <div style={{ color: "#f59e0b", fontSize: 14, marginBottom: 6 }}>
        {"★".repeat(Number(item.stars) || 5)}
      </div>
      <p style={{ margin: 0, fontSize: 13, color: "#666", lineHeight: 1.5 }}>&quot;{(item.text as string)?.slice(0, 100)}…&quot;</p>
    </div>
  );
}

export default function AdminTestimonialsPage() {
  return (
    <AdminCrud
      title="Testimonials"
      apiPath="testimonials"
      fields={[
        { key: "name",  label: "Customer Name",  placeholder: "John Smith" },
        { key: "role",  label: "Role / Occupation", placeholder: "Small Business Owner" },
        { key: "text",  label: "Review Text",    type: "textarea", placeholder: "Their feedback..." },
        { key: "stars", label: "Star Rating (1-5)", type: "number", placeholder: "5" },
        { key: "image", label: "Photo", type: "image",     placeholder: "/images/testimonials/1.jpg" },
        { key: "order", label: "Sort Order",     type: "number", placeholder: "1" },
      ]}
      defaultValues={{ name: "", role: "", text: "", stars: 5, image: "/images/testimonials/1.jpg", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <TestimonialCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
