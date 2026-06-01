"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        router.replace("/admin");
      } else {
        const data = await res.json();
        setError(data.error ?? "Login failed");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #13132b 0%, #1e1e40 60%, #2a1a3e 100%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        fontFamily: "'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* SVG background */}
      <svg
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
        viewBox="0 0 1440 900"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid slice"
      >
        <circle cx="-80" cy="200" r="320" fill="rgba(44,187,223,0.08)" />
        <circle cx="1520" cy="700" r="320" fill="rgba(240,115,74,0.07)" />
        <circle
          cx="720"
          cy="450"
          r="200"
          fill="none"
          stroke="rgba(44,187,223,0.07)"
          strokeWidth="50"
        />
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 14 }).map((_, c) => (
            <circle
              key={`${r}-${c}`}
              cx={60 + c * 100}
              cy={60 + r * 130}
              r="2"
              fill="rgba(44,187,223,0.10)"
            />
          )),
        )}
        <line
          x1="0"
          y1="900"
          x2="300"
          y2="400"
          stroke="rgba(44,187,223,0.05)"
          strokeWidth="1"
          strokeDasharray="8 16"
        />
        <line
          x1="1440"
          y1="0"
          x2="1140"
          y2="500"
          stroke="rgba(240,115,74,0.05)"
          strokeWidth="1"
          strokeDasharray="8 16"
        />
      </svg>

      {/* Login card */}
      <div
        style={{
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.10)",
          borderRadius: 24,
          padding: "44px 40px",
          width: "100%",
          maxWidth: 420,
          backdropFilter: "blur(20px)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.40)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo mark */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 16,
              background: "linear-gradient(135deg,#2cbbdf,#38cfe8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 14px",
            }}
          >
            <i
              className="icofont-bank"
              style={{ color: "#fff", fontSize: 28 }}
            ></i>
          </div>
          <h1
            style={{
              color: "#fff",
              fontSize: 24,
              fontWeight: 800,
              margin: "0 0 6px",
            }}
          >
            Smart Loans Admin
          </h1>
          <p
            style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, margin: 0 }}
          >
            Sign in to manage your website
          </p>
        </div>

        {/* Error banner */}
        {error && (
          <div
            style={{
              background: "rgba(229,57,53,0.15)",
              border: "1px solid rgba(229,57,53,0.30)",
              borderRadius: 10,
              padding: "10px 14px",
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <i
              className="icofont-warning-alt"
              style={{ color: "#e53935", fontSize: 16 }}
            ></i>
            <span style={{ color: "#ff6b6b", fontSize: 14 }}>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: 18 }}>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 7,
              }}
            >
              Username
            </label>
            <div style={{ position: "relative" }}>
              <i
                className="icofont-user-alt-5"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.30)",
                  fontSize: 16,
                }}
              ></i>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                autoComplete="username"
                style={{
                  width: "100%",
                  padding: "13px 14px 13px 42px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2cbbdf")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                }
              />
            </div>
          </div>

          {/* Password */}
          <div style={{ marginBottom: 26 }}>
            <label
              style={{
                display: "block",
                color: "rgba(255,255,255,0.65)",
                fontSize: 13,
                fontWeight: 600,
                marginBottom: 7,
              }}
            >
              Password
            </label>
            <div style={{ position: "relative" }}>
              <i
                className="icofont-lock"
                style={{
                  position: "absolute",
                  left: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "rgba(255,255,255,0.30)",
                  fontSize: 16,
                }}
              ></i>
              <input
                type={showPass ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "13px 46px 13px 42px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  borderRadius: 10,
                  color: "#fff",
                  fontSize: 15,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2cbbdf")}
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.12)")
                }
              />
              <button
                type="button"
                onClick={() => setShowPass((v) => !v)}
                style={{
                  position: "absolute",
                  right: 14,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "rgba(255,255,255,0.35)",
                  padding: 0,
                }}
              >
                <i
                  className={showPass ? "icofont-eye-blocked" : "icofont-eye"}
                  style={{ fontSize: 17 }}
                ></i>
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              background: loading
                ? "rgba(44,187,223,0.50)"
                : "linear-gradient(135deg,#2cbbdf,#38cfe8)",
              border: "none",
              borderRadius: 12,
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              boxShadow: loading ? "none" : "0 8px 24px rgba(44,187,223,0.40)",
              transition: "all 0.2s",
            }}
          >
            {loading ? (
              <>
                <i
                  className="icofont-spinner-alt-2"
                  style={{ fontSize: 18, animation: "spin 1s linear infinite" }}
                ></i>
                Signing in…
              </>
            ) : (
              <>
                <i className="icofont-login" style={{ fontSize: 18 }}></i>
                Sign In
              </>
            )}
          </button>
        </form>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.25)",
            fontSize: 12,
            marginTop: 24,
            marginBottom: 0,
          }}
        >
          Protected admin area · Smart Loans © {new Date().getFullYear()}
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </div>
  );
}
