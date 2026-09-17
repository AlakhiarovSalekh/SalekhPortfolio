import { Buffer } from "node:buffer";
import { portraitDataUri } from "@/content/portrait";

export const runtime = "nodejs";
export const dynamic = "force-static";

export function GET() {
  const comma = portraitDataUri.indexOf(",");
  const encoded = comma >= 0 ? portraitDataUri.slice(comma + 1) : portraitDataUri;
  const base64 = encoded.replace(/\s+/g, "");
  const buffer = Buffer.from(base64, "base64");
  const bytes = new Uint8Array(buffer);

  return new Response(bytes, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": "inline; filename=\"salekh-portrait.webp\"",
    },
  });
}
