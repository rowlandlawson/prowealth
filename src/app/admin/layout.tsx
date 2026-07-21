"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Package,
  MessageSquareQuote,
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { label: "Site Content", href: "/admin/content", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    await signOut({ redirectTo: "/admin/login" });
  };

  // Login page: no sidebar, no admin chrome
  if (isLoginPage) {
    return (
      <>
        <style>{`
          nav, footer { display: none !important; }
          body { padding-top: 0 !important; }
        `}</style>
        {children}
      </>
    );
  }

  // ─── MOBILE LAYOUT ───
  if (isMobile) {
    return (
      <>
        <style>{`
          nav, footer { display: none !important; }
          body { padding-top: 0 !important; }
        `}</style>

        {/* Mobile top bar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "56px",
            background: "rgba(14,13,12,0.95)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(212,175,55,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 16px",
            zIndex: 100,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Shield size={18} color="#D4AF37" />
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Prowealth <span style={{ color: "#D4AF37" }}>Admin</span>
            </span>
          </div>
          <button
            onClick={handleLogout}
            style={{
              background: "none",
              border: "none",
              color: "#666",
              cursor: "pointer",
              padding: "8px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              letterSpacing: "0.05em",
            }}
          >
            <LogOut size={16} />
          </button>
        </div>

        {/* Main content */}
        <main
          style={{
            minHeight: "100vh",
            background: "#0E0D0C",
            paddingTop: "56px",
            paddingBottom: "72px",
          }}
        >
          {children}
        </main>

        {/* Mobile bottom tab bar */}
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            height: "68px",
            background: "rgba(14,13,12,0.97)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            padding: "0 8px",
            paddingBottom: "env(safe-area-inset-bottom, 0px)",
            zIndex: 100,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "8px 12px",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  position: "relative",
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      top: "2px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      width: "20px",
                      height: "2px",
                      borderRadius: "1px",
                      background: "#D4AF37",
                    }}
                  />
                )}
                <Icon
                  size={20}
                  color={active ? "#D4AF37" : "#555"}
                  strokeWidth={active ? 2 : 1.5}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "10px",
                    fontWeight: active ? 600 : 400,
                    color: active ? "#D4AF37" : "#555",
                    letterSpacing: "0.03em",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </>
    );
  }

  // ─── DESKTOP LAYOUT ───
  const sidebarWidth = sidebarOpen ? 240 : 72;

  return (
    <>
      <style>{`
        nav, footer { display: none !important; }
        body { padding-top: 0 !important; }
      `}</style>

      {/* Sidebar */}
      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: `${sidebarWidth}px`,
          height: "100vh",
          background: "#0E0D0C",
          borderRight: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.25s ease",
          zIndex: 100,
          overflow: "hidden",
        }}
      >
        {/* Brand */}
        <div
          style={{
            padding: sidebarOpen ? "24px 20px" : "24px 0",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            justifyContent: sidebarOpen ? "flex-start" : "center",
            gap: "12px",
            minHeight: "76px",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.05))",
              border: "1px solid rgba(212,175,55,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Shield size={18} color="#D4AF37" />
          </div>
          {sidebarOpen && (
            <span
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "16px",
                fontWeight: 700,
                color: "#fff",
                whiteSpace: "nowrap",
              }}
            >
              Pro<span style={{ color: "#D4AF37" }}>wealth</span>
            </span>
          )}
        </div>

        {/* Nav links */}
        <div
          style={{
            flex: 1,
            padding: "16px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <button
                key={item.href}
                onClick={() => router.push(item.href)}
                title={!sidebarOpen ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: sidebarOpen ? "12px 14px" : "12px 0",
                  justifyContent: sidebarOpen ? "flex-start" : "center",
                  background: active
                    ? "rgba(212,175,55,0.1)"
                    : "transparent",
                  border: active
                    ? "1px solid rgba(212,175,55,0.15)"
                    : "1px solid transparent",
                  borderRadius: "10px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  width: "100%",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.background =
                      "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.background = "transparent";
                  }
                }}
              >
                {active && (
                  <div
                    style={{
                      position: "absolute",
                      left: "-12px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: "3px",
                      height: "20px",
                      borderRadius: "0 2px 2px 0",
                      background: "#D4AF37",
                    }}
                  />
                )}
                <Icon
                  size={20}
                  color={active ? "#D4AF37" : "#666"}
                  strokeWidth={active ? 2 : 1.5}
                />
                {sidebarOpen && (
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "14px",
                      fontWeight: active ? 500 : 400,
                      color: active ? "#D4AF37" : "#888",
                      whiteSpace: "nowrap",
                      letterSpacing: "0.01em",
                    }}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom: Logout + Collapse toggle */}
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "4px",
          }}
        >
          {/* Logout */}
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: sidebarOpen ? "12px 14px" : "12px 0",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              background: "transparent",
              border: "1px solid transparent",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(220,38,38,0.08)";
              e.currentTarget.style.borderColor = "rgba(220,38,38,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.borderColor = "transparent";
            }}
          >
            <LogOut size={20} color="#666" strokeWidth={1.5} />
            {sidebarOpen && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "14px",
                  fontWeight: 400,
                  color: "#888",
                  whiteSpace: "nowrap",
                }}
              >
                Logout
              </span>
            )}
          </button>

          {/* Collapse toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: sidebarOpen ? "10px 14px" : "10px 0",
              justifyContent: sidebarOpen ? "flex-start" : "center",
              background: "transparent",
              border: "1px solid transparent",
              borderRadius: "10px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              width: "100%",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            {sidebarOpen ? (
              <>
                <ChevronLeft size={18} color="#555" />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "12px",
                    color: "#555",
                    whiteSpace: "nowrap",
                  }}
                >
                  Collapse
                </span>
              </>
            ) : (
              <ChevronRight size={18} color="#555" />
            )}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main
        style={{
          marginLeft: `${sidebarWidth}px`,
          minHeight: "100vh",
          background: "#0E0D0C",
          transition: "margin-left 0.25s ease",
        }}
      >
        {children}
      </main>
    </>
  );
}
