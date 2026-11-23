import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
        height: 675,
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
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} dark`}
    >
      <body className="min-h-screen antialiased selection:bg-[#E11D48] selection:text-white">
        {children}
      </body>
    </html>
  );
}
