import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "equipoleviatania@gmail.com";
const NOTIFY_EMAILS = [CONTACT_EMAIL, "miguel.listoapp@gmail.com"];

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "El envío de correo no está configurado" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !email || !emailPattern.test(email)) {
    return NextResponse.json(
      { error: "Nombre y correo electrónico válidos son requeridos" },
      { status: 400 }
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: "Leviatán <notificaciones@leviatania.com>",
      to: NOTIFY_EMAILS,
      replyTo: email,
      subject: `Nueva solicitud de demo — ${name}`,
      html: `
        <h2>Nueva solicitud de demo de Leviatán</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone) || "No indicado"}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message) || "Sin mensaje adicional"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "No se pudo enviar el correo" },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "No se pudo enviar el correo" },
      { status: 500 }
    );
  }
}
