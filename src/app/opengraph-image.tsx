import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ICT101 – Next Generation ICT Education";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#080b14",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,51,234,0.35) 0%, transparent 70%)",
          }}
        />
        {/* Blue glow bottom-left */}
        <div
          style={{
            position: "absolute",
            bottom: -120,
            left: -120,
            width: 420,
            height: 420,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.30) 0%, transparent 70%)",
          }}
        />

        {/* Brand name */}
        <div
          style={{
            fontSize: 104,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1,
            marginBottom: 24,
          }}
        >
          ICT101
        </div>

        {/* Gradient divider */}
        <div
          style={{
            width: 200,
            height: 3,
            background: "linear-gradient(90deg, #9333ea, #3b82f6)",
            borderRadius: 999,
            marginBottom: 28,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#9ca3af",
            textAlign: "center",
            maxWidth: 680,
            lineHeight: 1.4,
          }}
        >
          Master ICT skills online with interactive courses and expert instruction
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 20,
            color: "#6b7280",
          }}
        >
          ict101.accivion.com
        </div>
      </div>
    ),
    { ...size }
  );
}
