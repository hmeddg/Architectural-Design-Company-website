"use server";

import {
  emptyContactValues,
  validateContact,
  type ContactState,
  type ContactValues,
} from "@/app/lib/contact-schema";

/**
 * Contact form Server Action. Every export of this module must be an async
 * function, so the types, initial state and validator live in
 * app/lib/contact-schema.ts.
 *
 * DELIVERY: set CONTACT_WEBHOOK_URL and the validated payload is POSTed there
 * (Formspree, Resend, a Slack/Teams incoming webhook, your own route — anything
 * accepting JSON). With the variable unset the submission is validated and
 * logged server-side only: nothing is emailed. Replace `deliver` with your
 * transport when wiring this up for real.
 */

async function deliver(values: ContactValues) {
  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    console.info("[contact] no CONTACT_WEBHOOK_URL set; submission not delivered", {
      name: values.name,
      email: values.email,
    });
    return;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error(`Contact webhook responded ${response.status}`);
  }
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const values: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const errors = validateContact(values);

  if (Object.keys(errors).length > 0) {
    return {
      status: "error",
      message: "Your message could not be sent.",
      errors,
      values,
    };
  }

  try {
    await deliver(values);
  } catch (error) {
    console.error("[contact] delivery failed", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again, or email us directly.",
      errors: {},
      values,
    };
  }

  return {
    status: "success",
    message: "Thank you — we have your enquiry and will reply within two working days.",
    errors: {},
    values: emptyContactValues,
  };
}
