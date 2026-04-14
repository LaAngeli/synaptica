import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const requiredFields = ["name", "email", "message"];

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeString(value, maxLen = 2000) {
  if (value == null) return "";
  return String(value).trim().slice(0, maxLen);
}

function parseBoolean(value) {
  if (typeof value !== "string") return false;
  return value.toLowerCase() === "true";
}

export async function POST(request) {
  try {
    const payload = await request.json();

    const missing = requiredFields.filter((field) => !payload?.[field]);
    if (missing.length) {
      return NextResponse.json(
        { error: `Missing fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const name = safeString(payload.name, 120);
    const email = safeString(payload.email, 254);
    const phone = safeString(payload.phone, 60);
    const message = safeString(payload.message, 5000);

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
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
