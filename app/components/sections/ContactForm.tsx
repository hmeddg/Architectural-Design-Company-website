"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { submitContact } from "@/app/actions/contact";
import { contactSection } from "@/app/data/content";
import {
  emptyContactValues,
  initialContactState,
  validateField,
  type ContactField,
} from "@/app/lib/contact-schema";
import { cx } from "@/app/lib/cx";
import styles from "./contact-form.module.css";

const FIELDS: ContactField[] = ["name", "email", "message"];

const LABELS: Record<ContactField, { label: string; placeholder: string }> = {
  name: contactSection.form.fields.name,
  email: contactSection.form.fields.email,
  message: contactSection.form.fields.message,
};

/**
 * Contact Form (76:9) — 600x500. Three underline fields (76:10, 76:14, 80:2),
 * a 232x56 submit (76:18) and the note beneath (76:20).
 *
 * Validation follows the rules the design system flags as High severity: a
 * visible label per field (never placeholder-only), validation on blur, an
 * inline error bound to its input with aria-describedby, and a focusable
 * role="alert" summary on failed submit that links to each invalid field.
 */
export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialContactState);
  const [values, setValues] = useState(emptyContactValues);
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [seenResult, setSeenResult] = useState(state);
  const summaryRef = useRef<HTMLDivElement>(null);

  // Clear the form once the server confirms it went through. Adjusted during
  // render rather than in an effect — the sanctioned pattern for reacting to a
  // new incoming value, and it avoids a cascading re-render.
  if (state !== seenResult) {
    setSeenResult(state);
    if (state.status === "success") {
      setValues(emptyContactValues);
      setTouched({});
    }
  }

  // Send keyboard and screen-reader users straight to the problem. Moving focus
  // is a DOM side effect, so this one genuinely belongs in an effect.
  useEffect(() => {
    if (state.status === "error") {
      summaryRef.current?.focus();
    }
  }, [state]);

  /** Once a field has been blurred it validates live, so errors clear as typed. */
  function errorFor(field: ContactField) {
    return touched[field] ? validateField(field, values[field]) : state.errors[field];
  }

  const invalid = FIELDS.filter((field) => errorFor(field));
  const showSummary = state.status === "error" && invalid.length > 0;

  return (
    <form action={formAction} className={styles.form} noValidate>
      {showSummary ? (
        <div
          ref={summaryRef}
          className={styles.summary}
          role="alert"
          tabIndex={-1}
          aria-labelledby="contact-summary-title"
        >
          <h3 id="contact-summary-title" className={styles.summaryTitle}>
            There is a problem
          </h3>
          <ul className={styles.summaryList}>
            {invalid.map((field) => (
              <li key={field}>
                <Link href={`#contact-${field}`} className={styles.summaryLink}>
                  {errorFor(field)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {state.status === "success" ? (
        <p className={styles.success} role="status">
          {state.message}
        </p>
      ) : null}

      {FIELDS.map((field) => {
        const error = errorFor(field);
        const id = `contact-${field}`;
        const errorId = `${id}-error`;
        const multiline = field === "message";

        const shared = {
          id,
          name: field,
          value: values[field],
          placeholder: LABELS[field].placeholder,
          "aria-invalid": error ? true : undefined,
          "aria-describedby": error ? errorId : undefined,
          className: cx(styles.input, error && styles.inputError),
          onChange: (
            event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
          ) => setValues((prev) => ({ ...prev, [field]: event.target.value })),
          onBlur: () => setTouched((prev) => ({ ...prev, [field]: true })),
        };

        return (
          <div key={field} className={cx(styles.field, multiline && styles.fieldWide)}>
            <label htmlFor={id} className={styles.label}>
              {LABELS[field].label}
            </label>

            {multiline ? (
              <textarea {...shared} rows={3} />
            ) : (
              <input
                {...shared}
                type={field === "email" ? "email" : "text"}
                autoComplete={field === "email" ? "email" : "name"}
              />
            )}

            {error ? (
              <p id={errorId} className={styles.error}>
                {error}
              </p>
            ) : null}
          </div>
        );
      })}

      <button type="submit" className={styles.submit} disabled={isPending}>
        {isPending ? contactSection.form.submitting : contactSection.form.submit}
      </button>

      <p className={styles.note}>{contactSection.form.note}</p>
    </form>
  );
}
