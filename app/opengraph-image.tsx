import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "doasfrancisco - essays on programming languages and AI";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#ffffff",
          padding: "80px"
        }}
      >
        <div style={{ fontSize: 96, color: "#3232ff", letterSpacing: "-0.03em" }}>
          {site.name}
        </div>
        <div style={{ fontSize: 40, color: "#000000", marginTop: 24 }}>
          Essays on programming languages and AI
        </div>
        <div style={{ fontSize: 28, color: "#555555", marginTop: 40 }}>{site.url}</div>
      </div>
    ),
    size
  );
}
