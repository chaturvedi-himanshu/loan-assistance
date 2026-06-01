"use client";

import { useState } from "react";

type FormShape = {
  f_name: string;
  l_name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
};

type FieldKey = keyof FormShape;
type SubmitState = "idle" | "submitting" | "success" | "error";

const INITIAL: FormShape = {
  f_name: "",
  l_name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

const PRIMARY = "#2cbbdf";
const ACCENT = "#f0734a";
const BORDER = "#e3e8f4";
const FOCUS_RING = "0 0 0 4px rgba(44,187,223,0.15)";

interface FieldDef {
  key: FieldKey;
  label: string;
  placeholder: string;
  type?: string;
  icon: string;
  required: boolean;
  half?: boolean;
  textarea?: boolean;
  autoComplete?: string;
}

const FIELDS: FieldDef[] = [
  { key: "f_name", label: "First name", placeholder: "John",            icon: "icofont-user-alt-3", required: true,  half: true,  autoComplete: "given-name" },
  { key: "l_name", label: "Last name",  placeholder: "Doe",             icon: "icofont-user-alt-3", required: true,  half: true,  autoComplete: "family-name" },
  { key: "email",  label: "Email",      placeholder: "you@example.com", icon: "icofont-email",      required: true,  type: "email", autoComplete: "email" },
  { key: "phone",  label: "Phone",      placeholder: "+91 98765 43210", icon: "icofont-phone",      required: true,  half: true,  type: "tel", autoComplete: "tel" },
  { key: "address",label: "City",       placeholder: "City / Suburb",   icon: "icofont-location-pin", required: false, half: true, autoComplete: "address-level2" },
];

export default function ContactForm() {
  const [form, setForm] = useState<FormShape>(INITIAL);
  const [state, setState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [focused, setFocused] = useState<FieldKey | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name as FieldKey]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("submitting");
    setErrorMsg(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setState("success");
      setForm(INITIAL);
    } catch (err) {
      setState("error");
      setErrorMsg(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again in a moment.",
      );
    }
  };

  const resetState = () => {
    setState("idle");
    setErrorMsg(null);
  };

  if (state === "success") {
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
          Message sent!
        </h3>
        <p style={{ color: "#666", maxWidth: 420, margin: 0, lineHeight: 1.6 }}>
          Thanks for reaching out — our team will email you back within{" "}
          <strong style={{ color: "#1a1a2e" }}>24 working hours</strong>.
        </p>
        <button
          type="button"
          onClick={resetState}
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
          Send another message
        </button>
      </div>
    );
  }

  const renderField = (f: FieldDef) => {
    const isFocused = focused === f.key;
    const baseStyle: React.CSSProperties = {
      width: "100%",
      boxSizing: "border-box",
      padding: f.textarea ? "14px 16px" : "14px 16px 14px 44px",
      fontSize: 15,
      color: "#1a1a2e",
      background: "#fafbff",
      border: `1.5px solid ${isFocused ? PRIMARY : BORDER}`,
      borderRadius: 12,
      outline: "none",
      lineHeight: 1.5,
      transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
      boxShadow: isFocused ? FOCUS_RING : "none",
      fontFamily: "inherit",
      resize: f.textarea ? "vertical" : undefined,
      minHeight: f.textarea ? 140 : undefined,
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

        <div style={{ position: "relative" }}>
          {!f.textarea && (
            <i
              className={f.icon}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 14,
                top: "50%",
                transform: "translateY(-50%)",
                color: isFocused ? PRIMARY : "#9aa3b8",
                fontSize: 16,
                pointerEvents: "none",
                transition: "color 0.2s",
              }}
            />
          )}

          {f.textarea ? (
            <textarea
              id={f.key}
              name={f.key}
              placeholder={f.placeholder}
              required={f.required}
              value={form[f.key]}
              onChange={handleChange}
              onFocus={() => setFocused(f.key)}
              onBlur={() => setFocused(null)}
              rows={5}
              style={baseStyle}
            />
          ) : (
            <input
              id={f.key}
              name={f.key}
              type={f.type ?? "text"}
              placeholder={f.placeholder}
              required={f.required}
              autoComplete={f.autoComplete}
              value={form[f.key]}
              onChange={handleChange}
              onFocus={() => setFocused(f.key)}
              onBlur={() => setFocused(null)}
              style={baseStyle}
            />
          )}
        </div>
      </div>
    );
  };

  const isSubmitting = state === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: 18 }}>
      {/* Intro description box */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
          background: "linear-gradient(135deg, rgba(44,187,223,0.10) 0%, rgba(240,115,74,0.08) 100%)",
          border: "1px solid rgba(44,187,223,0.20)",
          borderRadius: 14,
          padding: "14px 18px",
          color: "#37475a",
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: 10,
            background: PRIMARY,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            boxShadow: "0 6px 16px rgba(44,187,223,0.30)",
          }}
        >
          <i className="icofont-info" style={{ fontSize: 16 }} />
        </span>
        <span>
          <strong style={{ color: "#1a1a2e" }}>Get in touch.</strong> Share a few
          details below and our advisors will email you back within{" "}
          <strong style={{ color: "#1a1a2e" }}>24 working hours</strong> with
          answers and the next steps for your loan.
        </span>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 18,
        }}
      >
        {FIELDS.map(renderField)}
      </div>

      {/* Message textarea — full width */}
      {renderField({
        key: "message",
        label: "How can we help?",
        placeholder: "Tell us about your loan needs, eligibility questions, or anything else…",
        icon: "icofont-chat",
        required: true,
        textarea: true,
      })}

      {state === "error" && errorMsg && (
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
          <span>{errorMsg}</span>
        </div>
      )}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 14,
          marginTop: 6,
        }}
      >
        <p style={{ color: "#8993a8", fontSize: 13, margin: 0 }}>
          Fields marked with{" "}
          <span style={{ color: "#e53935", fontWeight: 700 }}>*</span> are required.
        </p>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "14px 28px",
            minWidth: 180,
            justifyContent: "center",
            background: isSubmitting
              ? "#9aa3b8"
              : `linear-gradient(135deg, ${PRIMARY} 0%, #38cfe8 100%)`,
            color: "#fff",
            border: "none",
            borderRadius: 999,
            fontSize: 15,
            fontWeight: 700,
            letterSpacing: 0.3,
            cursor: isSubmitting ? "not-allowed" : "pointer",
            boxShadow: isSubmitting
              ? "none"
              : "0 10px 24px rgba(44,187,223,0.35)",
            transition: "transform 0.15s, box-shadow 0.2s, opacity 0.2s",
          }}
          onMouseEnter={(e) => {
            if (isSubmitting) return;
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 14px 30px rgba(44,187,223,0.40)";
          }}
          onMouseLeave={(e) => {
            if (isSubmitting) return;
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 24px rgba(44,187,223,0.35)";
          }}
        >
          {isSubmitting ? (
            <>
              <Spinner />
              Sending…
            </>
          ) : (
            <>
              <i className="icofont-paper-plane" style={{ fontSize: 16 }} />
              Send Email
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
        animation: "contactSpin 0.75s linear infinite",
      }}
    >
      <style>{`@keyframes contactSpin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}
