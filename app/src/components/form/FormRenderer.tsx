'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useInterfaceTexts } from '@/components/layout/InterfaceTexts';
import { ctaClass } from '@/components/ui/Cta';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/cn';
import {
  fieldError,
  fillTokens,
  toFieldRows,
  toSteps,
  type FormDefinition,
  type FormFieldDefinition,
} from '@/lib/form-fields';
import { FormField } from './fields';

/** Public half of the reCAPTCHA settings — the secret stays server-side. */
export type FormRecaptcha = {
  enabled: boolean;
  siteKey: string;
};

export type FormRendererProps = {
  form: FormDefinition;
  recaptcha?: FormRecaptcha;
  /**
   * Values the surrounding page knows and the visitor does not type — which
   * page the form was submitted from, say. A hidden field picks them up by
   * `{{token}}`.
   */
  context?: Record<string, string>;
  /** Mark required fields with an asterisk. */
  showRequiredMarks?: boolean;
  /** Reveal each row on scroll, as part of the surrounding block's cascade. */
  reveal?: boolean;
};

/** What the visitor entered for one field, read from the form itself. */
function valuesOf(form: HTMLFormElement, name: string): string[] {
  return Array.from(form.elements)
    .filter(
      (el): el is HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement =>
        'name' in el && (el as HTMLInputElement).name === name,
    )
    .filter((el) => !(el instanceof HTMLInputElement) || !['checkbox', 'radio'].includes(el.type) || el.checked)
    .map((el) => el.value);
}

/**
 * Renders any Sanity `form` — one page of fields or several steps — and posts
 * the whole thing to /api/submit-form in one request. A form with a redirect
 * sends the visitor to that page afterwards instead of showing its
 * confirmation.
 *
 * Every step stays mounted (hidden steps keep their values in the FormData).
 * Validation is the design's own: a message under each field that needs
 * attention, shown on submit (or "next"), and on leaving a field once
 * something was typed; it clears as soon as the field is fixed.
 */
