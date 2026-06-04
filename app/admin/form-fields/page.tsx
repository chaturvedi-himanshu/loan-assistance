"use client";

import { useEffect, useState } from "react";

interface FieldConfig {
  _id: string;
  key: string;
  label: string;
  placeholder: string;
  type: string;
  /** Options used when `type === "select"`. */
  options?: string[];
  required: boolean;
  enabled: boolean;
  order: number;
}

const REQUIRED_KEYS = new Set(["name", "email", "phone", "purpose"]);

export default function AdminFormFieldsPage() {
  const [fields, setFields]   = useState<FieldConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving]   = useState(false);
  const [toast, setToast]     = useState<{ msg: string; ok: boolean } | null>(null);

  useEffect(() => {
    fetch("/api/admin/form-fields")
      .then((r) => r.json())
      .then((r) => { setFields(r.data ?? []); setLoading(false); });
  }, []);

  const showToast = (msg: string, ok = true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  };

  const toggle = (id: string, prop: "enabled" | "required") => {
    setFields((prev) =>
      prev.map((f) => {
        if (f._id !== id) return f;
        if (prop === "required" && REQUIRED_KEYS.has(f.key)) return f;
        if (prop === "enabled" && REQUIRED_KEYS.has(f.key)) return f;
        return { ...f, [prop]: !f[prop] };
      }),
    );
  };

  const updateText = (id: string, prop: "label" | "placeholder", value: string) => {
    setFields((prev) => prev.map((f) => (f._id === id ? { ...f, [prop]: value } : f)));
  };

  const updateOptions = (id: string, value: string) => {
    const options = value
      .split(",")
      .map((o) => o.trim())
      .filter(Boolean);
    setFields((prev) => prev.map((f) => (f._id === id ? { ...f, options } : f)));
  };

  const moveRow = (idx: number, dir: -1 | 1) => {
    const next = idx + dir;
    if (next < 0 || next >= fields.length) return;
    const arr = [...fields];
    [arr[idx], arr[next]] = [arr[next], arr[idx]];
    setFields(arr.map((f, i) => ({ ...f, order: i + 1 })));
  };

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/admin/form-fields", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields.map((f, i) => ({ ...f, order: i + 1 }))),
    });
    setSaving(false);
    if (res.ok) showToast("Form fields saved successfully");
    else showToast("Failed to save. Please try again.", false);
  };

  const Row = ({ f, idx }: { f: FieldConfig; idx: number }) => {
    const locked = REQUIRED_KEYS.has(f.key);
    return (
      <tr style={{ borderTop: "1px solid #f0f0f8", background: idx % 2 === 0 ? "#fff" : "#fafafa", opacity: f.enabled ? 1 : 0.5 }}>
        {/* Order controls */}
        <td style={{ padding: "10px 10px", textAlign: "center", whiteSpace: "nowrap" }}>
          <button onClick={() => moveRow(idx, -1)} disabled={idx === 0} style={arrowBtn}>▲</button>
          <button onClick={() => moveRow(idx, 1)} disabled={idx === fields.length - 1} style={{ ...arrowBtn, marginLeft: 4 }}>▼</button>
        </td>

        {/* Field key (readonly) */}
        <td style={{ padding: "10px 14px" }}>
          <code style={{ fontSize: 12, background: "#f0f0f8", padding: "2px 7px", borderRadius: 5 }}>{f.key}</code>
        </td>

        {/* Label */}
        <td style={{ padding: "10px 14px" }}>
          <input
            value={f.label}
            onChange={(e) => updateText(f._id, "label", e.target.value)}
            style={inputStyle}
          />
        </td>

        {/* Placeholder */}
        <td style={{ padding: "10px 14px" }}>
          <input
            value={f.placeholder}
            onChange={(e) => updateText(f._id, "placeholder", e.target.value)}
            style={inputStyle}
          />
        </td>

        {/* Type */}
        <td style={{ padding: "10px 14px", fontSize: 12, color: "#888" }}>
          {f.type}
          {f.type === "select" && (
            <input
              value={(f.options ?? []).join(", ")}
              onChange={(e) => updateOptions(f._id, e.target.value)}
              placeholder="Comma-separated options"
              style={{ ...inputStyle, marginTop: 6 }}
            />
          )}
        </td>

        {/* Required toggle */}
        <td style={{ padding: "10px 14px", textAlign: "center" }}>
          <Toggle
            on={f.required}
            locked={locked}
            color="#ff9800"
            onClick={() => toggle(f._id, "required")}
          />
        </td>

        {/* Enabled toggle */}
        <td style={{ padding: "10px 14px", textAlign: "center" }}>
          <Toggle
            on={f.enabled}
            locked={locked}
            color="#27ae60"
            onClick={() => toggle(f._id, "enabled")}
          />
        </td>
      </tr>
    );
  };

  return (
    <div>
      {toast && (
        <div style={{
          position: "fixed", top: 20, right: 20, zIndex: 9999,
          background: toast.ok ? "#27ae60" : "#e53935",
          color: "#fff", padding: "12px 20px", borderRadius: 10, fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
        }}>
          {toast.msg}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, color: "#1a1a2e", margin: "0 0 4px" }}>Form Fields</h2>
          <p style={{ color: "#888", margin: 0 }}>
            Control which fields appear on the application form. Core fields (name, email, phone, purpose) are always required.
          </p>
        </div>
        <button
          onClick={save}
          disabled={saving}
          style={{
            background: "linear-gradient(135deg,#2cbbdf,#38cfe8)", color: "#fff",
            border: "none", padding: "10px 24px", borderRadius: 10,
            fontWeight: 700, cursor: saving ? "not-allowed" : "pointer",
            fontSize: 14, opacity: saving ? 0.7 : 1,
            boxShadow: "0 4px 12px rgba(44,187,223,0.30)",
          }}
        >
          {saving ? "Saving…" : "Save Changes"}
        </button>
      </div>

      {loading ? (
        <p style={{ color: "#aaa" }}>Loading…</p>
      ) : (
        <div style={{ background: "#fff", borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f8f8fb" }}>
                {["Order", "Key", "Label", "Placeholder", "Type", "Required", "Enabled"].map((h) => (
                  <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {fields.map((f, i) => <Row key={f._id} f={f} idx={i} />)}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: 16, fontSize: 13, color: "#aaa" }}>
        <i className="icofont-info-circle"></i>{" "}
        Changes are applied to the public application form immediately after saving.
      </div>
    </div>
  );
}

function Toggle({ on, locked, color, onClick }: { on: boolean; locked: boolean; color: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      title={locked ? "Cannot change — this field is always required" : undefined}
      style={{
        width: 42, height: 24, borderRadius: 12, border: "none",
        background: on ? color : "#ddd",
        cursor: locked ? "not-allowed" : "pointer",
        position: "relative", transition: "background 0.25s",
        opacity: locked ? 0.6 : 1,
      }}
    >
      <span style={{
        position: "absolute", top: 3,
        left: on ? "calc(100% - 21px)" : 3,
        width: 18, height: 18, borderRadius: "50%",
        background: "#fff", transition: "left 0.25s",
        boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

const arrowBtn: React.CSSProperties = {
  border: "1px solid #cceffa", background: "#f8f8fb",
  color: "#666", width: 26, height: 26, borderRadius: 6,
  cursor: "pointer", fontSize: 11, padding: 0,
};

const inputStyle: React.CSSProperties = {
  border: "1px solid #cceffa", borderRadius: 7,
  padding: "6px 10px", fontSize: 13, width: "100%",
  boxSizing: "border-box", outline: "none",
};
