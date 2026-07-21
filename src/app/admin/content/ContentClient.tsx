"use client";

import { useState } from "react";
import Image from "next/image";
import { SiteContent } from "@/generated/prisma/client";
import { Edit, Image as ImageIcon, Type, Upload, Save, X } from "lucide-react";
import { updateContent } from "@/actions/content";
import CustomDialog from "@/components/CustomDialog";

export const CONTENT_SCHEMA = [
  { section: "Hero", key: "hero_heading", type: "text", label: "Heading" },
  { section: "Hero", key: "hero_subtext", type: "text", label: "Subtext" },
  { section: "Hero", key: "hero_image", type: "image", label: "Background Image" },
  { section: "Hero", key: "hero_cta_text", type: "text", label: "CTA Text" },
  { section: "Hero", key: "hero_cta_link", type: "text", label: "CTA Link" },
  { section: "Collections", key: "collections_heading", type: "text", label: "Heading" },
  { section: "Collections", key: "collections_subheading", type: "text", label: "Subheading" },
  { section: "Brand Story", key: "brand_story_heading", type: "text", label: "Heading" },
  { section: "Brand Story", key: "brand_story_text", type: "text", label: "Text" },
  { section: "Brand Story", key: "brand_story_image", type: "image", label: "Side Image" },
  { section: "CTA Banner", key: "cta_heading", type: "text", label: "Heading" },
  { section: "CTA Banner", key: "cta_subtext", type: "text", label: "Subtext" },
  { section: "CTA Banner", key: "cta_button_text", type: "text", label: "Button Text" },
  { section: "CTA Banner", key: "cta_whatsapp_link", type: "text", label: "WhatsApp Link" },
];

interface ContentClientProps {
  initialContentMap: Record<string, string>;
}

