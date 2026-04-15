import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredFields = ["name", "email", "message"];
const NAME_REGEX = /^[\p{L}\s]+$/u;
const PHONE_REGEX = /^\d{9,13}$/;
const DEFAULT_RATE_WINDOW_MS = 15 * 60 * 1000;
const DEFAULT_RATE_MAX_REQUESTS = 5;
const DEFAULT_RECAPTCHA_MIN_SCORE = 0.5;
const DEFAULT_RECAPTCHA_ACTION = "contact_submit";
const CSRF_COOKIE_NAME = "contact_csrf";
const rateLimitStore = globalThis.__contactRateLimitStore || new Map();

if (!globalThis.__contactRateLimitStore) {
  globalThis.__contactRateLimitStore = rateLimitStore;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidName(value) {
  return typeof value === "string" && NAME_REGEX.test(value);
}

function isValidPhone(value) {
  return typeof value === "string" && PHONE_REGEX.test(value);
}

function safeString(value, maxLen = 2000) {
  if (value == null) return "";
  return String(value).trim().slice(0, maxLen);
}

function parseBoolean(value) {
  if (typeof value !== "string") return false;
  return value.toLowerCase() === "true";
}

function parseInteger(value, fallback) {
  const parsed = Number.parseInt(value || "", 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

function parseFloatValue(value, fallback) {
  const parsed = Number.parseFloat(value || "");
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeOrigin(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return `${url.protocol}//${url.host}`.toLowerCase();
  } catch {
    return "";
  }
}

function getRequestHostOrigin(request) {
  const forwardedProto = request.headers.get("x-forwarded-proto");
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost || request.headers.get("host");
  const protocolFromNext = request.nextUrl?.protocol || "";
  const proto = forwardedProto || protocolFromNext.replace(":", "") || "https";

  if (!host || !proto) {
    return "";
  }

  return normalizeOrigin(`${proto}://${host}`);
}

function getClientIp(request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    const [ip] = forwardedFor.split(",");
    return ip.trim();
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function assertOriginAllowed(request) {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  const configuredOrigins = process.env.CONTACT_ALLOWED_ORIGIN;
  const requestOrigin = normalizeOrigin(request.headers.get("origin") || "");
  if (!requestOrigin) {
    return false;
  }

  const allowedOrigins = configuredOrigins
    ? configuredOrigins
    .split(",")
    .map((origin) => normalizeOrigin(origin.trim()))
    .filter(Boolean)
    : [];

  // Fallback sigur: adăugăm și origin-ul hostului curent al requestului.
  const runtimeOrigins = [
    normalizeOrigin(request.nextUrl?.origin || ""),
    getRequestHostOrigin(request),
  ].filter(Boolean);

  const allAllowedOrigins = new Set([...allowedOrigins, ...runtimeOrigins]);
  if (allAllowedOrigins.size === 0) {
    return true;
  }

  return allAllowedOrigins.has(requestOrigin);
}

function assertCsrfToken(request) {
  const csrfCookie = request.cookies.get(CSRF_COOKIE_NAME)?.value || "";
  const csrfHeader = request.headers.get("x-csrf-token") || "";
  return csrfCookie && csrfHeader && csrfCookie === csrfHeader;
}

function isRateLimited(request) {
  const ip = getClientIp(request);
  const windowMs = parseInteger(process.env.CONTACT_RATE_LIMIT_WINDOW_MS, DEFAULT_RATE_WINDOW_MS);
  const maxRequests = parseInteger(process.env.CONTACT_RATE_LIMIT_MAX_REQUESTS, DEFAULT_RATE_MAX_REQUESTS);
  const now = Date.now();

  for (const [key, value] of rateLimitStore.entries()) {
    if (now - value.windowStart > windowMs) {
      rateLimitStore.delete(key);
    }
  }

  const current = rateLimitStore.get(ip);
  if (!current) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (now - current.windowStart > windowMs) {
    rateLimitStore.set(ip, { count: 1, windowStart: now });
    return false;
  }

  if (current.count >= maxRequests) {
    return true;
  }

  current.count += 1;
  rateLimitStore.set(ip, current);
  return false;
}

async function verifyRecaptchaToken({ token, remoteIp, expectedAction, minScore }) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret) {
    return { ok: false, reason: "reCAPTCHA neconfigurat pe server." };
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: remoteIp || "",
    }),
  });

  if (!response.ok) {
    return { ok: false, reason: "Nu am putut valida reCAPTCHA." };
  }

  const result = await response.json();
  if (!result.success) {
    return { ok: false, reason: "Token reCAPTCHA invalid." };
  }

  if (result.action && result.action !== expectedAction) {
    return { ok: false, reason: "Acțiune reCAPTCHA invalidă." };
  }

  if (typeof result.score === "number" && result.score < minScore) {
    return { ok: false, reason: "Scor reCAPTCHA prea mic." };
  }

  return { ok: true };
}

