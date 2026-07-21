"use client";

import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

type DialogVariant = "info" | "success" | "danger";

interface CustomDialogProps {
  open: boolean;
  title: string;
  message: string;
  variant?: DialogVariant;
  confirmLabel?: string;
  cancelLabel?: string;
  showCancel?: boolean;
  onConfirm?: () => void | Promise<void>;
  onClose: () => void;
}

const variantStyles: Record<
  DialogVariant,
  { color: string; background: string; icon: typeof Info }
> = {
  info: {
    color: "#D4AF37",
    background: "rgba(212,175,55,0.12)",
    icon: Info,
  },
  success: {
    color: "#22C55E",
    background: "rgba(34,197,94,0.12)",
    icon: CheckCircle2,
  },
  danger: {
    color: "#EF4444",
    background: "rgba(239,68,68,0.12)",
    icon: AlertTriangle,
  },
};

export default function CustomDialog({
  open,
  title,
  message,
  variant = "info",
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  showCancel = false,
  onConfirm,
  onClose,
}: CustomDialogProps) {
  if (!open) return null;

  const styles = variantStyles[variant];
  const Icon = styles.icon;

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm();
      return;
    }

    onClose();
  };

  return (
    <div
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
        background: "rgba(10,10,10,0.76)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="custom-dialog-title"
        aria-describedby="custom-dialog-message"
        style={{
          width: "min(100%, 440px)",
          background: "#0E0D0C",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "14px",
          boxShadow: "0 24px 70px rgba(0,0,0,0.48)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "14px",
            padding: "22px 22px 18px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "10px",
              background: styles.background,
              color: styles.color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "0 0 auto",
            }}
          >
            <Icon size={21} />
          </div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <h2
              id="custom-dialog-title"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "21px",
                lineHeight: 1.25,
                color: "#FFF",
                margin: "0 0 8px",
              }}
            >
              {title}
            </h2>
            <p
              id="custom-dialog-message"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                lineHeight: 1.65,
                color: "#B8B1A8",
                margin: 0,
              }}
            >
              {message}
            </p>
          </div>

          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#777",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "10px",
            padding: "16px 22px 22px",
            borderTop: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {showCancel && (
            <button
              type="button"
              onClick={onClose}
              style={{
                minWidth: "96px",
                padding: "11px 14px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "8px",
                color: "#FFF",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
                fontWeight: 500,
                cursor: "pointer",
              }}
            >
              {cancelLabel}
            </button>
          )}

          <button
            type="button"
            onClick={handleConfirm}
            style={{
              minWidth: "112px",
              padding: "11px 14px",
              background: variant === "danger" ? "#EF4444" : "#D4AF37",
              border: "none",
              borderRadius: "8px",
              color: variant === "danger" ? "#FFF" : "#0A0A0A",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
