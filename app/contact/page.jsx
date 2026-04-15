"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Clock, Facebook, Instagram, Mail, MapPin, Music2, Phone, Send } from "lucide-react";
import { useI18n } from "../providers";

const NAME_ALLOWED_CHARS = /[^\p{L}\s]/gu;
const RECAPTCHA_ACTION = "contact_submit";
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

export default function ContactPage() {
  const { t } = useI18n();
  const phone = t("contact.phone");
  const email = t("contact.email");
  const address = t("contact.address");
  const socials = t("contact.socials") || {};

  const [formValues, setFormValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [honeypotValue, setHoneypotValue] = useState("");
  const [csrfToken, setCsrfToken] = useState("");
  const [consentChecked, setConsentChecked] = useState(false);
  const [formStatus, setFormStatus] = useState(null);
  const [lastSuccessfulSubmissionAt, setLastSuccessfulSubmissionAt] = useState(null);
  const [mapAttempt, setMapAttempt] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);
  const formRef = useRef(null);

  const getFieldValidationMessage = (input) => {
    const { name, validity } = input;

    if (validity.valueMissing) {
      return t(`contact.form.validation.${name}.required`) || t("contact.form.validation.required");
    }

    if (validity.typeMismatch) {
      return t(`contact.form.validation.${name}.typeMismatch`) || t("contact.form.validation.typeMismatch");
    }

    if (validity.tooShort) {
      return t(`contact.form.validation.${name}.tooShort`) || t("contact.form.validation.tooShort");
    }

    if (validity.tooLong) {
      return t(`contact.form.validation.${name}.tooLong`) || t("contact.form.validation.tooLong");
    }

    if (validity.patternMismatch) {
      return t(`contact.form.validation.${name}.patternMismatch`) || t("contact.form.validation.patternMismatch");
    }

    return "";
  };

  const handleInvalidField = (event) => {
    const input = event.target;
    input.setCustomValidity("");
    const message = getFieldValidationMessage(input);
    if (message) {
      input.setCustomValidity(message);
    }
  };

  const clearCustomValidation = (event) => {
    event.target.setCustomValidity("");
  };

  useEffect(() => {
    if (mapLoaded || mapAttempt >= 2) return;
    const timer = setTimeout(() => {
      setMapAttempt((prev) => prev + 1);
    }, 4000);
    return () => clearTimeout(timer);
  }, [mapAttempt, mapLoaded]);

  useEffect(() => {
    if (formStatus?.type !== "success") return undefined;

    const timer = setTimeout(() => {
      setFormStatus(null);
    }, 6000);

    return () => clearTimeout(timer);
  }, [formStatus]);

  useEffect(() => {
    const loadCsrfToken = async () => {
      try {
        const response = await fetch("/api/contact/csrf", {
          method: "GET",
          credentials: "same-origin",
        });

        if (!response.ok) {
          throw new Error("Failed to initialize secure form.");
        }

        const body = await response.json();
        if (!body?.csrfToken) {
          throw new Error("Missing CSRF token.");
        }

        setCsrfToken(body.csrfToken);
      } catch (error) {
        setFormStatus({ type: "error", message: t("contact.form.error") });
      }
    };

    loadCsrfToken();
  }, [t]);

  const contactBlocks = [
    { key: "phone", label: t("contact.phoneLabel"), Icon: Phone, value: phone },
    { key: "email", label: t("contact.emailLabel"), Icon: Mail, value: email },
    { key: "address", label: t("contact.addressLabel"), Icon: MapPin, value: address },
    {
      key: "schedule",
      label: t("contact.scheduleLabel"),
      Icon: Clock,
      lines: [t("contact.scheduleLine1"), t("contact.scheduleLine2")],
    },
  ];

  const getIconAction = (key, value) => {
    if (key === "phone" && value) {
      return {
        href: `tel:${String(value).replace(/\s+/g, "")}`,
        ariaLabel: t("contact.callCta"),
      };
    }

    if (key === "email" && value) {
      return {
        href: `mailto:${value}`,
        ariaLabel: t("contact.emailCta"),
      };
    }

    if (key === "address" && value) {
      return {
        href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(value)}`,
        ariaLabel: t("contact.mapTitle"),
        target: "_blank",
        rel: "noopener noreferrer",
      };
    }

    return null;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    let nextValue = value;

    if (name === "name") {
      nextValue = value.replace(NAME_ALLOWED_CHARS, "").replace(/\s+/g, " ").slice(0, 25);
    }

    if (name === "phone") {
      nextValue = value.replace(/\D/g, "").slice(0, 13);
    }

    if (name === "message") {
      nextValue = value.slice(0, 750);
    }

    setFormValues((prev) => ({ ...prev, [name]: nextValue }));

    if (formStatus && formStatus.type !== "pending") {
      setFormStatus(null);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!recaptchaSiteKey) {
      setFormStatus({ type: "error", message: t("contact.form.recaptchaNotConfigured") });
      return;
    }

    if (!csrfToken) {
      setFormStatus({ type: "error", message: t("contact.form.error") });
      return;
    }

    if (!consentChecked) {
      setFormStatus({ type: "error", message: t("contact.form.consentError") });
      return;
    }
    setFormStatus({ type: "pending", message: t("contact.form.sending") });

    try {
      if (!window?.grecaptcha?.enterprise) {
        throw new Error(t("contact.form.recaptchaUnavailable"));
      }

      const recaptchaToken = await new Promise((resolve, reject) => {
        window.grecaptcha.enterprise.ready(async () => {
          try {
            const token = await window.grecaptcha.enterprise.execute(recaptchaSiteKey, {
              action: RECAPTCHA_ACTION,
            });
            resolve(token);
          } catch (error) {
            reject(new Error(t("contact.form.recaptchaValidationFailed")));
          }
        });
      });

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken,
        },
        credentials: "same-origin",
        body: JSON.stringify({
          ...formValues,
          website: honeypotValue,
          recaptchaToken,
          recaptchaAction: RECAPTCHA_ACTION,
        }),
      });

      if (!response.ok) {
        const responseBody = await response.json().catch(() => ({}));
        throw new Error(responseBody?.error || t("contact.form.error"));
      }

      setFormStatus({ type: "success", message: t("contact.form.success") });
      setFormValues({ name: "", email: "", phone: "", message: "" });
      setHoneypotValue("");
      setConsentChecked(false);
      const submittedAt = Date.now();
      setLastSuccessfulSubmissionAt(submittedAt);

      if (typeof window !== "undefined") {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "contact_form_submit_success",
          formId: "contact-form",
          formName: "contact",
          submittedAt,
        });
      }
    } catch (error) {
      setFormStatus({ type: "error", message: error.message || t("contact.form.error") });
    }
  };

  return (
    <>
      {recaptchaSiteKey && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${recaptchaSiteKey}`}
          strategy="afterInteractive"
        />
      )}
      <style jsx global>{`
        .grecaptcha-badge {
          display: none !important;
        }
      `}</style>
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-white/90 via-white/85 to-slate-100/90 px-6 py-12 shadow-2xl shadow-slate-200 sm:px-10 lg:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-1/5 top-[-10%] h-72 w-72 rounded-full bg-[#cdb360]/35 blur-3xl" />
        <div className="absolute left-[-8%] bottom-[-12%] h-72 w-72 rounded-full bg-[#aa995a]/25 blur-3xl" />
      </div>

      <div className="relative grid gap-10 lg:grid-cols-[1.05fr,0.95fr] lg:items-start">
        <div className="space-y-6">


          <span className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#817e32]">
            {t("contact.badge")}
          </span>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            {t("contact.title")}

          </h1>
          <p className="max-w-4xl  text-base leading-relaxed text-slate-700">
            {t("contact.description")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`tel:${phone}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
            >
              <Phone size={16} />
              {t("contact.callCta")}
            </Link>
            <button
              type="button"
              onClick={scrollToForm}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-white/80"
            >
              <Mail size={16} />
              {t("contact.emailCta")}
            </button>
          </div>
        </div>



        <div className="relative space-y-4">
          <div className="rounded-2xl border border-slate-200 bg-white/85 p-5 shadow-lg shadow-slate-200/70">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-5">
              {contactBlocks.map(({ key, label, Icon, value, lines }) => {
                const iconAction = getIconAction(key, value);

                return (
                  <div
                    key={key}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100/80 bg-white/50 px-3 py-2.5 sm:py-2"
                  >
                    {iconAction ? (
                      <a
                        href={iconAction.href}
                        aria-label={iconAction.ariaLabel}
                        target={iconAction.target}
                        rel={iconAction.rel}
                        className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#817e32]/20 bg-white text-[#817e32] shadow-sm shadow-[#817e32]/10 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                      >
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </a>
                    ) : (
                      <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-[#817e32]/20 bg-white text-[#817e32] shadow-sm shadow-[#817e32]/10">
                        <Icon size={18} strokeWidth={2} aria-hidden />
                      </span>
                    )}
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
                      {lines ? (
                        <div className="space-y-1">
                          <p className="text-sm font-semibold leading-snug text-slate-900">{lines[0]}</p>
                          <p className="text-xs font-medium leading-snug text-slate-600">{lines[1]}</p>
                        </div>
                      ) : (
                        <p className="break-words text-sm font-semibold text-slate-900">{value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex w-full flex-wrap items-center justify-center gap-2 border-t border-slate-200/80 pt-5 sm:gap-3">
              {socials.instagram && (
                <Link
                  href={socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                >
                  <Instagram size={16} />
                  Instagram
                </Link>
              )}
              {socials.facebook && (
                <Link
                  href={socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                >
                  <Facebook size={16} />
                  Facebook
                </Link>
              )}
              {socials.tiktok && (
                <Link
                  href={socials.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-800 transition hover:border-[#9f8a3f] hover:text-[#9f8a3f]"
                >
                  <Music2 size={16} />
                  TikTok
                </Link>
              )}
            </div>
          </div>

          <div
            ref={formRef}
            className="mt-15 mb-15 rounded-2xl border border-slate-200 bg-white/90 p-5 shadow-lg shadow-slate-200/70 scroll-mt-24 md:scroll-mt-28"
          >
            <h2 className="text-xl font-semibold text-slate-900">{t("contact.form.title")}</h2>
            <p className="mt-1 text-sm text-slate-600">{t("contact.form.subtitle")}</p>

            <form id="contact-form" className="mt-5 space-y-4" onSubmit={handleSubmit}>
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">
                  Website
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypotValue}
                    onChange={(event) => setHoneypotValue(event.target.value)}
                  />
                </label>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm font-semibold text-slate-800">
                  {/* {t("contact.form.name")} */}
                  <input
                    type="text"
                    name="name"
                    placeholder={t("contact.form.name")}
                    value={formValues.name}
                    onChange={handleChange}
                    onInvalid={handleInvalidField}
                    onInput={clearCustomValidation}
                    required
                    minLength={3}
                    maxLength={25}
                    pattern="[A-Za-zĂÂÎȘŞȚŢăâîșşțţ\s]{3,25}"
                    title={t("contact.form.validation.name.patternMismatch")}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 shadow-inner shadow-slate-100 focus:border-[#cdb360] focus:outline-none focus:ring-2 focus:ring-[#cdb360]/30"
                  />
                </label>
                <label className="space-y-2 text-sm font-semibold text-slate-800">

                  <input
                    type="email"
                    name="email"
                    placeholder={t("contact.form.email")}
                    value={formValues.email}
                    onChange={handleChange}
                    onInvalid={handleInvalidField}
                    onInput={clearCustomValidation}
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 shadow-inner shadow-slate-100 focus:border-[#cdb360] focus:outline-none focus:ring-2 focus:ring-[#cdb360]/30"
                  />
                </label>
              </div>
              <label className="mb-5 space-y-2 text-sm font-semibold text-slate-800">

                <input
                  type="tel"
                  name="phone"
                  placeholder={t("contact.form.phone")}
                  value={formValues.phone}
                  onChange={handleChange}
                  onInvalid={handleInvalidField}
                  onInput={clearCustomValidation}
                  minLength={9}
                  maxLength={13}
                  inputMode="numeric"
                  pattern="[0-9]{9,13}"
                  title={t("contact.form.validation.phone.patternMismatch")}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-normal text-slate-900 shadow-inner shadow-slate-100 focus:border-[#cdb360] focus:outline-none focus:ring-2 focus:ring-[#cdb360]/30"
                />
              </label>

              <div className="relative mt-5">
                <textarea
                  name="message"
                  placeholder={t("contact.form.message")}
                  value={formValues.message}
                  onChange={handleChange}
                  onInvalid={handleInvalidField}
                  onInput={clearCustomValidation}
                  required
                  rows={6}
                  maxLength={750}
                  className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-2 pb-8 text-sm font-normal text-slate-900 shadow-inner shadow-slate-100 focus:border-[#cdb360] focus:outline-none focus:ring-2 focus:ring-[#cdb360]/30"
                />
                <p className="pointer-events-none absolute bottom-2 right-3 text-xs text-slate-500">
                  {formValues.message.length}/750
                </p>
              </div>
              {/* </label> */}

              <div className="flex items-start gap-3 text-xs text-slate-700">
                <input
                  type="checkbox"
                  checked={consentChecked}
                  onChange={(event) => {
                    setConsentChecked(event.target.checked);
                    if (formStatus?.type === "error") {
                      setFormStatus(null);
                    }
                  }}
                  className="mt-1  pt-1 h-4 w-4 rounded border-slate-300 text-[#9f8a3f] focus:ring-[#cdb360]"
                  style={{ accentColor: "#cdb360" }}
                />
                <p className="leading-relaxed mt--1">
                  {t("contact.form.consent.prefix")}{" "}
                  <a
                    href="/gdpr"
                    className="font-semibold text-[#817e32] underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contact.form.consent.gdpr")}
                  </a>{" "}
                  {t("contact.form.consent.and")}{" "}
                  <a
                    href="/terms-and-conditions"
                    className="font-semibold text-[#817e32] underline-offset-4 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contact.form.consent.terms")}
                  </a>{" "}
                  {t("contact.form.consent.suffix")}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#9f8a3f] to-[#cdb360] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#cdb360]/50 transition hover:from-[#aa995a] hover:to-[#9f8a3f]"
                >
                  <Send size={16} />
                  {t("contact.form.submit")}
                </button>
                {formStatus && (
                  <p
                    className={`text-sm ${formStatus.type === "success"
                      ? "text-green-700"
                      : formStatus.type === "error"
                        ? "text-red-700"
                        : "text-slate-700"
                      }`}
                  >
                    {formStatus.message}
                  </p>
                )}
                {lastSuccessfulSubmissionAt && (
                  <span
                    id="contact-form-success-trigger"
                    data-conversion-event="contact_form_submit_success"
                    data-submitted-at={lastSuccessfulSubmissionAt}
                    hidden
                  />
                )}
              </div>
            </form>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-lg shadow-slate-200">
            <iframe
              key={`map-${mapAttempt}`}
              title={t("contact.mapTitle")}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2733.4374125507807!2d23.579772277409482!3d46.75627397112452!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47490d4232b292bb%3A0xf80d7c264dc03c9c!2sSynaptica%20Cluj!5e0!3m2!1sen!2sro!4v1767811850763!5m2!1sen!2sro"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[260px] w-full"
              onLoad={() => setMapLoaded(true)}
              onError={() => setMapAttempt((prev) => (prev < 2 ? prev + 1 : prev))}
            />
          </div>



        </div>
      </div>
      </section>
    </>
  );
}
