import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { I18nProvider } from "./providers";
import { rootMetadataBase } from "../lib/seo";
import { buildSiteJsonLd } from "../lib/schema-jsonld";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  ...rootMetadataBase,
  icons: {
    icon: "/synaptica_logo.png",
    shortcut: "/synaptica_logo.png",
    apple: "/synaptica_logo.png",
  },
};

export default function RootLayout({ children }) {
  const siteStructuredData = buildSiteJsonLd();

  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <I18nProvider>
          <Script
            src="https://www.googletagmanager.com/gtag/js?id=<GOOGLE_KEY>"
            strategy="afterInteractive"
          />
          <Script id="gtag-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '<GOOGLE_KEY>');
            `}
          </Script>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData).replace(/</g, "\\u003c") }}
          />
          <div className="relative min-h-screen text-slate-900">
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-80">
              <div className="absolute -left-24 top-[-10%] h-[340px] w-[340px] rounded-full bg-sky-400/20 blur-3xl" />
              <div className="absolute right-[-14%] top-6 h-[260px] w-[260px] rounded-full bg-amber-300/20 blur-3xl" />
              <div className="absolute inset-x-10 top-1/3 h-32 rounded-full bg-white/30 blur-3xl" />
            </div>

            <NavBar />
            <main className="mx-auto max-w-6xl px-4 pb-16 pt-24">{children}</main>
            <Footer />
            <CookieConsentBanner />
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
