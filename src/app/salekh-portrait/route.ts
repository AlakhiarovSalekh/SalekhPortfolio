import { portraitDataUri } from "@/content/portrait";

export const dynamic = "force-static";

export function GET() {
  const comma = portraitDataUri.indexOf(",");
  const base64 = comma >= 0 ? portraitDataUri.slice(comma + 1) : portraitDataUri;
  const bytes = Uint8Array.from(atob(base64), (char) => char.charCodeAt(0));

  return new Response(bytes.buffer, {
    headers: {
      "Content-Type": "image/webp",
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Disposition": "inline; filename=\"salekh-portrait.webp\"",
    },
  });
}
