import { business } from "../../data/business";
import { LIMITS, normalisePhone, validateEnquiry, type Enquiry } from "../../data/enquiry";

/**
 * Receives the contact form and emails it to IRASCO through Resend.
 *
 * Environment:
 *   RESEND_API_KEY      required to send; without it the route answers 503
 *                       and the form offers WhatsApp instead
 *   ENQUIRY_TO_EMAIL    defaults to the business email
 *   ENQUIRY_FROM_EMAIL  a sender on a domain verified in Resend
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill this field.
  if (typeof body.company === "string" && body.company.length > 0) {
    return Response.json({ ok: true });
  }

  const str = (key: string, max: number) => (typeof body[key] === "string" ? (body[key] as string).slice(0, max) : "");

  const enquiry: Enquiry = {
    name: str("name", LIMITS.name),
    phone: str("phone", 20),
    city: str("city", LIMITS.city),
    service: str("service", LIMITS.service),
    message: str("message", LIMITS.message),
  };

  const errors = validateEnquiry(enquiry);
  if (Object.keys(errors).length > 0) {
    return Response.json({ error: "invalid", fields: errors }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ENQUIRY_FROM_EMAIL;
  if (!apiKey || !from) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  const phone = normalisePhone(enquiry.phone)!;
  const text = [
    `Name: ${enquiry.name}`,
    `Phone: +91 ${phone}`,
    `City: ${enquiry.city || "-"}`,
    `Service: ${enquiry.service || "-"}`,
    "",
    enquiry.message || "(no message)",
    "",
    `WhatsApp: https://wa.me/91${phone}`,
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [process.env.ENQUIRY_TO_EMAIL || business.email],
      subject: `Website enquiry: ${enquiry.service || "General"} · ${enquiry.name}`,
      text,
    }),
  });

  if (!res.ok) {
    console.error("Enquiry email failed", res.status, await res.text().catch(() => ""));
    return Response.json({ error: "send_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
