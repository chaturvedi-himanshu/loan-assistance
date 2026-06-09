"use client";

import AdminCrud from "@/components/admin/AdminCrud";

function BlogCard({ item, onEdit, onDelete }: { item: Record<string, unknown>; onEdit: () => void; onDelete: () => void }) {
  return (
    <div style={{ background: "#fff", borderRadius: 14, padding: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.05)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", gap: 6, marginBottom: 6, flexWrap: "wrap" }}>
            <span style={{ background: item.published ? "rgba(39,174,96,0.12)" : "rgba(255,152,0,0.12)", color: item.published ? "#27ae60" : "#ff9800", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>
              {item.published ? "Published" : "Draft"}
            </span>
            <span style={{ background: "rgba(44,187,223,0.10)", color: "#2cbbdf", padding: "2px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>{item.category as string}</span>
          </div>
          <h4 style={{ margin: 0, fontSize: 14, lineHeight: 1.4 }}>{item.title as string}</h4>
          <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaa" }}>By {item.author as string} · {item.date as string}</p>
        </div>
      </div>
      <div style={{ display: "flex", gap: 6, marginTop: 12 }}>
        <button onClick={onEdit} title="Edit" style={{ border: "none", background: "rgba(44,187,223,0.10)", color: "#2cbbdf", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
        </button>
        <button onClick={onDelete} title="Delete" style={{ border: "none", background: "rgba(229,57,53,0.10)", color: "#e53935", width: 34, height: 34, borderRadius: 8, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
        </button>
      </div>
    </div>
  );
}

export default function AdminBlogPage() {
  return (
    <AdminCrud
      title="Blog Posts"
      apiPath="blog"
      fields={[
        { key: "title",     label: "Post Title",      placeholder: "How to get a personal loan easily" },
        { key: "slug",      label: "URL Slug",        placeholder: "how-to-get-personal-loan" },
        { key: "category",  label: "Category",        placeholder: "Personal Finance" },
        { key: "author",    label: "Author",          placeholder: "Admin" },
        { key: "date",      label: "Date",            placeholder: "2026-04-12" },
        { key: "image",     label: "Featured Image", type: "image", placeholder: "/images/blog/1.jpg" },
        { key: "excerpt",   label: "Excerpt / Summary",   type: "textarea", placeholder: "Short intro to the post..." },
        { key: "content",   label: "Full Content",         type: "jodit",    placeholder: "Write your blog post here…" },
        { key: "published", label: "Status",               type: "select",   options: [{ value: "false", label: "Draft" }, { value: "true", label: "Published" }] },
      ]}
      defaultValues={{ title: "", slug: "", category: "General", author: "Admin", date: new Date().toISOString().split("T")[0], image: "/images/blog/1.jpg", excerpt: "", content: "", published: "false" }}
      renderCard={(item, onEdit, onDelete) => (
        <BlogCard key={item._id as string} item={item} onEdit={onEdit} onDelete={onDelete} />
      )}
    />
  );
}
