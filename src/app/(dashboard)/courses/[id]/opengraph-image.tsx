import { ImageResponse } from "next/og";

export const alt = "Course – ICT101";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  let courseName = "ICT101 Course";
  let subject = "";

  try {
    const res = await fetch(`${process.env.API_BASE_URL}/v1/course-units/${id}`);
    if (res.ok) {
      const data = await res.json();
      courseName = data.name ?? courseName;
      subject = data.subject?.name ?? "";
    }
  } catch {
    // fallback to defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#080b14",
          padding: "64px 80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Purple glow top-right */}
        <div
          style={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(147,51,234,0.30) 0%, transparent 70%)",
          }}
        />
        {/* Blue glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: 200,
            width: 360,
            height: 360,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(37,99,235,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#ffffff",
              letterSpacing: "-1px",
            }}
          >
            ICT101
          </div>
          {subject && (
            <>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#6b7280" }} />
              <div style={{ fontSize: 24, color: "#9ca3af" }}>{subject}</div>
            </>
          )}
        </div>

        {/* Middle: course name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 60,
              height: 4,
              background: "linear-gradient(90deg, #9333ea, #3b82f6)",
              borderRadius: 999,
            }}
          />
          <div
            style={{
              fontSize: courseName.length > 50 ? 44 : 56,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {courseName}
          </div>
        </div>

        {/* Bottom: URL */}
        <div style={{ fontSize: 20, color: "#6b7280" }}>ict101.accivion.com</div>
      </div>
    ),
    { ...size }
  );
}
