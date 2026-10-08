import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import type { FormFieldDefinition } from '@/lib/form-fields';

const controlClass = cn(
  'block w-full rounded-none border-0 border-b border-fg/45 bg-transparent px-[.15rem] py-[.7rem] text-fg',
  'transition-[background-color,border-color] duration-200',
  'placeholder:text-muted placeholder:opacity-70',
  'focus:border-b-fg focus:bg-accent focus:shadow-[0_1px_0_0_var(--color-fg)] focus:outline-none',
  'aria-invalid:border-b-danger aria-invalid:shadow-[0_1px_0_0_var(--color-danger)]',
);
const labelClass = 'block text-[0.98rem] text-muted';
const choiceClass = 'flex min-h-11 cursor-pointer items-start gap-[.9rem] py-[.45rem]';
const choiceInputClass = 'mt-[.4rem] size-5 flex-none cursor-pointer accent-fg';

/**
 * The dropdown chevron, drawn with two gradients so it needs no asset. Built
 * from the theme's `--color-muted`, so recolouring the theme recolours it.
 */
const selectCaret = {
  backgroundImage:
    'linear-gradient(45deg,transparent 50%,var(--color-muted) 50%),linear-gradient(135deg,var(--color-muted) 50%,transparent 50%)',
  backgroundPosition: 'calc(100% - 15px) 50%, calc(100% - 9px) 50%',
  backgroundSize: '6px 6px, 6px 6px',
  backgroundRepeat: 'no-repeat',
} as const;

/** Turns `[label](href)` in editor copy into a real link. */
export function linkify(text: string): ReactNode {
  const parts = text.split(/\[([^\]]+)\]\(([^)]+)\)/g);
  if (parts.length === 1) return text;

  const nodes: ReactNode[] = [];
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) nodes.push(parts[i]);
    if (parts[i + 1]) {
      nodes.push(
        <Link key={i} href={parts[i + 2]} className='underline underline-offset-[3px]'>
          {parts[i + 1]}
        </Link>,
      );
    }
  }
  return nodes;
}

function Star() {
  return <span aria-hidden='true'> *</span>;
}

type FormFieldProps = {
  field: FormFieldDefinition;
  idPrefix: string;
  error?: string;
  /** Mark required fields with an asterisk. */
  star?: boolean;
};

/**
 * One field as the design draws it: a label above an underlined input, the
 * help text and the error message below. Radios and several checkboxes are a
 * fieldset with the label as legend; a single checkbox is its own label.
 */
export function FormField({ field, idPrefix, error, star = true }: FormFieldProps) {
  // Hidden fields are drawn by the renderer itself — it is the only place that
  // knows the page context their value is filled from.
  if (field.type === 'hidden') return null;

  const id = `${idPrefix}-${field.name}`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const marked = star && field.isRequired;
  const describedBy = [field.helpText && helpId, field.isRequired && errorId].filter(Boolean).join(' ') || undefined;
  const invalid = error ? true : undefined;

  const help = field.helpText ? (
    <p id={helpId} className='mt-1 text-[0.95rem] text-muted'>
      {linkify(field.helpText)}
    </p>
  ) : null;
  const message = field.isRequired ? (
    <p id={errorId} className='mt-[.45rem] text-[.98rem] text-danger' hidden={!error}>
      {error}
    </p>
  ) : null;

  if (field.type === 'radio' || field.type === 'checkbox') {
    const options = (field.type === 'radio' ? field.radioOptions : field.checkboxOptions) ?? [];
    const single = field.type === 'checkbox' && options.length === 1;
    const choices = options.map((option) => (
      <label key={option} className={choiceClass}>
        <input
          type={field.type}
          name={field.name}
          value={option}
          aria-invalid={single ? invalid : undefined}
          aria-describedby={single ? describedBy : undefined}
          className={choiceInputClass}
        />
        <span>
          {linkify(option)}
          {single && marked && <Star />}
        </span>
      </label>
    ));

    return single ? (
      <div>
        {choices}
        {help}
        {message}
      </div>
    ) : (
      <fieldset className='min-w-0' aria-describedby={describedBy} aria-invalid={invalid}>
        <legend className={labelClass}>
          {field.label}
          {marked && <Star />}
        </legend>
        <div className='mt-1'>{choices}</div>
        {help}
        {message}
      </fieldset>
    );
  }

  const control = {
    id,
    name: field.name,
    placeholder: field.placeholder,
    'aria-required': field.isRequired || undefined,
    'aria-invalid': invalid,
    'aria-describedby': describedBy,
  };

  return (
    <div>
      <label htmlFor={id} className={labelClass}>
        {field.label}
        {marked && <Star />}
      </label>
      {field.type === 'textarea' ? (
        <textarea {...control} rows={5} className={cn(controlClass, 'resize-y')} />
      ) : field.type === 'select' ? (
        <select
          {...control}
          // With a placeholder the empty option is the initial value, so a
          // required dropdown actually blocks submitting; without one the
          // browser preselects the first real option.
          defaultValue={field.placeholder ? '' : undefined}
          style={selectCaret}
          className={cn(controlClass, 'cursor-pointer appearance-none pr-8')}
        >
          {field.placeholder ? <option value=''>{field.placeholder}</option> : null}
          {(field.selectOptions ?? []).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input
          {...control}
          type={field.type}
          inputMode={field.type === 'tel' ? 'tel' : undefined}
          autoComplete={AUTOCOMPLETE[field.type]}
          className={controlClass}
        />
      )}
      {help}
      {message}
    </div>
  );
}

const AUTOCOMPLETE: Partial<Record<FormFieldDefinition['type'], string>> = {
  email: 'email',
  tel: 'tel',
};
