'use client';

import type { ReactNode } from 'react';
import { message, useFormField } from '@/components/form/Form';
import { cn } from '@/lib/cn';

const fieldClass = cn(
  'block w-full rounded-none border-0 border-b border-fg/45 bg-transparent px-[.15rem] py-[.7rem] text-fg',
  'transition-[background-color,border-color] duration-200',
  'placeholder:text-muted placeholder:opacity-70',
  'focus:border-b-fg focus:bg-accent focus:shadow-[0_1px_0_0_var(--color-fg)] focus:outline-none',
  'aria-invalid:border-b-danger aria-invalid:shadow-[0_1px_0_0_var(--color-danger)]',
);
const labelClass = 'block text-[0.98rem] text-muted';
const choiceClass = 'flex min-h-11 cursor-pointer items-start gap-[.9rem] py-[.45rem]';
const choiceInputClass = 'mt-[.4rem] size-5 flex-none cursor-pointer accent-fg';

function Star() {
  return <span aria-hidden='true'> *</span>;
}

function FieldError({ name, error }: { name: string; error: string }) {
  return (
    <p id={`e-${name}`} className='mt-[.45rem] text-[.98rem] text-danger' hidden={!error}>
      {error}
    </p>
  );
}

type TextFieldProps = {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'tel' | 'date' | 'time';
  /** Error message when empty; makes the field required. */
  required?: string;
  /** Error message for a malformed e-mail address. */
  invalid?: string;
  /** Show the asterisk after the label. */
  star?: boolean;
  /** Render a textarea with this many rows. */
  rows?: number;
  hint?: string;
  autoComplete?: string;
  inputMode?: 'tel';
};

export function TextField({
  name,
  label,
  type = 'text',
  required,
  invalid,
  star = false,
  rows,
  hint,
  autoComplete,
  inputMode,
}: TextFieldProps) {
  const { error, setError } = useFormField(name);
  const id = `f-${name}`;
  const describedBy = [required && `e-${name}`, hint && `h-${name}`].filter(Boolean).join(' ');
  const props = {
    id,
    name,
    autoComplete,
    'aria-required': required ? true : undefined,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': describedBy || undefined,
    'data-req': required,
    'data-invalid': invalid,
    onInput: (e: { currentTarget: Element }) => error && !message(e.currentTarget) && setError(''),
    onBlur: (e: { currentTarget: HTMLInputElement | HTMLTextAreaElement }) => {
      const msg = required ? message(e.currentTarget) : '';
      if (e.currentTarget.value !== '' && msg) setError(msg);
    },
  };

  return (
    <>
      <label htmlFor={id} className={labelClass}>
        {label}
        {star && <Star />}
      </label>
      {rows ? (
        <textarea {...props} rows={rows} className={cn(fieldClass, 'resize-y')} />
      ) : (
        <input {...props} type={type} inputMode={inputMode} className={fieldClass} />
      )}
      {hint && (
        <p id={`h-${name}`} className='mt-1 text-[0.95rem] text-muted'>
          {hint}
        </p>
      )}
      {required && <FieldError name={name} error={error} />}
    </>
  );
}

export function ChoiceGroup({
  name,
  legend,
  required,
  options,
}: {
  name: string;
  legend: string;
  required: string;
  options: { value: string; label: ReactNode }[];
}) {
  const { error, setError } = useFormField(name);
  return (
    <fieldset
      name={name}
      data-req={required}
      aria-describedby={`e-${name}`}
      className='min-w-0'
      onChange={(e) => error && !message(e.currentTarget) && setError('')}
    >
      <legend className='text-[0.98rem] text-muted'>
        {legend}
        <Star />
      </legend>
      <div className='mt-1'>
        {options.map((option) => (
          <label key={option.value} className={choiceClass}>
            <input type='radio' name={name} value={option.value} className={choiceInputClass} />
            <span>{option.label}</span>
          </label>
        ))}
      </div>
      <FieldError name={name} error={error} />
    </fieldset>
  );
}

export function Checkbox({
  name,
  required,
  children,
}: {
  name: string;
  required: string;
  children: ReactNode;
}) {
  const { error, setError } = useFormField(name);
  return (
    <>
      <label className={choiceClass}>
        <input
          id={`f-${name}`}
          type='checkbox'
          name={name}
          data-req={required}
          aria-required='true'
          aria-describedby={`e-${name}`}
          className={choiceInputClass}
          onChange={(e) => error && !message(e.currentTarget) && setError('')}
        />
        <span>
          {children}
          <Star />
        </span>
      </label>
      <FieldError name={name} error={error} />
    </>
  );
}
