"use client";

import { useState, useEffect, useCallback } from "react";

type FieldType =
  | "text"
  | "textarea"
  | "url"
  | "number"
  | "tags"
  | "image"
  | "color"
  | "links"
  | "bottom-links"
  | "trust-badges"
  | "repeater";

interface Field {
  key: string;
  label: string;
  type?: FieldType;
  placeholder?: string;
  help?: string;
  /** Force full-width even for non-textarea fields. */
  fullWidth?: boolean;

  // ── Repeater-only options ────────────────────────────────────────────────
  /** Sub-field schema for each row when type === "repeater". */
  itemFields?: Field[];
  /** Default object inserted when adding a new repeater item. */
  defaultItem?: Record<string, unknown>;
  /** Title prefix for each repeater card. Defaults to "Item". */
  itemLabel?: string;
  /** Label of the "add" button at the bottom. Defaults to "+ Add card". */
  addLabel?: string;
}

/**
 * A logical group of fields rendered as its own card. Use `sections` to
 * split long forms (e.g., the About page) into multiple, focused cards so
 * everything related is visually grouped together.
 */
export interface FormSection {
  title: string;
  description?: string;
  fields: Field[];
}

type LinkRow = { label: string; href: string; icon?: string };
type BottomLinkRow = { label: string; href: string };
type BadgeRow = { icon: string; text: string };

interface AdminSingleFormProps {
  title: string;
  description?: string;
  apiPath: string;
  /**
   * Flat list of fields rendered in a single card. Use this for simple forms.
   * Ignored when `sections` is provided.
   */
  fields?: Field[];
  /**
   * Grouped fields rendered as multiple cards (each section = one card).
   * Use this for longer forms where data should be visually grouped.
   */
  sections?: FormSection[];
  /** Optional banner above the form (e.g., link to CRUD page for managing items). */
  banner?: React.ReactNode;
}

