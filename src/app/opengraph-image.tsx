import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time. Kept to core system fonts and flat colour so it never
 * depends on a network fetch during rendering.
 */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#06070b",
          backgroundImage:
            "radial-gradient(1000px circle at 50% -10%, rgba(131,113,255,0.28), transparent 60%)",
          padding: "72px",
          color: "#eceef4",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.16)",
              fontSize: 22,
              fontWeight: 700,
              color: "#8371ff",
            }}
          >
            {site.initials}
          </div>
          <div style={{ fontSize: 22, color: "#9aa1b2", letterSpacing: 4 }}>
            PORTFOLIO
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 700, letterSpacing: -3, lineHeight: 1.05 }}>
            {site.name}
          </div>
          <div style={{ fontSize: 40, fontWeight: 600, color: "#8371ff", marginTop: 12 }}>
            {site.role}
          </div>
          <div
            style={{
              fontSize: 26,
              color: "#9aa1b2",
              marginTop: 24,
              maxWidth: 900,
              lineHeight: 1.4,
            }}
          >
            {site.statement}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 14,
            fontSize: 20,
            color: "#9aa1b2",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            paddingTop: 28,
          }}
        >
          {["Next.js", "TypeScript", "NestJS", "PostgreSQL", "Docker"].map((tech) => (
            <div
              key={tech}
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 999,
                padding: "8px 18px",
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
