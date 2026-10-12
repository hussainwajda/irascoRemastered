/** Enquiry shape and validation, shared by the form and the API route. */

export interface Enquiry {
  name: string;
  phone: string;
  city: string;
  service: string;
  message: string;
}

export const LIMITS = { name: 80, city: 60, service: 60, message: 1500 } as const;

/** Indian mobile number as 10 digits, or null. Accepts +91, 0 and spaces. */
export function normalisePhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

export type EnquiryErrors = Partial<Record<"name" | "phone", true>>;

export function validateEnquiry(input: Enquiry): EnquiryErrors {
  const errors: EnquiryErrors = {};
  if (!input.name.trim()) errors.name = true;
  if (!normalisePhone(input.phone)) errors.phone = true;
  return errors;
}

/** The same enquiry as a WhatsApp message, so nothing is lost if email fails. */
export function enquiryAsText(input: Enquiry): string {
  return [
    `Hi IRASCO, I'm ${input.name.trim()}.`,
    input.service && `Need: ${input.service}`,
    input.city && `City: ${input.city.trim()}`,
    input.message && input.message.trim(),
    `Phone: ${input.phone.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");
}
