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
      <head>
        <Script id="gtm-base" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PVWD2CT9');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PVWD2CT9"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <I18nProvider>
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
