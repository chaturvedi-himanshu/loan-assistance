"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function ServiceCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  const color = (item.color as string) || "#2cbbdf";
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ width: 42, height: 42, borderRadius: 11, background: `${color}22`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke={color} strokeWidth="2"/><line x1="12" y1="12" x2="12" y2="16" stroke={color} strokeWidth="2" strokeLinecap="round"/><line x1="10" y1="14" x2="14" y2="14" stroke={color} strokeWidth="2" strokeLinecap="round"/></svg>
          </div>
          <div>
            <h4 style={{ margin: 0, fontSize: 15, color: "#1a1a2e" }}>{item.title as string}</h4>
            <span style={{ fontSize: 13, color, fontWeight: 700 }}>{item.rate as string}</span>
          </div>
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
      <p style={{ fontSize: 13, color: "#888", margin: "6px 0 8px", lineHeight: 1.5 }}>{(item.desc as string)?.slice(0, 80)}…</p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span style={{ background: "#f0f0f8", borderRadius: 6, padding: "3px 8px", fontSize: 12 }}>{item.amount as string}</span>
        <span style={{ background: "#f0f0f8", borderRadius: 6, padding: "3px 8px", fontSize: 12 }}>{item.tenure as string}</span>
      </div>
    </div>
  );
}

export default function AdminServicesPage() {
  return (
    <AdminCrud
      title="Services"
      apiPath="services"
      fields={[
        { key: "title",    label: "Loan Title",     placeholder: "Personal Loan" },
        {
          key: "slug",
          label: "URL Slug (optional)",
          placeholder: "personal-loan",
          // The server auto-generates this from the title on save if left
          // blank, and forms the final URL: /service-details/<slug>.
        },
        { key: "rate",     label: "Interest Rate",  placeholder: "9.35%" },
        { key: "amount",   label: "Max Amount",     placeholder: "$200,000" },
        { key: "tenure",   label: "Tenure",         placeholder: "Up to 60 months" },
        { key: "desc",     label: "Description",    type: "textarea", placeholder: "Short description..." },
        { key: "features", label: "Features (Enter to add)", type: "tags" },
        { key: "icon",     label: "Icon Class",     placeholder: "flaticon-money" },
        { key: "color",    label: "Accent Color",   type: "color" },
        { key: "order",    label: "Sort Order",     type: "number", placeholder: "1" },
      ]}
      defaultValues={{ title: "", slug: "", rate: "", amount: "", tenure: "", desc: "", features: [], icon: "flaticon-money", color: "#2cbbdf", order: 0 }}
      renderCard={(item, onEdit, onDelete) => (
        <ServiceCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
