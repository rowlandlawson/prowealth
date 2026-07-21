"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hide the site nav, footer, and splash screen on this page */}
      <style>{`
        nav, footer, .splash-screen {
          display: none !important;
        }
        body {
          padding-top: 0 !important;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#0A0A0A",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >


        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Logo / Branding */}
          <div
            style={{
              textAlign: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                width: "56px",
                height: "56px",
                margin: "0 auto 20px",
                borderRadius: "16px",
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
                border: "1px solid rgba(212,175,55,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#D4AF37"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <h1
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "28px",
                fontWeight: 700,
                color: "#FFFFFF",
                margin: "0 0 8px",
                letterSpacing: "0.02em",
              }}
            >
              Prowealth <span style={{ color: "#D4AF37" }}>Admin</span>
            </h1>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "#666",
                margin: 0,
                letterSpacing: "0.02em",
              }}
            >
              Sign in to manage your store
            </p>
          </div>

          {/* Login Card */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "32px",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            }}
          >
            {/* Error message */}
            {error && (
              <div
                style={{
                  background: "rgba(220, 38, 38, 0.1)",
                  border: "1px solid rgba(220, 38, 38, 0.2)",
                  borderRadius: "10px",
                  padding: "12px 16px",
                  marginBottom: "24px",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    color: "#EF4444",
                  }}
                >
                  {error}
                </span>
              </div>
            )}

            {/* Email field */}
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="admin-email"
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="admin@prowealth.com"
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "10px",
                  color: "#FFFFFF",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  fontWeight: 400,
                  outline: "none",
                  transition: "border-color 0.2s ease",
                  boxSizing: "border-box",
                }}
                onFocus={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(212,175,55,0.4)")
                }
                onBlur={(e) =>
                  (e.currentTarget.style.borderColor =
                    "rgba(255,255,255,0.08)")
                }
              />
            </div>

            {/* Password field */}
            <div style={{ marginBottom: "28px" }}>
              <label
                htmlFor="admin-password"
                style={{
                  display: "block",
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: "#888",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "8px",
                }}
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{
                    width: "100%",
                    padding: "14px 44px 14px 16px",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px",
                    color: "#FFFFFF",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    outline: "none",
                    transition: "border-color 0.2s ease",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(212,175,55,0.4)")
                  }
                  onBlur={(e) =>
                    (e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)")
                  }
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    color: "#888",
                    cursor: "pointer",
                    padding: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                background: loading
                  ? "rgba(212,175,55,0.5)"
                  : "linear-gradient(135deg, #D4AF37, #B8972E)",
                border: "none",
                borderRadius: "10px",
                color: "#0A0A0A",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = "translateY(-1px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(212,175,55,0.3)";
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {loading ? (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  >
                    <path d="M21 12a9 9 0 11-6.219-8.56" />
                  </svg>
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer text */}
          <p
            style={{
              textAlign: "center",
              marginTop: "24px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 300,
              color: "#444",
              letterSpacing: "0.02em",
            }}
          >
            Prowealth Fashion House &bull; Admin Portal
          </p>
        </div>
      </div>

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
