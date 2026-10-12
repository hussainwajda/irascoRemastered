"use client";

import { useState, type FormEvent } from "react";
import { useI18n } from "../i18n/LocaleProvider";
import { pick } from "../i18n/config";
import { services } from "../data/services";
import { whatsappLink } from "../data/business";
import { LIMITS, enquiryAsText, validateEnquiry, type Enquiry, type EnquiryErrors } from "../data/enquiry";
import { WhatsAppIcon } from "./icons";

type Status = "idle" | "sending" | "sent" | "not_configured" | "failed";

const EMPTY: Enquiry = { name: "", phone: "", city: "", service: "", message: "" };

/**
 * Contact form. Posts to /api/enquiry; whatever happens, the same message can
 * go out on WhatsApp, so an enquiry is never lost to a misconfigured server.
 */
export default function EnquiryForm({ defaultService = "" }: { defaultService?: string }) {
  const { t, locale } = useI18n();
  const f = t.contact.fields;
  const [values, setValues] = useState<Enquiry>({ ...EMPTY, service: defaultService });
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (key: keyof Enquiry) => (event: { target: { value: string } }) => {
    setValues((v) => ({ ...v, [key]: event.target.value }));
    if (key === "name" || key === "phone") setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    if (found.name || found.phone) {
      document.getElementById(found.name ? "enquiry-name" : "enquiry-phone")?.focus();
      return;
    }
    setStatus("sending");
    const honeypot = (event.currentTarget.elements.namedItem("company") as HTMLInputElement | null)?.value ?? "";
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, company: honeypot }),
      });
      if (res.ok) setStatus("sent");
      else setStatus(res.status === 503 ? "not_configured" : "failed");
    } catch {
      setStatus("failed");
    }
  }

  const whatsappHref = whatsappLink(enquiryAsText(values));
  const fieldClass =
    "w-full border border-(--line) bg-(--bg) px-4 py-3 text-base text-(--fg) placeholder:text-(--fg-muted)/70 focus:border-(--accent) focus:outline-none aria-[invalid=true]:border-red-600";

  if (status === "sent") {
    return (
      <div className="grid gap-3 border border-(--line) p-6" role="status">
        <p className="display text-2xl font-bold">✓</p>
        <p>
          {t.contact.success} <span className="font-mono">{values.phone}</span>
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="enquiry-name" className="text-sm font-medium">
            {f.name} *
          </label>
          <input
            id="enquiry-name"
            name="name"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={values.name}
            onChange={set("name")}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "enquiry-name-error" : undefined}
            className={fieldClass}
          />
          {errors.name && (
            <p id="enquiry-name-error" className="text-sm text-red-600">
              {t.contact.errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="enquiry-phone" className="text-sm font-medium">
            {f.phone} *
          </label>
          <input
            id="enquiry-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98XXX XXXXX"
            maxLength={20}
            value={values.phone}
            onChange={set("phone")}
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "enquiry-phone-error" : undefined}
            className={`${fieldClass} font-mono`}
          />
          {errors.phone && (
            <p id="enquiry-phone-error" className="text-sm text-red-600">
              {t.contact.errors.phone}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <label htmlFor="enquiry-city" className="text-sm font-medium">
            {f.city}
          </label>
          <input
            id="enquiry-city"
            name="city"
            autoComplete="address-level2"
            maxLength={LIMITS.city}
            value={values.city}
            onChange={set("city")}
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <label htmlFor="enquiry-service" className="text-sm font-medium">
            {f.service}
          </label>
          <select id="enquiry-service" name="service" value={values.service} onChange={set("service")} className={fieldClass}>
            <option value="">{f.servicePlaceholder}</option>
            {services.map((service) => (
              <option key={service.slug} value={service.name.en}>
                {pick(service.name, locale)}
              </option>
            ))}
            <option value="Other">{f.serviceOther}</option>
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="enquiry-message" className="text-sm font-medium">
          {f.message}
        </label>
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          maxLength={LIMITS.message}
          placeholder={f.messagePlaceholder}
          value={values.message}
          onChange={set("message")}
          className={`${fieldClass} resize-y`}
        />
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="enquiry-company">Company</label>
        <input id="enquiry-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      {(status === "not_configured" || status === "failed") && (
        <p role="alert" className="border-l-2 border-signal bg-signal/10 px-4 py-3 text-sm">
          {status === "not_configured" ? t.contact.errors.notConfigured : t.contact.errors.failed}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={status === "sending"} className="btn btn-signal disabled:opacity-60">
          {status === "sending" ? t.contact.sending : t.contact.send}
        </button>
        <a href={whatsappHref} target="_blank" rel="noopener" className="btn btn-line">
          <WhatsAppIcon />
          {t.contact.sendWhatsapp}
        </a>
      </div>
    </form>
  );
}