export async function POST(request) {
  try {
    if (!assertOriginAllowed(request)) {
      return NextResponse.json({ error: "Origin nepermis." }, { status: 403 });
    }

    if (!assertCsrfToken(request)) {
      return NextResponse.json({ error: "Token CSRF invalid." }, { status: 403 });
    }

    if (isRateLimited(request)) {
      return NextResponse.json(
        { error: "Prea multe solicitări. Încearcă din nou în câteva minute." },
        { status: 429 }
      );
    }

    const payload = await request.json();
    const honeypot = safeString(payload?.website, 100);

    // Honeypot: bot-ul primește răspuns de succes, fără trimiterea emailului.
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    const recaptchaToken = safeString(payload?.recaptchaToken, 4000);
    const recaptchaAction = safeString(payload?.recaptchaAction, 100) || DEFAULT_RECAPTCHA_ACTION;
    const minScore = parseFloatValue(
      process.env.RECAPTCHA_MIN_SCORE,
      DEFAULT_RECAPTCHA_MIN_SCORE
    );
    const remoteIp = getClientIp(request);

    if (!recaptchaToken) {
      return NextResponse.json({ error: "Token reCAPTCHA lipsă." }, { status: 400 });
    }

    const name = safeString(payload?.name, 120).replace(/\s+/g, " ");
    const email = safeString(payload?.email, 254);
    const phone = safeString(payload?.phone, 60);
    const message = safeString(payload?.message, 5000);

    const sanitizedPayload = { name, email, message };
    const missing = requiredFields.filter((field) => !sanitizedPayload[field]);
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    if (name.length < 3 || name.length > 25 || !isValidName(name)) {
      return NextResponse.json(
        { error: "Nume invalid. Folosește doar litere, între 3 și 25 de caractere." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Adresă de email invalidă." }, { status: 400 });
    }

    if (phone && !isValidPhone(phone)) {
      return NextResponse.json(
        { error: "Telefon invalid. Folosește doar cifre, între 9 și 13 caractere." },
        { status: 400 }
      );
    }

    if (!message || message.length > 750) {
      return NextResponse.json(
        { error: "Mesaj invalid. Lungimea maximă este de 750 de caractere." },
        { status: 400 }
      );
    }

    const recaptchaResult = await verifyRecaptchaToken({
      token: recaptchaToken,
      remoteIp,
      expectedAction: process.env.RECAPTCHA_EXPECTED_ACTION || recaptchaAction,
      minScore,
    });

    if (!recaptchaResult.ok) {
      return NextResponse.json({ error: recaptchaResult.reason }, { status: 403 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpSecure = parseBoolean(process.env.SMTP_SECURE || "true");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const from = process.env.MAIL_FROM || smtpUser;
    const to = process.env.MAIL_TO || from;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPass || !from || !to) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Please set SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS, MAIL_FROM, MAIL_TO.",
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"Synaptica Web" <${from}>`,
      to,
      replyTo: email,
      subject: `Mesaj contact - ${name || "Vizitator"}`,
      text: [
        "Ai primit un mesaj nou din formularul de contact Synaptica.",
        "",
        `Nume: ${name}`,
        `Email: ${email}`,
        `Telefon: ${phone || "-"}`,
        "",
        "Mesaj:",
        message,
        "",
        `Trimis la: ${new Date().toISOString()}`,
      ].join("\n"),
      html: `
        <h2>Mesaj nou din formularul de contact Synaptica</h2>
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefon:</strong> ${phone || "-"}</p>
        <p><strong>Mesaj:</strong></p>
        <p>${message.replace(/\n/g, "<br/>")}</p>
        <hr/>
        <p><small>Trimis la: ${new Date().toISOString()}</small></p>
      `,
    });

    await transporter.sendMail({
      from: `"Synaptica Cluj" <${from}>`,
      to: email,
      subject: "Am primit mesajul tău - Synaptica Cluj",
      text: [
        `Salut, ${name || ""}`.trim(),
        "",
        "Îți mulțumim pentru mesaj. Confirmăm că solicitarea ta a fost primită.",
        "Revenim către tine în cel mai scurt timp posibil.",
        "",
        "Cu drag,",
        "Echipa Synaptica Cluj",
      ].join("\n"),
      html: `
        <p>${name ? `Salut, ${name},` : "Salut,"}</p>
        <p>Îți mulțumim pentru mesaj. Confirmăm că solicitarea ta a fost primită.</p>
        <p>Revenim către tine în cel mai scurt timp posibil.</p>
        <p>Cu drag,<br/>Echipa Synaptica Cluj</p>
      `,
    });

    return NextResponse.json({ ok: true, confirmationSent: true });
  } catch (error) {
    console.error("Contact form send error:", error);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
