/**
 * Contact form shape + validation.
 *
 * Kept out of the "use server" module on purpose: every export of a Server
 * Action file must be an async function, so types, the initial state and the
 * synchronous validator live here. Shared by the action and the client form, so
 * both enforce exactly the same rules.
 */

export type ContactField = "name" | "email" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message: string;
  errors: Partial<Record<ContactField, string>>;
  /** Echoed back so a failed submit does not wipe what was typed. */
  values: ContactValues;
};

export const emptyContactValues: ContactValues = { name: "", email: "", message: "" };

export const initialContactState: ContactState = {
  status: "idle",
  message: "",
  errors: {},
  values: emptyContactValues,
};

/** Deliberately permissive: one @, a dot in the domain, no whitespace. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateField(field: ContactField, value: string): string | undefined {
  switch (field) {
    case "name":
      return value.trim().length < 2 ? "Enter your full name." : undefined;
    case "email":
      if (!value.trim()) return "Enter an email address.";
      return EMAIL.test(value.trim())
        ? undefined
        : "Enter an email address in the format name@example.com.";
    case "message":
      return value.trim().length < 10
        ? "Tell us a little about the project — at least 10 characters."
        : undefined;
  }
}

export function validateContact(values: ContactValues) {
  const errors: Partial<Record<ContactField, string>> = {};

  for (const field of ["name", "email", "message"] as const) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }

  return errors;
}
