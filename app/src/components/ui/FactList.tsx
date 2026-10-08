import { cn } from '@/lib/cn';

export type Fact = { label: string; value: string };

/** Label / value rows between hairlines (programme, price, region…). */
export function FactList({ facts, className }: { facts: Fact[]; className?: string }) {
  return (
    <dl className={cn('max-w-[34rem] divide-y divide-line border-y border-line text-[1.05rem]', className)}>
      {facts.map((fact) => (
        <div key={fact.label} className='flex justify-between gap-8 py-4'>
          <dt className='text-muted'>{fact.label}</dt>
          <dd className='text-right'>{fact.value}</dd>
        </div>
      ))}
    </dl>
  );
}
