import type { Metadata } from "next";
import { env } from "@/lib/env";
import { siteConfig } from "@/content/site";
import "./globals.css";
import "./premium.css";

const siteTitle = "Alakhiarov Salekh | Software Developer — Web, Mobile & Desktop";
const siteDescription =
  "Official portfolio of Alakhiarov Salekh, a software developer building web, mobile and desktop applications.";

export const metadata: Metadata = {
  metadataBase: new URL(env.siteUrl),
  title: { default: siteTitle, template: "%s — Alakhiarov Salekh" },
  description: siteDescription,
  authors: [{ name: siteConfig.name, url: env.siteUrl }],
  creator: siteConfig.name,
  keywords: [
    "Alakhiarov Salekh",
    "Salekh Alakhiarov",
    "Software Developer",
    "Web Developer",
    "Mobile Developer",
    "Desktop Developer",
    "React",
    "Next.js",
    "Kotlin",
    "Swift",
    "Java",
  ],
  verification: {
    google: "3bPbdkse13sIV8CvugtNZkaeYx41xsM96hKoPBdGe34",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "profile",
    url: env.siteUrl,
    siteName: "Alakhiarov Salekh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  alternateName: "Salekh Alakhiarov",
  url: env.siteUrl,
  jobTitle: siteConfig.role,
  sameAs: [siteConfig.github, siteConfig.linkedin],
  knowsAbout: [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Desktop Application Development",
    "React",
    "Next.js",
    "TypeScript",
    "Kotlin",
    "Swift",
    "Java",
    "PostgreSQL",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
