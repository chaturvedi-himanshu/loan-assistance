"use client";

import { useEffect, useMemo, useState } from "react";

interface FieldConfig {
  _id: string;
  key: string;
  label: string;
  placeholder: string;
  type: string;
  /** Populated when `type === "select"`. */
  options?: string[];
  required: boolean;
  enabled: boolean;
  order: number;
}

interface FieldSection {
  id: string;
  title: string;
  description?: string;
  icon: string;
  keys: string[];
}

const PRIMARY = "#2cbbdf";
const ACCENT = "#f0734a";
const BORDER = "#e3e8f4";
const INPUT_BG = "#fafbff";
const FOCUS_RING = "0 0 0 4px rgba(44,187,223,0.15)";

const SECTIONS: FieldSection[] = [
  {
    id: "loan",
    title: "Loan details",
    description: "Tell us how to reach you and what you need.",
    icon: "icofont-money",
    keys: ["name", "email", "phone", "amount", "purpose"],
  },
  {
    id: "personal",
    title: "Personal information",
    description: "Helps us match you with the right lenders.",
    icon: "icofont-user-alt-3",
    keys: ["gender", "birth", "maritalStatus", "dependants"],
  },
  {
    id: "address",
    title: "Address",
    description: "Your current residential address.",
    icon: "icofont-location-pin",
    keys: ["city", "street", "houseName", "homeTown", "timeAtAddress", "timeAtAddress2"],
  },
  {
    id: "employment",
    title: "Employment & income",
    description: "Used only to assess eligibility.",
    icon: "icofont-briefcase",
    keys: [
      "employmentStatus",
      "employerName",
      "employmentIndustry",
      "employmentLength",
      "income",
    ],
  },
];

interface GroupedField {
  section: FieldSection;
  fields: FieldConfig[];
}

const OTHER_SECTION: FieldSection = {
  id: "other",
  title: "Additional details",
  icon: "icofont-list",
  keys: [],
};

function groupFields(fields: FieldConfig[]): GroupedField[] {
  const byKey = new Map(fields.map((f) => [f.key, f]));
  const used = new Set<string>();

  const groups: GroupedField[] = [];

  for (const section of SECTIONS) {
    const matched = section.keys
      .map((k) => byKey.get(k))
      .filter((f): f is FieldConfig => Boolean(f))
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (matched.length) {
      matched.forEach((f) => used.add(f.key));
      groups.push({ section, fields: matched });
    }
  }

  const leftovers = fields
    .filter((f) => !used.has(f.key))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  if (leftovers.length) {
    groups.push({ section: OTHER_SECTION, fields: leftovers });
  }

  return groups;
}

