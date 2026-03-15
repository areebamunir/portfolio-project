import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Areeba Munir | Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage() {
  const [manropeBold] = await Promise.all([
    readFile(join(process.cwd(), "app/fonts/Manrope-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "72px 84px",
          background: "#070A12",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 25% 20%, rgba(34,211,238,0.25), transparent 45%), radial-gradient(circle at 80% 75%, rgba(217,70,239,0.18), transparent 45%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: 18, zIndex: 1 }}>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 88,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            Areeba Munir
          </div>
          <div
            style={{
              fontFamily: "Manrope",
              fontSize: 28,
              fontWeight: 700,
              color: "rgba(255,255,255,0.78)",
              letterSpacing: "-0.02em",
            }}
          >
            Data Engineer \u2022 Portfolio
          </div>
          <div
            style={{
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
              marginTop: 6,
            }}
          >
            {["Snowflake", "Airflow", "Python", "dbt"].map((t) => (
              <div
                key={t}
                style={{
                  fontFamily: "Manrope",
                  fontSize: 18,
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.85)",
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.14)",
                  padding: "10px 14px",
                  borderRadius: 999,
                }}
              >
                {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Manrope",
          data: manropeBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
