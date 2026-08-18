import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono, Sora } from "next/font/google";
import { ThemeProvider, themeScript } from "@/components/providers/ThemeProvider";
import { site } from "@/data/site";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
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
        {/* Runs before first paint so the stored theme never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
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