export default function ContentClient({ initialContentMap }: ContentClientProps) {
  const [contentMap, setContentMap] = useState<Record<string, string>>(initialContentMap);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    variant?: "info" | "success" | "danger";
  } | null>(null);

  // Group schema by section
  const sections = Array.from(new Set(CONTENT_SCHEMA.map((c) => c.section)));

  const handleEdit = (item: typeof CONTENT_SCHEMA[0]) => {
    setEditingKey(item.key);
    if (item.type === "text") {
      setEditText(contentMap[item.key] || "");
    } else {
      setImageFile(null);
      setImagePreview(contentMap[item.key] || null);
    }
  };

  const handleCancel = () => {
    setEditingKey(null);
    setEditText("");
    setImageFile(null);
    setImagePreview(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (item: typeof CONTENT_SCHEMA[0]) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("section", item.section);
      
      if (item.type === "image") {
        if (!imageFile && !imagePreview) {
          setDialog({
            title: "Image required",
            message: "Please select an image before saving this content block.",
            variant: "info",
          });
          setIsSubmitting(false);
          return;
        }
        formData.append("isImage", "true");
        if (imageFile) {
          formData.append("value", imageFile);
        }
      } else {
        formData.append("isImage", "false");
        formData.append("value", editText);
      }

      await updateContent(item.key, formData);
      
      // Update local state (if it was an image we rely on revalidate to update eventually, but for text we can do it now)
      if (item.type === "text") {
        setContentMap((prev) => ({ ...prev, [item.key]: editText }));
      } else if (imagePreview && imageFile) {
        // Optimistic update for image preview
        setContentMap((prev) => ({ ...prev, [item.key]: imagePreview }));
      }
      
      handleCancel();
    } catch (err) {
      setDialog({
        title: "Update failed",
        message: "Failed to update content. Please try again.",
        variant: "danger",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1000px", margin: "0 auto" }}>
      <CustomDialog
        open={Boolean(dialog)}
        title={dialog?.title || ""}
        message={dialog?.message || ""}
        variant={dialog?.variant}
        onClose={() => setDialog(null)}
      />

      <div style={{ marginBottom: "36px" }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#FFFFFF", margin: "0 0 8px" }}>
          Site Content
        </h1>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 300, color: "#888", margin: 0 }}>
          Manage text and images across the homepage.
        </p>
      </div>

      {sections.map((section) => (
        <div key={section} style={{ marginBottom: "40px" }}>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 600, color: "#D4AF37", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "16px", paddingBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
            {section}
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {CONTENT_SCHEMA.filter((c) => c.section === section).map((item) => {
              const isEditing = editingKey === item.key;
              const currentValue = contentMap[item.key];

              return (
                <div key={item.key} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "24px" }}>
                    
                    {/* Label & Type Indicator */}
                    <div style={{ flex: "0 0 200px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                        {item.type === "image" ? <ImageIcon size={14} color="#888" /> : <Type size={14} color="#888" />}
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#FFF" }}>
                          {item.label}
                        </span>
                      </div>
                      <code style={{ fontFamily: "'Geist Mono', monospace", fontSize: "11px", color: "rgba(212,175,55,0.8)" }}>
                        {item.key}
                      </code>
                    </div>

                    {/* Value Display / Editor */}
                    <div style={{ flex: 1 }}>
                      {!isEditing ? (
                        item.type === "text" ? (
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: currentValue ? "#DDD" : "#555", margin: 0, fontStyle: currentValue ? "normal" : "italic" }}>
                            {currentValue || "Not set. Using default."}
                          </p>
                        ) : (
                          <div style={{ width: "120px", height: "80px", background: "rgba(255,255,255,0.05)", borderRadius: "8px", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.1)" }}>
                            {currentValue ? (
                              <Image src={currentValue} alt={item.label} fill style={{ objectFit: "cover" }} />
                            ) : (
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#555", fontSize: "12px" }}>No Image</div>
                            )}
                          </div>
                        )
                      ) : (
                        item.type === "text" ? (
                          <textarea
                            value={editText}
                            onChange={(e) => setEditText(e.target.value)}
                            rows={3}
                            style={{ width: "100%", padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(212,175,55,0.4)", borderRadius: "8px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", resize: "vertical" }}
                            placeholder="Enter text..."
                          />
                        ) : (
                          <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
                            <div style={{ width: "160px", height: "100px", background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(212,175,55,0.4)", borderRadius: "8px", position: "relative", overflow: "hidden" }}>
                              {imagePreview ? (
                                <Image src={imagePreview} alt="Preview" fill style={{ objectFit: "cover" }} />
                              ) : (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "#888", fontSize: "12px" }}>Select Image</div>
                              )}
                            </div>
                            <label style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", color: "#FFF", fontSize: "13px", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontFamily: "'Inter', sans-serif" }}>
                              <Upload size={14} /> Change
                              <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                            </label>
                          </div>
                        )
                      )}
                    </div>

                    {/* Actions */}
                    <div style={{ flex: "0 0 100px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                      {!isEditing ? (
                        <button
                          onClick={() => handleEdit(item)}
                          style={{ padding: "8px 12px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#FFF", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px", fontSize: "13px", fontFamily: "'Inter', sans-serif", transition: "background 0.2s" }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
                          onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        >
                          <Edit size={14} /> Edit
                        </button>
                      ) : (
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "100%" }}>
                          <button
                            onClick={() => handleSave(item)}
                            disabled={isSubmitting}
                            style={{ padding: "8px", background: "#D4AF37", border: "none", borderRadius: "8px", color: "#0A0A0A", cursor: isSubmitting ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px", fontWeight: 600, fontFamily: "'Inter', sans-serif", opacity: isSubmitting ? 0.7 : 1 }}
                          >
                            <Save size={14} /> {isSubmitting ? "..." : "Save"}
                          </button>
                          <button
                            onClick={handleCancel}
                            disabled={isSubmitting}
                            style={{ padding: "8px", background: "rgba(255,255,255,0.05)", border: "none", borderRadius: "8px", color: "#888", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}
                          >
                            <X size={14} /> Cancel
                          </button>
                        </div>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      ))}
    </div>
  );
}
