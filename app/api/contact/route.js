import { NextResponse } from "next/server";

const requiredFields = ["name", "email", "message"];

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function safeString(value, maxLen = 2000) {
  if (value == null) return "";
  return String(value).trim().slice(0, maxLen);
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

    const apiKey = process.env.SENDGRID_API_KEY;
    const to = process.env.SENDGRID_TO;
    const from = process.env.SENDGRID_FROM || to;
    const templateId = process.env.SENDGRID_TEMPLATE_ID;

    if (!apiKey || !to || !from || !templateId) {
      return NextResponse.json(
        {
          error:
            "Email service not configured. Please set SENDGRID_API_KEY, SENDGRID_TO, SENDGRID_FROM, SENDGRID_TEMPLATE_ID.",
        },
        { status: 500 }
      );
    }

    // Dynamic template request body (valid for SendGrid v3/mail/send)
    const body = {
      personalizations: [
        {
          to: [{ email: to }],
          subject: `Mesaj contact - ${name || "Vizitator"}`,
          dynamic_template_data: {
            name,
            email,
            phone: phone || "-",
            message,
            submittedAt: new Date().toISOString(),
            // Optional metadata
            clinicName: "Synaptica Cluj",
          },
        },
      ],
      from: { email: from, name: "Synaptica Web" },
      template_id: templateId,
    };

    const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const text = await response.text();

      console.error("SendGrid error status:", response.status);
      console.error("SendGrid error body:", text);

      return NextResponse.json(
        {
          error: "Failed to send message",
          sendgridStatus: response.status,
          sendgridResponse: text,
        },
        { status: 502 }
      );
    }


    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}
