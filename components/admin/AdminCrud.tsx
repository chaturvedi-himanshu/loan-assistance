"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

const JoditField = dynamic(() => import("./JoditField"), { ssr: false });

interface Field {
  key: string;
  label: string;
  type?: "text" | "textarea" | "number" | "color" | "select" | "tags" | "jodit";
  options?: string[] | { value: string; label: string }[];
  multiline?: boolean;
  placeholder?: string;
}

interface AdminCrudProps {
  title: string;
  apiPath: string;
  fields: Field[];
  defaultValues: Record<string, unknown>;
  renderCard: (
    item: Record<string, unknown>,
    onEdit: () => void,
    onDelete: () => void,
    controls?: ReorderControls,
  ) => React.ReactNode;
  /**
   * Enables Move Up / Move Down ordering buttons on each card. The list is
   * sorted by the `order` field ASC and reordering persists by PATCHing the
   * `order` value of the two swapped items. Defaults to true.
   */
  enableOrdering?: boolean;
}

export interface ReorderControls {
  index: number;
  total: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isReordering: boolean;
}

export default function AdminCrud({
  title,
  apiPath,
  fields,
  defaultValues,
  renderCard,
  enableOrdering = true,
}: AdminCrudProps) {
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Record<string, unknown>>(defaultValues);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  const showToast = (msg: string, type: "success" | "error" = "success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/${apiPath}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const raw = (json.data ?? []) as Record<string, unknown>[];
      // Always sort by `order` ASC when ordering is enabled so the displayed
      // sequence matches what users see in the public site.
      const sorted = enableOrdering
        ? [...raw].sort((a, b) => (Number(a.order ?? 0)) - (Number(b.order ?? 0)))
        : raw;
      setItems(sorted);
    } catch (e) {
      console.error(`[AdminCrud] Failed to load "${apiPath}":`, e);
      showToast(`Failed to load data`, "error");
    } finally {
      setLoading(false);
    }
  }, [apiPath, enableOrdering]);

  useEffect(() => { load(); }, [load]);

  const openCreate = () => {
    setEditId(null);
    setForm(defaultValues);
    setShowForm(true);
  };

  const openEdit = (item: Record<string, unknown>) => {
    setEditId(item._id as string);
    setForm(item);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    try {
      const res = await fetch(`/api/admin/${apiPath}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      showToast("Deleted");
      load();
    } catch (e) {
      console.error(`[AdminCrud] Delete failed:`, e);
      showToast("Delete failed", "error");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editId ? `/api/admin/${apiPath}/${editId}` : `/api/admin/${apiPath}`;
      const method = editId ? "PUT" : "POST";
      const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error("Failed");
      showToast(editId ? "Updated!" : "Created!");
      setShowForm(false);
      load();
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /**
   * Move the item at `index` by `dir` (-1 = up, +1 = down). We renumber the
   * full list contiguously and PUT only the two items whose `order` changed,
   * so reordering stays cheap and consistent even if the dataset has gaps or
   * duplicate `order` values.
   */
  const handleMove = async (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= items.length) return;

    const reordered = [...items];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    // Renumber contiguously so the canonical `order` matches array position.
    const next: Record<string, unknown>[] = reordered.map((it, i) => ({
      ...it,
      order: i,
    }));
    // Identify the two rows whose order actually changed.
    const changed = next.filter(
      (_, i) => Number(items[i]?.order ?? -1) !== i,
    );

    // Optimistic update so the UI feels instant.
    setItems(next);
    setReorderingId((next[target]._id as string) ?? null);

    try {
      await Promise.all(
        changed.map((it) =>
          fetch(`/api/admin/${apiPath}/${it._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ order: it.order }),
          }),
        ),
      );
    } catch (e) {
      console.error("[AdminCrud] Reorder failed:", e);
      showToast("Reorder failed", "error");
      load();
    } finally {
      setReorderingId(null);
    }
  };

  return (
    <div>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "success" ? "#27ae60" : "#e53935", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 9999, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}>
          {toast.msg}
        </div>
      )}

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>{title}</h2>
        <button onClick={openCreate} style={{ display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", border: "none", color: "#fff", padding: "10px 20px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}>
          <i className="icofont-plus"></i> Add New
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 14, height: 140, opacity: 0.5 }} />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 14, padding: 48, textAlign: "center" }}>
          <i className="icofont-box" style={{ fontSize: 40, color: "#ddd", display: "block", marginBottom: 12 }}></i>
          <p style={{ color: "#aaa" }}>No items yet. Click &quot;Add New&quot; to get started.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {items.map((item, idx) => {
            const controls: ReorderControls | undefined = enableOrdering
              ? {
                  index: idx,
                  total: items.length,
                  onMoveUp: () => handleMove(idx, -1),
                  onMoveDown: () => handleMove(idx, 1),
                  isReordering: reorderingId === (item._id as string),
                }
              : undefined;
            const card = renderCard(
              item,
              () => openEdit(item),
              () => handleDelete(item._id as string),
              controls,
            );
            if (!enableOrdering || !controls) return card;
            // Wrap each card so we can overlay the reorder strip without
            // requiring every CRUD page to render its own arrows.
            return (
              <div key={(item._id as string) ?? idx} style={{ position: "relative" }}>
                {card}
                <div
                  aria-label="Reorder controls"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    display: "flex",
                    flexDirection: "column",
                    gap: 4,
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid #e6eff5",
                    borderRadius: 8,
                    padding: 3,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    zIndex: 2,
                    opacity: controls.isReordering ? 0.5 : 1,
                    pointerEvents: controls.isReordering ? "none" : "auto",
                  }}
                >
                  <button
                    type="button"
                    onClick={controls.onMoveUp}
                    disabled={controls.index === 0}
                    title="Move up"
                    aria-label="Move up"
                    style={{
                      width: 26,
                      height: 22,
                      border: "none",
                      background: "transparent",
                      cursor: controls.index === 0 ? "not-allowed" : "pointer",
                      color: controls.index === 0 ? "#ccc" : "#444",
                      fontSize: 13,
                      lineHeight: 1,
                      borderRadius: 4,
                    }}
                  >▲</button>
                  <button
                    type="button"
                    onClick={controls.onMoveDown}
                    disabled={controls.index === controls.total - 1}
                    title="Move down"
                    aria-label="Move down"
                    style={{
                      width: 26,
                      height: 22,
                      border: "none",
                      background: "transparent",
                      cursor: controls.index === controls.total - 1 ? "not-allowed" : "pointer",
                      color: controls.index === controls.total - 1 ? "#ccc" : "#444",
                      fontSize: 13,
                      lineHeight: 1,
                      borderRadius: 4,
                    }}
                  >▼</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 18, padding: 28, width: "100%", maxWidth: 540, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.20)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{editId ? "Edit" : "Add"} {title.replace(/s$/, "")}</h3>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#aaa" }}>×</button>
            </div>
            <form onSubmit={handleSubmit}>
              {fields.map((f) => (
                <div key={f.key} style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 }}>{f.label}</label>
                  {(f.type === "textarea" || f.multiline) ? (
                    <textarea
                      rows={3}
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => handleFieldChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                    />
                  ) : f.type === "color" ? (
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <input type="color" value={String(form[f.key] ?? "#2cbbdf")} onChange={(e) => handleFieldChange(f.key, e.target.value)} style={{ width: 46, height: 36, border: "none", borderRadius: 8, cursor: "pointer" }} />
                      <input type="text" value={String(form[f.key] ?? "")} onChange={(e) => handleFieldChange(f.key, e.target.value)} style={{ flex: 1, padding: "8px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none" }} />
                    </div>
                  ) : f.type === "tags" ? (
                    <div>
                      <input
                        type="text"
                        placeholder="Type and press Enter"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            const val = e.currentTarget.value.trim();
                            if (val) {
                              handleFieldChange(f.key, [...((form[f.key] as string[]) ?? []), val]);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                        style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                      />
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                        {((form[f.key] as string[]) ?? []).map((tag: string, i: number) => (
                          <span key={i} style={{ background: "rgba(44,187,223,0.12)", color: "#2cbbdf", padding: "4px 10px", borderRadius: 20, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                            {tag}
                            <button type="button" onClick={() => handleFieldChange(f.key, ((form[f.key] as string[]) ?? []).filter((_, j) => j !== i))} style={{ background: "none", border: "none", cursor: "pointer", color: "#2cbbdf", padding: 0, fontSize: 16, lineHeight: 1 }}>×</button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : f.type === "jodit" ? (
                    <JoditField
                      value={String(form[f.key] ?? "")}
                      onChange={(val) => handleFieldChange(f.key, val)}
                      placeholder={f.placeholder}
                    />
                  ) : (f.type === "select" || f.options) ? (
                    <select value={String(form[f.key] ?? "")} onChange={(e) => handleFieldChange(f.key, e.target.value)} style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none" }}>
                      {f.options?.map((o) => {
                        const val = typeof o === "string" ? o : o.value;
                        const lbl = typeof o === "string" ? o : o.label;
                        return <option key={val} value={val}>{lbl}</option>;
                      })}
                    </select>
                  ) : (
                    <input
                      type={f.type ?? "text"}
                      value={String(form[f.key] ?? "")}
                      onChange={(e) => handleFieldChange(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  )}
                </div>
              ))}
              <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 24 }}>
                <button type="button" onClick={() => setShowForm(false)} style={{ padding: "10px 22px", border: "1.5px solid #cceffa", borderRadius: 8, background: "#fff", cursor: "pointer", fontWeight: 600 }}>Cancel</button>
                <button type="submit" disabled={saving} style={{ padding: "10px 22px", background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", border: "none", color: "#fff", borderRadius: 8, fontWeight: 700, cursor: "pointer" }}>
                  {saving ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