export default function AdminSingleForm({
  title,
  description,
  apiPath,
  fields,
  sections,
  banner,
}: AdminSingleFormProps) {
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" } | null>(null);

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
      if (json.data) setForm(json.data);
    } catch (e) {
      console.error(`[AdminSingleForm] Failed to load "${apiPath}":`, e);
    } finally {
      setLoading(false);
    }
  }, [apiPath]);

  useEffect(() => { load(); }, [load]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(`/api/admin/${apiPath}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error();
      showToast("Saved successfully!");
    } catch {
      showToast("Save failed", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (key: string, value: unknown) => {
    setForm((p) => ({ ...p, [key]: value }));
  };

  if (loading) return <div style={{ padding: 40, textAlign: "center", color: "#aaa" }}>Loading…</div>;

  /**
   * Render any single field. The caller controls where the value lives by
   * passing the current `value` and an `onChange`. This lets the same code
   * render top-level form fields and per-row repeater sub-fields.
   */
  const renderFieldValue = (
    f: Field,
    value: unknown,
    onChange: (next: unknown) => void,
  ): React.ReactNode => {
    if (f.type === "textarea") {
      return (
        <textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          placeholder={f.placeholder}
          style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
        />
      );
    }

    if (f.type === "number") {
      return (
        <input
          type="number"
          value={value === undefined || value === null ? "" : Number(value)}
          onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
          placeholder={f.placeholder}
          step="any"
          style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
        />
      );
    }

    if (f.type === "color") {
      return (
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <input
            type="color"
            value={String(value ?? "#2cbbdf")}
            onChange={(e) => onChange(e.target.value)}
            style={{ width: 46, height: 36, border: "none", borderRadius: 8, cursor: "pointer" }}
          />
          <input
            type="text"
            value={String(value ?? "")}
            onChange={(e) => onChange(e.target.value)}
            style={{ flex: 1, padding: "8px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none" }}
          />
        </div>
      );
    }

    if (f.type === "tags") {
      const tags = (Array.isArray(value) ? value : []) as string[];
      return (
        <div>
          <input
            type="text"
            placeholder={f.placeholder ?? "Type and press Enter"}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                const val = e.currentTarget.value.trim();
                if (val) {
                  onChange([...tags, val]);
                  e.currentTarget.value = "";
                }
              }
            }}
            style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
            {tags.map((tag: string, i: number) => (
              <span key={`${tag}-${i}`} style={{ background: "rgba(44,187,223,0.12)", color: "#2cbbdf", padding: "4px 10px", borderRadius: 20, fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                {tag}
                <button
                  type="button"
                  onClick={() => onChange(tags.filter((_, j) => j !== i))}
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#2cbbdf", padding: 0, fontSize: 16, lineHeight: 1 }}
                  aria-label={`Remove ${tag}`}
                >×</button>
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (f.type === "links" || f.type === "bottom-links") {
      const rows = (Array.isArray(value) ? value : []) as (LinkRow | BottomLinkRow)[];
      const withIcon = f.type === "links";
      const updateRow = (i: number, patch: Partial<LinkRow>) => {
        const next = rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
        onChange(next);
      };
      const addRow = () => {
        const blank: LinkRow | BottomLinkRow = withIcon
          ? { label: "", href: "", icon: "" }
          : { label: "", href: "" };
        onChange([...rows, blank]);
      };
      const removeRow = (i: number) => {
        onChange(rows.filter((_, idx) => idx !== i));
      };
      const moveRow = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= rows.length) return;
        const next = [...rows];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
      };
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rows.length === 0 && (
              <div style={{ fontSize: 13, color: "#aaa", padding: "10px 12px", background: "#f8fafc", borderRadius: 8, border: "1px dashed #d9e6ee" }}>
                No links yet. Click &quot;Add link&quot; to create one.
              </div>
            )}
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: withIcon ? "1fr 1fr 200px auto" : "1fr 1fr auto",
                  gap: 8,
                  alignItems: "center",
                  padding: 10,
                  border: "1px solid #e6eff5",
                  borderRadius: 10,
                  background: "#fff",
                }}
              >
                <input
                  type="text"
                  value={row.label ?? ""}
                  placeholder="Label"
                  onChange={(e) => updateRow(i, { label: e.target.value })}
                  style={{ padding: "8px 10px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 13, outline: "none" }}
                />
                <input
                  type="text"
                  value={row.href ?? ""}
                  placeholder="/path or https://..."
                  onChange={(e) => updateRow(i, { href: e.target.value })}
                  style={{ padding: "8px 10px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 13, outline: "none" }}
                />
                {withIcon && (
                  <input
                    type="text"
                    value={(row as LinkRow).icon ?? ""}
                    placeholder="icofont-..."
                    onChange={(e) => updateRow(i, { icon: e.target.value })}
                    style={{ padding: "8px 10px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 13, outline: "none" }}
                  />
                )}
                <div style={{ display: "flex", gap: 4 }}>
                  <button type="button" onClick={() => moveRow(i, -1)} title="Move up" aria-label="Move up"
                    style={{ width: 30, height: 30, border: "1px solid #e6eff5", background: "#fff", borderRadius: 6, cursor: "pointer", color: "#666" }}>↑</button>
                  <button type="button" onClick={() => moveRow(i, 1)} title="Move down" aria-label="Move down"
                    style={{ width: 30, height: 30, border: "1px solid #e6eff5", background: "#fff", borderRadius: 6, cursor: "pointer", color: "#666" }}>↓</button>
                  <button type="button" onClick={() => removeRow(i)} title="Delete" aria-label="Delete"
                    style={{ width: 30, height: 30, border: "1px solid #fadbd8", background: "rgba(229,57,53,0.08)", borderRadius: 6, cursor: "pointer", color: "#e53935", fontWeight: 700 }}>×</button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRow}
            style={{ marginTop: 10, padding: "8px 14px", border: "1.5px solid #2cbbdf", background: "rgba(44,187,223,0.08)", color: "#2cbbdf", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
          >
            + Add link
          </button>
        </div>
      );
    }

    if (f.type === "trust-badges") {
      const rows = (Array.isArray(value) ? value : []) as BadgeRow[];
      const updateRow = (i: number, patch: Partial<BadgeRow>) => {
        const next = rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
        onChange(next);
      };
      const addRow = () => onChange([...rows, { icon: "icofont-lock", text: "" }]);
      const removeRow = (i: number) => onChange(rows.filter((_, idx) => idx !== i));
      return (
        <div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: "grid",
                  gridTemplateColumns: "200px 1fr auto",
                  gap: 8,
                  alignItems: "center",
                  padding: 10,
                  border: "1px solid #e6eff5",
                  borderRadius: 10,
                  background: "#fff",
                }}
              >
                <input
                  type="text"
                  value={row.icon ?? ""}
                  placeholder="icofont-..."
                  onChange={(e) => updateRow(i, { icon: e.target.value })}
                  style={{ padding: "8px 10px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 13, outline: "none" }}
                />
                <input
                  type="text"
                  value={row.text ?? ""}
                  placeholder="Badge text"
                  onChange={(e) => updateRow(i, { text: e.target.value })}
                  style={{ padding: "8px 10px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 13, outline: "none" }}
                />
                <button type="button" onClick={() => removeRow(i)} aria-label="Delete"
                  style={{ width: 30, height: 30, border: "1px solid #fadbd8", background: "rgba(229,57,53,0.08)", borderRadius: 6, cursor: "pointer", color: "#e53935", fontWeight: 700 }}>×</button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addRow}
            style={{ marginTop: 10, padding: "8px 14px", border: "1.5px solid #2cbbdf", background: "rgba(44,187,223,0.08)", color: "#2cbbdf", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontSize: 13 }}
          >
            + Add badge
          </button>
        </div>
      );
    }

    if (f.type === "image") {
      const src = String(value ?? "");
      return (
        <div>
          <input
            type="text"
            value={src}
            onChange={(e) => onChange(e.target.value)}
            placeholder={f.placeholder ?? "/images/example.png or https://..."}
            style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
          />
          {src && (
            <div style={{ marginTop: 8 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt="preview"
                style={{ maxWidth: 180, maxHeight: 120, borderRadius: 8, border: "1px solid #eef" }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>
          )}
        </div>
      );
    }

    if (f.type === "repeater") {
      const rows = (Array.isArray(value) ? value : []) as Record<string, unknown>[];
      const itemFields = f.itemFields ?? [];
      const itemLabel = f.itemLabel ?? "Item";
      const addLabel = f.addLabel ?? `+ Add ${itemLabel.toLowerCase()}`;

      const updateRow = (i: number, patch: Record<string, unknown>) => {
        const next = rows.map((r, idx) => (idx === i ? { ...r, ...patch } : r));
        onChange(next);
      };
      const addRow = () => {
        const blank = { ...(f.defaultItem ?? {}) };
        onChange([...rows, blank]);
      };
      const removeRow = (i: number) => {
        if (!confirm(`Delete this ${itemLabel.toLowerCase()}?`)) return;
        onChange(rows.filter((_, idx) => idx !== i));
      };
      const moveRow = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= rows.length) return;
        const next = [...rows];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
      };

      return (
        <div>
          {rows.length === 0 && (
            <div style={{ fontSize: 13, color: "#aaa", padding: "16px 18px", background: "#f8fafc", borderRadius: 10, border: "1px dashed #d9e6ee", textAlign: "center" }}>
              No {itemLabel.toLowerCase()}s yet. Click &quot;{addLabel}&quot; below to create one.
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {rows.map((row, i) => (
              <div
                key={(row?._id as string) ?? `__row_${i}`}
                style={{
                  border: "1px solid #e6eff5",
                  borderRadius: 12,
                  background: "#fafdff",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px 14px",
                    background: "linear-gradient(135deg,#eaf7fb,#f2fbfe)",
                    borderBottom: "1px solid #e6eff5",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ width: 26, height: 26, borderRadius: "50%", background: "#2cbbdf", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
                      {i + 1}
                    </span>
                    <strong style={{ fontSize: 14, color: "#1a1a2e" }}>{itemLabel} {i + 1}</strong>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button type="button" onClick={() => moveRow(i, -1)} disabled={i === 0} title="Move up" aria-label="Move up"
                      style={{ width: 30, height: 30, border: "1px solid #d9e6ee", background: "#fff", borderRadius: 6, cursor: i === 0 ? "not-allowed" : "pointer", color: "#555", opacity: i === 0 ? 0.4 : 1 }}>↑</button>
                    <button type="button" onClick={() => moveRow(i, 1)} disabled={i === rows.length - 1} title="Move down" aria-label="Move down"
                      style={{ width: 30, height: 30, border: "1px solid #d9e6ee", background: "#fff", borderRadius: 6, cursor: i === rows.length - 1 ? "not-allowed" : "pointer", color: "#555", opacity: i === rows.length - 1 ? 0.4 : 1 }}>↓</button>
                    <button type="button" onClick={() => removeRow(i)} title="Delete" aria-label="Delete"
                      style={{ width: 30, height: 30, border: "1px solid #fadbd8", background: "rgba(229,57,53,0.08)", borderRadius: 6, cursor: "pointer", color: "#e53935", fontWeight: 700 }}>×</button>
                  </div>
                </div>

                <div style={{ padding: 16 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    {itemFields.map((sf) => {
                      const subValue = row?.[sf.key];
                      const subFull = isFullWidth(sf);
                      return (
                        <div key={sf.key} style={{ gridColumn: subFull ? "1 / -1" : "auto" }}>
                          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#666", marginBottom: 6 }}>{sf.label}</label>
                          {renderFieldValue(sf, subValue, (next) => updateRow(i, { [sf.key]: next }))}
                          {sf.help && <div style={{ marginTop: 4, fontSize: 12, color: "#999" }}>{sf.help}</div>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addRow}
            style={{ marginTop: 14, padding: "10px 18px", border: "1.5px solid #2cbbdf", background: "rgba(44,187,223,0.08)", color: "#2cbbdf", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 14 }}
          >
            {addLabel}
          </button>
        </div>
      );
    }

    return (
      <input
        type={f.type ?? "text"}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
        placeholder={f.placeholder}
        style={{ width: "100%", padding: "10px 12px", border: "1.5px solid #cceffa", borderRadius: 8, fontSize: 14, outline: "none", boxSizing: "border-box" }}
      />
    );
  };

  /** Shorthand: render a top-level field bound to the form root. */
  const renderField = (f: Field) =>
    renderFieldValue(f, form[f.key], (next) => handleFieldChange(f.key, next));

  const renderFieldCell = (f: Field) => {
    const fullWidth = isFullWidth(f);
    return (
      <div key={f.key} style={{ gridColumn: fullWidth ? "1 / -1" : "auto" }}>
        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#555", marginBottom: 6 }}>{f.label}</label>
        {renderField(f)}
        {f.help && <div style={{ marginTop: 4, fontSize: 12, color: "#999" }}>{f.help}</div>}
      </div>
    );
  };

  const renderCard = (sectionTitle: string | null, sectionDesc: string | undefined, sectionFields: Field[], key?: string | number) => (
    <div key={key ?? sectionTitle ?? "__main"} style={{ background: "#fff", borderRadius: 16, padding: 28, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
      {sectionTitle && (
        <div style={{ marginBottom: 18, paddingBottom: 14, borderBottom: "1px solid #eef4f8" }}>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: "#1a1a2e", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 6, height: 18, background: "linear-gradient(180deg,#2cbbdf,#38cfe8)", borderRadius: 4 }} />
            {sectionTitle}
          </h3>
          {sectionDesc && <p style={{ margin: "6px 0 0 14px", color: "#888", fontSize: 13 }}>{sectionDesc}</p>}
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
        {sectionFields.map(renderFieldCell)}
      </div>
    </div>
  );

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", top: 20, right: 20, background: toast.type === "success" ? "#27ae60" : "#e53935", color: "#fff", padding: "10px 20px", borderRadius: 10, zIndex: 9999, fontWeight: 600 }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 6px" }}>{title}</h2>
        {description && <p style={{ color: "#888", margin: 0 }}>{description}</p>}
      </div>

      {banner && <div style={{ marginBottom: 18 }}>{banner}</div>}

      <form onSubmit={handleSubmit}>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          {sections && sections.length > 0
            ? sections.map((s, idx) => renderCard(s.title, s.description, s.fields, idx))
            : renderCard(null, undefined, fields ?? [])}
        </div>

        <div style={{ marginTop: 24, display: "flex", gap: 10, position: "sticky", bottom: 16, justifyContent: "flex-end" }}>
          <button type="submit" disabled={saving} style={{ padding: "12px 28px", background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", border: "none", color: "#fff", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: 15, boxShadow: "0 6px 18px rgba(44,187,223,0.35)" }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

function isFullWidth(f: Field): boolean {
  return Boolean(
    f.fullWidth ||
      f.type === "textarea" ||
      f.type === "tags" ||
      f.type === "image" ||
      f.type === "links" ||
      f.type === "bottom-links" ||
      f.type === "trust-badges" ||
      f.type === "repeater",
  );
}
