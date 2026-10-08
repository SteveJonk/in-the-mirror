'use client';

import {
  createContext,
  useContext,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { ctaClass } from '@/components/ui/Cta';

/*
 * A hand-built form with the design's validation: a field is required when it
 * carries `data-req` (its message), an e-mail field also checks the format.
 * Errors show on submit, and on blur once something was typed; they clear as
 * soon as the field is fixed. Nothing is sent yet — that comes with Sanity.
 */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** The error for one `[data-req]` element, or '' when it is fine. */
export function message(el: Element): string {
  const req = el.getAttribute('data-req') ?? '';
  if (el instanceof HTMLFieldSetElement) return el.querySelector('input:checked') ? '' : req;
  if (el instanceof HTMLInputElement && el.type === 'checkbox') return el.checked ? '' : req;
  const value = (el as HTMLInputElement).value.trim();
  if (!value) return req;
  if ((el as HTMLInputElement).type === 'email' && !EMAIL.test(value)) {
    return el.getAttribute('data-invalid') || req;
  }
  return '';
}

type FormState = {
  errors: Record<string, string>;
  setError: (name: string, error: string) => void;
  status: string;
};

const FormContext = createContext<FormState>({ errors: {}, setError: () => {}, status: '' });

export const useFormField = (name: string) => {
  const { errors, setError } = useContext(FormContext);
  return { error: errors[name] ?? '', setError: (error: string) => setError(name, error) };
};

export function Form({
  success = 'Bedankt voor je bericht. (Prototype: er is nog niets verstuurd.)',
  className,
  children,
}: {
  success?: string;
  className?: string;
  children: ReactNode;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState('');

  const setError = (name: string, error: string) =>
    setErrors((prev) => (prev[name] === error ? prev : { ...prev, [name]: error }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const invalid = [...form.querySelectorAll('[data-req]')].filter((el) => message(el));
    setErrors(Object.fromEntries(invalid.map((el) => [el.getAttribute('name'), message(el)])));

    const first = invalid[0];
    if (first) {
      setStatus('Controleer de gemarkeerde velden.');
      (first instanceof HTMLFieldSetElement ? first.querySelector('input') : (first as HTMLElement))?.focus();
      return;
    }
    setStatus(success);
    form.reset();
  };

  return (
    <FormContext.Provider value={{ errors, setError, status }}>
      <form noValidate onSubmit={onSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
}

/** The submit button with the form's status line beside it. */
export function Submit({ children }: { children: ReactNode }) {
  const { status } = useContext(FormContext);
  return (
    <div className='flex flex-wrap items-center gap-6'>
      <button type='submit' className={ctaClass('solid')}>
        {children}
      </button>
      <p role='status' className='max-w-[22rem] text-[0.98rem] text-muted'>
        {status}
      </p>
    </div>
  );
}
