"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Star, X, Save } from "lucide-react";
import { Testimonial } from "@/generated/prisma/client";
import { createTestimonial, updateTestimonial, deleteTestimonial } from "@/actions/testimonials";
import CustomDialog from "@/components/CustomDialog";

interface TestimonialsClientProps {
  initialTestimonials: Testimonial[];
}

export default function TestimonialsClient({ initialTestimonials }: TestimonialsClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    variant?: "info" | "success" | "danger";
    confirmLabel?: string;
    cancelLabel?: string;
    showCancel?: boolean;
    onConfirm?: () => Promise<void>;
  } | null>(null);
  
  // Form State
  const [authorName, setAuthorName] = useState("");
  const [location, setLocation] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  const resetForm = () => {
    setAuthorName("");
    setLocation("");
    setContent("");
    setRating(5);
    setError("");
    setEditingId(null);
  };

  const handleOpenModal = (testimonial?: Testimonial) => {
    if (testimonial) {
      setEditingId(testimonial.id);
      setAuthorName(testimonial.authorName);
      setLocation(testimonial.location);
      setContent(testimonial.content);
      setRating(testimonial.rating);
    } else {
      resetForm();
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    resetForm();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("authorName", authorName);
      formData.append("location", location);
      formData.append("content", content);
      formData.append("rating", rating.toString());

      if (editingId) {
        const updated = await updateTestimonial(editingId, formData);
        setTestimonials((prev) => prev.map((t) => (t.id === editingId ? updated : t)));
      } else {
        const created = await createTestimonial(formData);
        setTestimonials((prev) => [created, ...prev]);
      }
      
      handleCloseModal();
    } catch (err: any) {
      setError(err.message || "Failed to save testimonial");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (id: string, name: string) => {
    setDialog({
      title: "Delete testimonial?",
      message: `Are you sure you want to delete the testimonial from "${name}"? This action cannot be undone.`,
      variant: "danger",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      showCancel: true,
      onConfirm: async () => {
        try {
          await deleteTestimonial(id);
          setTestimonials((prev) => prev.filter((t) => t.id !== id));
          setDialog(null);
        } catch (err) {
          setDialog({
            title: "Delete failed",
            message: "Failed to delete testimonial. Please try again.",
            variant: "danger",
            confirmLabel: "Close",
          });
        }
      },
    });
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
      <CustomDialog
        open={Boolean(dialog)}
        title={dialog?.title || ""}
        message={dialog?.message || ""}
        variant={dialog?.variant}
        confirmLabel={dialog?.confirmLabel}
        cancelLabel={dialog?.cancelLabel}
        showCancel={dialog?.showCancel}
        onConfirm={dialog?.onConfirm}
        onClose={() => setDialog(null)}
      />

      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(24px, 4vw, 32px)",
              fontWeight: 700,
              color: "#FFFFFF",
              margin: "0 0 8px",
            }}
          >
            Testimonials
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 300,
              color: "#888",
              margin: 0,
            }}
          >
            Manage customer reviews and feedback
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #D4AF37, #B8972E)",
            color: "#0A0A0A",
            padding: "12px 20px",
            borderRadius: "10px",
            border: "none",
            cursor: "pointer",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          <Plus size={18} />
          Add Testimonial
        </button>
      </div>

      {/* Grid */}
      {testimonials.length === 0 ? (
        <div
          style={{
            padding: "60px 24px",
            textAlign: "center",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Star size={48} color="#444" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#FFF", margin: "0 0 8px" }}>
            No testimonials found
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#666", margin: 0 }}>
            Click &quot;Add Testimonial&quot; to create one.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                position: "relative",
              }}
            >
              <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    fill={star <= testimonial.rating ? "#D4AF37" : "transparent"}
                    color={star <= testimonial.rating ? "#D4AF37" : "#555"}
                  />
                ))}
              </div>
              
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "15px",
                  lineHeight: "1.6",
                  color: "#DDD",
                  margin: "0 0 24px",
                  flex: 1,
                  fontStyle: "italic",
                }}
              >
                &quot;{testimonial.content}&quot;
              </p>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "16px", fontWeight: 600, color: "#FFF", margin: "0 0 4px" }}>
                    {testimonial.authorName}
                  </h4>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "13px", color: "#888", margin: 0 }}>
                    {testimonial.location}
                  </p>
                </div>
                
                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => handleOpenModal(testimonial)}
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px",
                      color: "#FFF",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(testimonial.id, testimonial.authorName)}
                    style={{
                      background: "rgba(239,68,68,0.1)",
                      border: "none",
                      borderRadius: "8px",
                      padding: "8px",
                      color: "#EF4444",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      transition: "background 0.2s",
                    }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Overlay */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(10, 10, 10, 0.8)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          {/* Modal Content */}
          <div
            style={{
              background: "#0E0D0C",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              width: "100%",
              maxWidth: "500px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 24px 48px rgba(0,0,0,0.4)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "24px",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "20px",
                  fontWeight: 600,
                  color: "#FFF",
                  margin: 0,
                }}
              >
                {editingId ? "Edit Testimonial" : "Add Testimonial"}
              </h2>
              <button
                onClick={handleCloseModal}
                style={{
                  background: "none",
                  border: "none",
                  color: "#888",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "4px",
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={{ padding: "24px" }}>
              {error && (
                <div
                  style={{
                    padding: "12px",
                    background: "rgba(220, 38, 38, 0.1)",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                    borderRadius: "8px",
                    color: "#EF4444",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    marginBottom: "20px",
                  }}
                >
                  {error}
                </div>
              )}

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
                  Author Name
                </label>
                <input
                  type="text"
                  required
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
                  Location (e.g., Lagos, Nigeria)
                </label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
                  Rating
                </label>
                <div style={{ display: "flex", gap: "8px" }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      style={{
                        background: "none",
                        border: "none",
                        padding: "4px",
                        cursor: "pointer",
                      }}
                    >
                      <Star
                        size={24}
                        fill={star <= rating ? "#D4AF37" : "transparent"}
                        color={star <= rating ? "#D4AF37" : "#555"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: "32px" }}>
                <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "13px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
                  Review Content
                </label>
                <textarea
                  required
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  style={{
                    width: "100%", padding: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "8px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", resize: "vertical",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "12px" }}>
                <button
                  type="button"
                  onClick={handleCloseModal}
                  style={{
                    flex: 1, padding: "14px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "10px",
                    color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    flex: 2, padding: "14px", background: isSubmitting ? "rgba(212,175,55,0.5)" : "linear-gradient(135deg, #D4AF37, #B8972E)",
                    border: "none", borderRadius: "10px", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "14px",
                    fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px"
                  }}
                >
                  {isSubmitting ? "Saving..." : <><Save size={18} /> Save Testimonial</>}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
