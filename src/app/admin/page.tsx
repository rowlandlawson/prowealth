import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { Package, MessageSquareQuote, FileText, TrendingUp } from "lucide-react";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [productCount, testimonialCount, contentCount] = await Promise.all([
    db.product.count(),
    db.testimonial.count(),
    db.siteContent.count(),
  ]);

  const stats = [
    {
      label: "Total Products",
      value: productCount,
      icon: "Package",
      color: "#D4AF37",
      bgColor: "rgba(212,175,55,0.08)",
      borderColor: "rgba(212,175,55,0.15)",
    },
    {
      label: "Testimonials",
      value: testimonialCount,
      icon: "MessageSquareQuote",
      color: "#22C55E",
      bgColor: "rgba(34,197,94,0.08)",
      borderColor: "rgba(34,197,94,0.15)",
    },
    {
      label: "Content Items",
      value: contentCount,
      icon: "FileText",
      color: "#3B82F6",
      bgColor: "rgba(59,130,246,0.08)",
      borderColor: "rgba(59,130,246,0.15)",
    },
  ];

  const iconMap: Record<string, React.ReactNode> = {
    Package: <Package size={22} color="#D4AF37" strokeWidth={1.5} />,
    MessageSquareQuote: <MessageSquareQuote size={22} color="#22C55E" strokeWidth={1.5} />,
    FileText: <FileText size={22} color="#3B82F6" strokeWidth={1.5} />,
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1200px" }}>
      {/* Welcome header */}
      <div style={{ marginBottom: "36px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <TrendingUp size={20} color="#D4AF37" strokeWidth={1.5} />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "12px",
              fontWeight: 500,
              color: "#D4AF37",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            Dashboard
          </span>
        </div>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0 0 6px",
          }}
        >
          Welcome back
        </h1>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 300,
            color: "#666",
            margin: 0,
          }}
        >
          Here&apos;s an overview of your store
        </p>
      </div>

      {/* Stat cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        {stats.map((stat) => (
          <div
            key={stat.label}
            style={{
              background: stat.bgColor,
              border: `1px solid ${stat.borderColor}`,
              borderRadius: "14px",
              padding: "24px",
              transition: "transform 0.2s ease, box-shadow 0.2s ease",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "rgba(255,255,255,0.04)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {iconMap[stat.icon]}
              </div>
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "36px",
                fontWeight: 600,
                color: "#FFFFFF",
                lineHeight: 1,
                marginBottom: "6px",
              }}
            >
              {stat.value}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                color: "#888",
                letterSpacing: "0.02em",
              }}
            >
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Quick actions hint */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px 24px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.04)",
          borderRadius: "12px",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "13px",
            fontWeight: 400,
            color: "#555",
            margin: 0,
            lineHeight: 1.6,
          }}
        >
          💡 Use the sidebar to manage your{" "}
          <span style={{ color: "#D4AF37" }}>products</span>,{" "}
          <span style={{ color: "#22C55E" }}>testimonials</span>, and{" "}
          <span style={{ color: "#3B82F6" }}>site content</span>.
        </p>
      </div>
    </div>
  );
}