export function FormRenderer({
  form,
  recaptcha,
  context,
  showRequiredMarks = true,
  reveal = false,
}: FormRendererProps) {
  const ui = useInterfaceTexts();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [step, setStep] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const steps = toSteps(form);
  const total = steps.length;
  const isLastStep = step >= total - 1;
  const usesRecaptcha = Boolean(recaptcha?.enabled && recaptcha.siteKey);
  const fields = steps.flatMap((formStep) => formStep.fields);
  const messages = { required: ui.required, invalidEmail: ui.invalidEmail };

  const errorFor = (field: FormFieldDefinition) =>
    formRef.current ? fieldError(field, valuesOf(formRef.current, field.name), messages) : '';

  const setError = (name: string, error: string) =>
    setErrors((prev) => ((prev[name] ?? '') === error ? prev : { ...prev, [name]: error }));

  /** Checks one step; shows its messages and returns the first field that needs attention. */
  function checkStep(index: number): FormFieldDefinition | undefined {
    const found = steps[index].fields.map((field) => [field, errorFor(field)] as const);
    setErrors((prev) => ({ ...prev, ...Object.fromEntries(found.map(([field, error]) => [field.name, error])) }));
    return found.find(([, error]) => error)?.[0];
  }

  function focusField(field: FormFieldDefinition) {
    formRef.current?.querySelector<HTMLElement>(`[name="${CSS.escape(field.name)}"]`)?.focus();
  }

  function goNext(event: MouseEvent<HTMLButtonElement>) {
    // This very button becomes the submit button on the last step. Its
    // activation behaviour is read after this handler runs, so without this the
    // step that setStep() just revealed is submitted by the same click.
    event.preventDefault();
    const invalid = checkStep(step);
    if (invalid) {
      setStatus(ui.checkFields);
      focusField(invalid);
      return;
    }
    setStatus('');
    setStep((current) => Math.min(current + 1, total - 1));
  }

  /** Live feedback: clear a message once fixed, show one on leaving a field with input. */
  function onFieldEvent(target: EventTarget, leaving: boolean) {
    const name = (target as HTMLInputElement).name;
    const field = fields.find((item) => item.name === name);
    if (!field) return;
    const error = errorFor(field);
    if (errors[name] && !error) setError(name, '');
    else if (leaving && error && (target as HTMLInputElement).value !== '') setError(name, error);
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    for (let index = 0; index < total; index++) {
      const invalid = checkStep(index);
      if (invalid) {
        setStep(index);
        setStatus(ui.checkFields);
        // The step may only now become visible; focus once it has rendered.
        requestAnimationFrame(() => focusField(invalid));
        return;
      }
    }

    const body = new FormData(event.currentTarget);
    body.set('formId', form.id);

    if (usesRecaptcha) {
      const token = recaptchaRef.current?.getValue();
      if (!token) {
        setStatus(ui.recaptcha);
        return;
      }
      body.set('recaptchaToken', token);
    }

    setSending(true);
    setStatus('');
    try {
      const response = await fetch('/api/submit-form', { method: 'POST', body });
      const result = (await response.json()) as { success?: boolean };
      if (!response.ok || !result.success) throw new Error('Sending failed');
      if (form.redirect) {
        // Stay "sending" so the button keeps its disabled state until the new
        // page takes over — a second submit would mail the same answers.
        if (form.redirect.internal) router.push(form.redirect.href);
        else window.location.assign(form.redirect.href);
        return;
      }
      setDone(true);
    } catch {
      // A token is single-use: clear it so a retry gets a fresh one.
      recaptchaRef.current?.reset();
      setSending(false);
      setStatus(ui.sendFailed);
    }
  }

  if (done) {
    return (
      <div role='status'>
        {form.successTitle && <p className='font-display text-h3 text-balance'>{form.successTitle}</p>}
        {form.successBody && <p className='mt-5 max-w-[34rem]'>{form.successBody}</p>}
      </div>
    );
  }

  let slot = 0;
  const row = (node: ReactNode, key: string, className?: string) =>
    reveal ? (
      <Reveal key={key} delay={slot++} className={className}>
        {node}
      </Reveal>
    ) : (
      <div key={key} className={className}>
        {node}
      </div>
    );

  const fieldProps = (field: FormFieldDefinition) => ({
    field,
    idPrefix: form.id,
    error: errors[field.name],
    star: showRequiredMarks,
  });

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      onInput={(event) => onFieldEvent(event.target, false)}
      onChange={(event) => onFieldEvent(event.target, false)}
      onBlur={(event) => onFieldEvent(event.target, true)}
      noValidate
    >
      {form.showTitle && form.title ? (
        <h3 className='mb-9 font-display text-h3 text-balance'>{form.title}</h3>
      ) : null}

      {total > 1 ? (
        <div className='mb-9 flex items-center gap-4'>
          <div className='h-0.5 flex-1 bg-fg/20'>
            <span
              className='block h-full bg-fg transition-[width] duration-500 ease-soft'
              style={{ width: `${((step + 1) / total) * 100}%` }}
            />
          </div>
          <span className='text-[0.95rem] whitespace-nowrap text-muted'>
            {ui.stepCounter.replace('{current}', String(step + 1)).replace('{total}', String(total))}
          </span>
        </div>
      ) : null}

      {steps.map((formStep, index) => (
        <div key={index} hidden={index !== step}>
          {formStep.title ? <h3 className='mb-9 font-display text-h3'>{formStep.title}</h3> : null}

          {formStep.fields
            .filter((field) => field.type === 'hidden')
            .map((field) => (
              <input
                key={field.name}
                type='hidden'
                name={field.name}
                value={fillTokens(field.defaultValue ?? '', context)}
              />
            ))}

          <div className='space-y-9'>
            {toFieldRows(formStep.fields).map((fieldRow) => {
              const key = fieldRow.map((field) => field.name).join('-');
              return fieldRow.length === 2
                ? row(
                    <div className='grid gap-9 sm:grid-cols-2 sm:gap-x-10'>
                      {fieldRow.map((field) => (
                        <FormField key={field.name} {...fieldProps(field)} />
                      ))}
                    </div>,
                    key,
                  )
                : row(<FormField {...fieldProps(fieldRow[0])} />, key);
            })}
          </div>
        </div>
      ))}

      {usesRecaptcha && isLastStep ? (
        <div className='mt-9'>
          <ReCAPTCHA ref={recaptchaRef} sitekey={recaptcha!.siteKey} />
        </div>
      ) : null}

      {row(
        <div className='flex flex-wrap items-center gap-6'>
          {step > 0 ? (
            <button
              type='button'
              onClick={() => setStep((current) => Math.max(current - 1, 0))}
              className='min-h-11 underline decoration-1 underline-offset-[6px] hover:decoration-2'
            >
              {form.backButtonText}
            </button>
          ) : null}
          {isLastStep ? (
            <button type='submit' disabled={sending} className={cn(ctaClass('solid'), 'disabled:opacity-60')}>
              {sending ? ui.sending : form.submitButtonText}
            </button>
          ) : (
            <button type='button' onClick={goNext} className={ctaClass('solid')}>
              {form.nextButtonText}
            </button>
          )}
          <p role='status' className='max-w-[22rem] text-[0.98rem] text-muted'>
            {status}
          </p>
        </div>,
        'submit',
        'mt-12',
      )}
    </form>
  );
}
