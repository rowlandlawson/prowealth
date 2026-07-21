"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Search, Plus, Filter, Edit, Trash2, Package } from "lucide-react";
import { deleteProduct } from "@/actions/products";
import { Product } from "@/generated/prisma/client";
import CustomDialog from "@/components/CustomDialog";

interface ProductsClientProps {
  initialProducts: Product[];
  initialSearch?: string;
  initialCategory?: string;
}

export default function ProductsClient({
  initialProducts,
  initialSearch = "",
  initialCategory = "All",
}: ProductsClientProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    variant?: "info" | "success" | "danger";
    confirmLabel?: string;
    cancelLabel?: string;
    showCancel?: boolean;
    onConfirm?: () => Promise<void>;
  } | null>(null);

  const categories = ["All", "Perfumes", "Accessories", "Dresses", "Bags"];

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category && category !== "All") params.set("category", category);
    
    startTransition(() => {
      router.push(`/admin/products?${params.toString()}`);
    });
  };

  const handleDelete = (id: string, name: string) => {
    setDialog({
      title: "Delete product?",
      message: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      variant: "danger",
      confirmLabel: "Delete",
      cancelLabel: "Cancel",
      showCancel: true,
      onConfirm: async () => {
        setIsDeleting(id);
        try {
          await deleteProduct(id);
          router.refresh();
          setDialog(null);
        } catch (error) {
          setDialog({
            title: "Delete failed",
            message: "Failed to delete product. Please try again.",
            variant: "danger",
            confirmLabel: "Close",
          });
        } finally {
          setIsDeleting(null);
        }
      },
    });
  };

  return (
    <div style={{ padding: "32px 24px", maxWidth: "1200px", margin: "0 auto" }}>
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
            Products
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
            Manage your store&apos;s inventory
          </p>
        </div>

        <Link
          href="/admin/products/new"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "linear-gradient(135deg, #D4AF37, #B8972E)",
            color: "#0A0A0A",
            padding: "12px 20px",
            borderRadius: "10px",
            textDecoration: "none",
            fontFamily: "'Inter', sans-serif",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <form
        onSubmit={handleFilter}
        style={{
          display: "flex",
          gap: "16px",
          marginBottom: "32px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ position: "relative", flex: "1 1 300px" }}>
          <Search
            size={18}
            color="#666"
            style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 16px 12px 44px",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "10px",
              color: "#FFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              outline: "none",
            }}
          />
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ position: "relative", minWidth: "160px" }}>
            <Filter
              size={16}
              color="#666"
              style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)" }}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                width: "100%",
                appearance: "none",
                padding: "12px 40px 12px 44px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "10px",
                color: "#FFF",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                outline: "none",
                cursor: "pointer",
              }}
            >
              {categories.map((c) => (
                <option key={c} value={c} style={{ background: "#0E0D0C", color: "#FFF" }}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            style={{
              padding: "12px 20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              color: "#FFF",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
          >
            {isPending ? "Filtering..." : "Filter"}
          </button>
        </div>
      </form>

      {/* Product Grid */}
      {initialProducts.length === 0 ? (
        <div
          style={{
            padding: "60px 24px",
            textAlign: "center",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "16px",
            border: "1px dashed rgba(255,255,255,0.1)",
          }}
        >
          <Package size={48} color="#444" style={{ margin: "0 auto 16px" }} />
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", color: "#FFF", margin: "0 0 8px" }}>
            No products found
          </h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "14px", color: "#666", margin: 0 }}>
            Try adjusting your search or add a new product.
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {initialProducts.map((product) => (
            <div
              key={product.id}
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
            >
              <div style={{ position: "relative", width: "100%", paddingBottom: "100%", background: "#000" }}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 300px"
                />
                <div
                  style={{
                    position: "absolute",
                    top: "12px",
                    right: "12px",
                    background: "rgba(0,0,0,0.6)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "11px", fontWeight: 500, color: "#FFF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    {product.category}
                  </span>
                </div>
              </div>
              
              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "20px",
                    fontWeight: 600,
                    color: "#FFF",
                    margin: "0 0 8px",
                  }}
                >
                  {product.name}
                </h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "16px", fontWeight: 500, color: "#D4AF37", margin: "0 0 16px" }}>
                  ₦{product.price.toLocaleString()}
                </p>
                
                <div style={{ marginTop: "auto", display: "flex", gap: "8px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "16px" }}>
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px",
                      background: "rgba(255,255,255,0.05)",
                      borderRadius: "8px",
                      color: "#FFF",
                      textDecoration: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      transition: "background 0.2s",
                    }}
                  >
                    <Edit size={16} />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id, product.name)}
                    disabled={isDeleting === product.id}
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "6px",
                      padding: "10px",
                      background: isDeleting === product.id ? "rgba(239,68,68,0.1)" : "rgba(239,68,68,0.05)",
                      border: "none",
                      borderRadius: "8px",
                      color: "#EF4444",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "13px",
                      fontWeight: 500,
                      cursor: isDeleting === product.id ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    <Trash2 size={16} />
                    {isDeleting === product.id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
