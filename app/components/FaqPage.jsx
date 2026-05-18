"use client";

import Link from "next/link";
import { useI18n } from "../providers";
import { faqContent } from "../../lib/faq-content";
import { SITE_URL } from "../../lib/seo";

function buildFaqJsonLd(language, questions) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: language === "en" ? "en" : "ro",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

function buildBreadcrumbJsonLd(language) {
  const faqName = language === "en" ? "FAQ" : "Întrebări frecvente";

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: faqName,
        item: `${SITE_URL}/faq`,
      },
    ],
  };
}

function renderAnswerWithPricingLink(answer, language) {
  const pricingKeyword = language === "en" ? "Pricing" : "Prețuri";
  const keywordIndex = answer.indexOf(pricingKeyword);

  if (keywordIndex === -1) {
    return answer;
  }

  const before = answer.slice(0, keywordIndex);
  const after = answer.slice(keywordIndex + pricingKeyword.length);

  return (
    <>
      {before}
      <Link href="/pricing" className="font-semibold text-[#817e32] underline-offset-4 hover:underline hover:text-[#9f8a3f]">
        {pricingKeyword}
      </Link>
      {after}
    </>
  );
}

export default function FaqPage() {
  const { language } = useI18n();
  const content = faqContent[language] || faqContent.ro;
  const faqJsonLd = buildFaqJsonLd(language, content.questions);
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(language);

  return (
    <section className="relative space-y-8 overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/45 blur-3xl" />
        <div className="absolute left-[-8%] bottom-[-12%] h-72 w-72 rounded-full bg-[#aa995a]/25 blur-3xl" />
      </div>

      <div className="relative space-y-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
          {content.badge}
        </span>
        <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">{content.title}</h1>
        <p className="max-w-4xl text-base leading-relaxed text-slate-700">{content.subtitle}</p>
      </div>

      <div className="relative space-y-4">
        {content.questions.map((item) => (
          <details
            key={item.question}
            className="group rounded-2xl border border-slate-200 bg-white/95 p-5 shadow-inner shadow-slate-200/70"
          >
            <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-900 marker:content-none">
              {item.question}
              <span className="ml-2 inline-block text-[#817e32] transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">
              {renderAnswerWithPricingLink(item.answer, language)}
            </p>
          </details>
        ))}
      </div>

      <div className="relative flex flex-wrap gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
        >
          {content.ctaPrimary}
        </Link>
        <Link
          href="/services"
          className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
        >
          {content.ctaSecondary}
        </Link>
      </div>
    </section>
  );
}
