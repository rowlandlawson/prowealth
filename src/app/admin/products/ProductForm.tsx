"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Save, Upload, X, Plus } from "lucide-react";
import { Product } from "@/generated/prisma/client";
import { createProduct, updateProduct } from "@/actions/products";

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price?.toString() || "");
  const [category, setCategory] = useState(initialData?.category || "Perfumes");
  const [details, setDetails] = useState<string[]>(initialData?.details || []);
  
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(initialData?.image || null);

  const categories = ["Perfumes", "Accessories", "Dresses", "Bags"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddDetail = () => {
    setDetails([...details, ""]);
  };

  const handleDetailChange = (index: number, value: string) => {
    const newDetails = [...details];
    newDetails[index] = value;
    setDetails(newDetails);
  };

  const handleRemoveDetail = (index: number) => {
    const newDetails = [...details];
    newDetails.splice(index, 1);
    setDetails(newDetails);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    if (!imagePreview && !imageFile) {
      setError("Please add an image for the product");
      setIsSubmitting(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      
      const filledDetails = details.filter((d) => d.trim() !== "");
      formData.append("details", JSON.stringify(filledDetails));

      if (imageFile) {
        formData.append("image", imageFile);
      }

      if (initialData) {
        await updateProduct(initialData.id, formData);
      } else {
        await createProduct(formData);
      }

      router.push("/admin/products");
    } catch (err: any) {
      setError(err.message || "Failed to save product");
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "24px" }}>
        <Link
          href="/admin/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            color: "#888",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            marginBottom: "16px",
            transition: "color 0.2s",
          }}
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(24px, 4vw, 32px)",
            fontWeight: 700,
            color: "#FFFFFF",
            margin: "0",
          }}
        >
          {initialData ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "16px",
          padding: "32px",
        }}
      >
        {error && (
          <div
            style={{
              padding: "16px",
              background: "rgba(220, 38, 38, 0.1)",
              border: "1px solid rgba(220, 38, 38, 0.2)",
              borderRadius: "10px",
              color: "#EF4444",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              marginBottom: "24px",
            }}
          >
            {error}
          </div>
        )}

        {/* Image Upload */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "12px" }}
          >
            Product Image
          </label>
          <div
            style={{
              width: "100%",
              height: "200px",
              background: "rgba(255,255,255,0.02)",
              border: "1px dashed rgba(255,255,255,0.2)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {imagePreview ? (
              <>
                <Image src={imagePreview} alt="Preview" fill style={{ objectFit: "contain" }} />
                <label
                  style={{
                    position: "absolute",
                    bottom: "16px",
                    right: "16px",
                    background: "rgba(0,0,0,0.8)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "8px 12px",
                    color: "#FFF",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "13px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <Upload size={14} />
                  Change Image
                  <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
                </label>
              </>
            ) : (
              <label
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                  color: "#888",
                  cursor: "pointer",
                  width: "100%",
                  height: "100%",
                  justifyContent: "center",
                }}
              >
                <div style={{ padding: "12px", background: "rgba(255,255,255,0.05)", borderRadius: "50%" }}>
                  <Upload size={24} />
                </div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Click to upload image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} required={!initialData} />
              </label>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
          <div>
            <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
              Product Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
              }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#0E0D0C" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
            Price (₦)
          </label>
          <input
            type="number"
            min="0"
            step="0.01"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
            Description
          </label>
          <textarea
            required
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none", resize: "vertical",
            }}
          />
        </div>

        {/* Dynamic Details List */}
        <div style={{ marginBottom: "32px" }}>
          <label style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, color: "#DDD", marginBottom: "8px" }}>
            Product Details (Bullet Points)
          </label>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {details.map((detail, index) => (
              <div key={index} style={{ display: "flex", gap: "12px" }}>
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  placeholder="e.g. 100% Cotton"
                  style={{
                    flex: 1, padding: "12px 16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "10px", color: "#FFF", fontFamily: "'Inter', sans-serif", fontSize: "14px", outline: "none",
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveDetail(index)}
                  style={{
                    width: "44px", background: "rgba(239,68,68,0.1)", border: "none", borderRadius: "10px",
                    color: "#EF4444", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
                  }}
                >
                  <X size={18} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddDetail}
              style={{
                padding: "12px", background: "rgba(255,255,255,0.05)", border: "1px dashed rgba(255,255,255,0.2)",
                borderRadius: "10px", color: "#DDD", fontFamily: "'Inter', sans-serif", fontSize: "14px", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
              }}
            >
              <Plus size={16} /> Add Detail
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%", padding: "16px", background: isSubmitting ? "rgba(212,175,55,0.5)" : "linear-gradient(135deg, #D4AF37, #B8972E)",
            border: "none", borderRadius: "10px", color: "#0A0A0A", fontFamily: "'Inter', sans-serif", fontSize: "15px",
            fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", cursor: isSubmitting ? "not-allowed" : "pointer",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
          }}
        >
          {isSubmitting ? (
            "Saving..."
          ) : (
            <>
              <Save size={18} />
              Save Product
            </>
          )}
        </button>
      </form>
    </div>
  );
}
