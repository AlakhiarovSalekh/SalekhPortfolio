import type { Metadata } from "next";
import { env } from "@/lib/env";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: "Alakhiarov Salekh — Software Developer", template: "%s — Alakhiarov Salekh" },
  description: "Professional software developer portfolio focused on Web, Mobile and Desktop products.",
  openGraph: { title: "Alakhiarov Salekh — Software Developer", description: "Web, Mobile and Desktop software products.", type: "website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