export default function ApplicationFormClient() {
  const [fields, setFields] = useState<FieldConfig[]>([]);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/form-fields")
      .then((r) => r.json())
      .then((r) => {
        setFields(r.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const grouped = useMemo(() => groupFields(fields), [fields]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setFormData((d) => ({ ...d, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const payload: Record<string, string | number> = {};
    fields.forEach((f) => {
      const raw = formData[f.key] ?? "";
      payload[f.key] =
        f.type === "number"
          ? Number(raw) || 0
          : typeof raw === "string"
            ? raw.trim()
            : raw;
    });
    if (payload.purpose) payload.loanType = payload.purpose;

    try {
      const response = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.success === false) {
        setError(result?.message ?? "Submission failed. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Submission failed. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div style={{ padding: "12px 0" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 18,
          }}
        >
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <div style={{ height: 12, width: 80, background: "#eef0fa", borderRadius: 6 }} />
              <div style={{ height: 46, background: "#f4f6fd", borderRadius: 12 }} />
            </div>
          ))}
        </div>
        <style>{`
          @keyframes apply-shimmer {
            0% { opacity: 0.6; }
            50% { opacity: 1; }
            100% { opacity: 0.6; }
          }
          div[style*="background: rgb(244, 246, 253)"],
          div[style*="background: rgb(238, 240, 250)"] {
            animation: apply-shimmer 1.4s ease-in-out infinite;
          }
        `}</style>
      </div>
    );
  }

  // ── Success ────────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "56px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 14,
        }}
      >
        <div
          style={{
            width: 84,
            height: 84,
            borderRadius: "50%",
            background: "linear-gradient(135deg,#27ae60,#2ecc71)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 12px 28px rgba(39,174,96,0.30)",
          }}
        >
          <i className="icofont-check-circled" style={{ fontSize: 40, color: "#fff" }} />
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e", margin: 0 }}>
          Application submitted!
        </h3>
        <p style={{ color: "#666", maxWidth: 460, margin: 0, lineHeight: 1.6 }}>
          Thank you! Our team will review your application and contact you within{" "}
          <strong style={{ color: "#1a1a2e" }}>24 working hours</strong>.
        </p>
        <button
          type="button"
          onClick={() => {
            setSubmitted(false);
            setFormData({});
          }}
          style={{
            marginTop: 8,
            background: "transparent",
            border: `1.5px solid ${PRIMARY}`,
            color: PRIMARY,
            padding: "10px 22px",
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = PRIMARY;
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = PRIMARY;
          }}
        >
          Submit another application
        </button>
      </div>
    );
  }

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!fields.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "40px 24px",
          color: "#8993a8",
          background: INPUT_BG,
          border: `1px dashed ${BORDER}`,
          borderRadius: 14,
        }}
      >
        No form fields configured yet. Please contact the administrator.
      </div>
    );
  }

  // ── Field renderer ─────────────────────────────────────────────────────────
  const renderField = (f: FieldConfig) => {
    const isFocused = focused === f.key;
    const baseStyle: React.CSSProperties = {
      width: "100%",
      boxSizing: "border-box",
      padding: "14px 16px",
      paddingLeft: f.type === "select" ? 16 : 16,
      fontSize: 15,
      color: "#1a1a2e",
      background: INPUT_BG,
      border: `1.5px solid ${isFocused ? PRIMARY : BORDER}`,
      borderRadius: 12,
      outline: "none",
      lineHeight: 1.5,
      transition: "border-color 0.2s, box-shadow 0.2s",
      boxShadow: isFocused ? FOCUS_RING : "none",
      fontFamily: "inherit",
    };

    return (
      <div key={f.key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label
          htmlFor={f.key}
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#37475a",
            letterSpacing: 0.2,
          }}
        >
          {f.label}
          {f.required && (
            <span style={{ color: "#e53935", marginLeft: 4, fontWeight: 700 }}>*</span>
          )}
        </label>

        {f.type === "select" ? (
          <div style={{ position: "relative" }}>
            <select
              id={f.key}
              name={f.key}
              value={formData[f.key] ?? ""}
              onChange={handleChange}
              required={f.required}
              style={{
                ...baseStyle,
                appearance: "none",
                paddingRight: 42,
                cursor: "pointer",
              }}
              onFocus={() => setFocused(f.key)}
              onBlur={() => setFocused(null)}
            >
              <option value="" disabled>
                {f.placeholder || "Select an option"}
              </option>
              {(f.options ?? []).map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <i
              className="icofont-rounded-down"
              aria-hidden="true"
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: isFocused ? PRIMARY : "#8993a8",
                fontSize: 14,
                pointerEvents: "none",
                transition: "color 0.2s",
              }}
            />
          </div>
        ) : (
          <input
            id={f.key}
            type={f.type}
            step={f.type === "number" ? "any" : undefined}
            name={f.key}
            placeholder={f.placeholder}
            value={formData[f.key] ?? ""}
            onChange={handleChange}
            onFocus={() => setFocused(f.key)}
            onBlur={() => setFocused(null)}
            required={f.required}
            style={baseStyle}
          />
        )}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <p
        style={{
          color: "#8993a8",
          fontSize: 13,
          margin: 0,
        }}
      >
        Fields marked with{" "}
        <span style={{ color: "#e53935", fontWeight: 700 }}>*</span> are required.
      </p>

      {grouped.map(({ section, fields: sectionFields }, idx) => (
        <fieldset
          key={section.id}
          style={{
            border: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <legend style={{ padding: 0, margin: 0, width: "100%" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                paddingBottom: 12,
                borderBottom: "1px dashed #e0e3ef",
              }}
            >
              <span
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  background: `linear-gradient(135deg, ${PRIMARY}, ${ACCENT})`,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  boxShadow: "0 8px 18px rgba(44,187,223,0.25)",
                }}
              >
                <i className={section.icon} style={{ fontSize: 16 }} />
              </span>
              <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: PRIMARY,
                    letterSpacing: 1.2,
                    textTransform: "uppercase",
                  }}
                >
                  Step {idx + 1} of {grouped.length}
                </span>
                <span style={{ fontSize: 17, fontWeight: 800, color: "#1a1a2e" }}>
                  {section.title}
                </span>
                {section.description && (
                  <span style={{ fontSize: 13, color: "#6b7390" }}>
                    {section.description}
                  </span>
                )}
              </span>
            </div>
          </legend>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 18,
            }}
          >
            {sectionFields.map(renderField)}
          </div>
        </fieldset>
      ))}

      {error && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "rgba(229,57,53,0.08)",
            border: "1px solid rgba(229,57,53,0.25)",
            color: "#c0392b",
            padding: "12px 16px",
            borderRadius: 12,
            fontSize: 14,
          }}
        >
          <i className="icofont-warning-alt" style={{ fontSize: 18 }} />
          <span>{error}</span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: 14,
          paddingTop: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            color: "#8993a8",
            fontSize: 12.5,
          }}
        >
          <i className="icofont-lock" style={{ color: PRIMARY, fontSize: 14 }} />
          <span>
            Your information is encrypted and used only to process your loan
            application. We never share your data with third parties.
          </span>
        </div>

        <button
          type="submit"
          disabled={submitting}
          style={{
            alignSelf: "stretch",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            padding: "16px 28px",
            background: submitting
              ? "#9aa3b8"
              : `linear-gradient(135deg, ${PRIMARY} 0%, #38cfe8 100%)`,
            color: "#fff",
            border: "none",
            borderRadius: 999,
            fontSize: 16,
            fontWeight: 700,
            letterSpacing: 0.3,
            cursor: submitting ? "not-allowed" : "pointer",
            boxShadow: submitting ? "none" : "0 12px 28px rgba(44,187,223,0.35)",
            transition: "transform 0.15s, box-shadow 0.2s",
          }}
          onMouseEnter={(e) => {
            if (submitting) return;
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 16px 32px rgba(44,187,223,0.40)";
          }}
          onMouseLeave={(e) => {
            if (submitting) return;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 12px 28px rgba(44,187,223,0.35)";
          }}
        >
          {submitting ? (
            <>
              <Spinner />
              Submitting enquiry…
            </>
          ) : (
            <>
              <i className="icofont-paper-plane" style={{ fontSize: 18 }} />
              Submit Enquiry
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "2px solid rgba(255,255,255,0.45)",
        borderTopColor: "#fff",
        display: "inline-block",
        animation: "applySpin 0.75s linear infinite",
      }}
    >
      <style>{`@keyframes applySpin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}
