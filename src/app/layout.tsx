import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { HideInObs, ObsProvider } from "@/components/layout/obs-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { ThemeProvider } from "@/components/layout/theme-context";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FulboLab · El laboratorio abierto del fútbol latinoamericano",
  description:
    "Calculadoras, simuladores de playoffs, comparadores VS y modo OBS gratis para hinchas y streamers de LatAm. Sin anuncios. Open Source por Crafter Station.",
  metadataBase: new URL("https://fulbolab.com"),
  openGraph: {
    title: "FulboLab · El laboratorio abierto del fútbol latinoamericano",
    description:
      "Calculadoras, simuladores de playoffs, comparadores VS y modo OBS gratis. Sin anuncios. Open Source.",
    url: "https://fulbolab.com",
    siteName: "FulboLab",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FulboLab · Open Source por Crafter Station",
      },
    ],
    locale: "es_PE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FulboLab · El laboratorio abierto del fútbol latinoamericano",
    description:
      "Calculadoras, simuladores de playoffs y modo OBS gratis para streamers de LatAm. Open Source.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable}`}
    >
      <head>
        <script src="/theme-init.js" />
      </head>
      <body className="min-h-screen antialiased selection:bg-pulse selection:text-white">
        <ThemeProvider>
          <ObsProvider>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <div className="flex flex-1 flex-col">{children}</div>
              <HideInObs>
                <SiteFooter />
              </HideInObs>
            </div>
          </ObsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
