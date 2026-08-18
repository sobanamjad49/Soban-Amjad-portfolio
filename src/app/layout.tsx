import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Sora } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { bootScript } from "@/lib/boot";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

// Only 600 is shipped. The four places that asked for 700 were a 13px logo
// monogram, a 10px badge and a backdrop word at 2.5% opacity, none of which
// read differently at 600 — and a second static weight is another ~29KB
// competing for the critical path that the LCP headline is waiting on.
const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

// Not preloaded. The mono face is only used by the code panel and small
// labels, none of which are the LCP element, so it has no business competing
// for bandwidth with the headline font. Measured: the three preloaded faces
// were gating LCP outright — blocking webfonts entirely moved LCP from 4,956ms
// to 2,640ms on a simulated 1.6Mbit/150ms link.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  preload: false,
});

const title = `${site.name} — Software Engineer & Full-Stack Developer`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.github }],
  creator: site.name,
  keywords: [
    "Soban Amjad",
    "Software Engineer",
    "Full-Stack Developer",
    "Next.js Developer",
    "NestJS",
    "TypeScript",
    "React",
    "Node.js",
    "PostgreSQL",
    "REST API",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title,
    description: site.description,
    locale: "en_US",
  },
  // No Twitter handle is claimed here — only the card metadata that does not
  // require one.
  twitter: {
    card: "summary_large_image",
    title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafc" },
    { media: "(prefers-color-scheme: dark)", color: "#06070b" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

/** JSON-LD so search engines resolve the identity behind the page. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: "Software Engineer & Full-Stack Developer",
  description: site.description,
  email: `mailto:${site.email}`,
  url: site.url,
  sameAs: [site.github, site.linkedin],
  address: { "@type": "PostalAddress", addressLocality: "Lahore", addressCountry: "PK" },
  knowsAbout: [
    "TypeScript",
    "Next.js",
    "React",
    "NestJS",
    "Node.js",
    "PostgreSQL",
    "REST API design",
    "Docker",
    "Google Cloud Platform",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${sora.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        {/* Resolves the theme and starts the reveal observer before the
            React bundle loads. See src/lib/boot.ts. */}
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
