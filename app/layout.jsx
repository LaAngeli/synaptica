import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CookieConsentBanner from "./components/CookieConsentBanner";
import { I18nProvider } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Synaptica Cluj – Brainmapping si Neurofeedback",
  description:
    "Synaptica Cluj ofera brainmapping EEG, neurofeedback si antrenamente cerebrale personalizate pentru echilibru mental, claritate cognitiva si performanta sustenabila, cu programe adaptate nevoilor fiecarui client.",
  icons: {
    icon: "/synaptica_logo.png",
    shortcut: "/synaptica_logo.png",
    apple: "/synaptica_logo.png",
  },
};

export default function RootLayout({ children }) {
  const siteStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Synaptica Cluj",
    url: "https://synaptica-cluj.ro",
    description:
      "Synaptica Cluj ofera brainmapping EEG, neurofeedback si antrenamente cerebrale personalizate pentru echilibru mental, claritate cognitiva si performanta sustenabila, cu programe adaptate nevoilor fiecarui client.",
    inLanguage: ["ro", "en"],
    potentialAction: {
      "@type": "SearchAction",
      target: "https://synaptica-cluj.ro/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    hasPart: [
      { "@type": "SiteNavigationElement", name: "Home", url: "https://synaptica-cluj.ro/" },
      { "@type": "SiteNavigationElement", name: "Servicii", url: "https://synaptica-cluj.ro/services" },
      { "@type": "SiteNavigationElement", name: "Preturi", url: "https://synaptica-cluj.ro/pricing" },
      { "@type": "SiteNavigationElement", name: "Afectiuni", url: "https://synaptica-cluj.ro/conditions" },
      { "@type": "SiteNavigationElement", name: "Contact", url: "https://synaptica-cluj.ro/contact" },
    ],
  };

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
            dangerouslySetInnerHTML={{ __html: JSON.stringify(siteStructuredData) }}
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
