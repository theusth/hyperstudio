import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION } from "@/lib/constants";

export const alt = "Hyper Studio — Agência de Desenvolvimento Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background:
            "radial-gradient(circle at 15% 15%, rgba(139,92,246,0.35), transparent 45%), radial-gradient(circle at 85% 75%, rgba(59,130,246,0.3), transparent 45%), #050508",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 16,
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
              color: "white",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            H
          </div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#f4f4f5" }}>
            HYPER STUDIO
          </div>
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 56,
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            maxWidth: 950,
            lineHeight: 1.15,
          }}
        >
          Transformamos ideias em experiências digitais.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "#a1a1aa",
            maxWidth: 820,
            lineHeight: 1.4,
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { ...size }
  );
}
