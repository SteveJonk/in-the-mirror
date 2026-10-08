import Image from '@/components/ui/Image';
import { cn } from '@/lib/cn';

/** Intrinsic size (from each file's viewBox) of the illustrations in public/illustrations. */
const SIZES = {
  'bericht-verstuurd': [738, 735],
  contact: [1096, 575],
  'drie-silhouetten': [1111, 590],
  gesprek: [1161, 712],
  groep: [1138, 860],
  keuze: [1057, 679],
  luisteren: [943, 789],
  'meditatie-tablet': [1057, 784],
  mediteren: [985, 693],
  podcast: [1140, 776],
  'samen-in-gesprek': [1142, 781],
  trap: [1168, 756],
} as const;

export type IllustrationName = keyof typeof SIZES;

/** One of the line illustrations, centred and capped by `className` (e.g. `max-w-[20rem]`). */
export function Illustration({
  name,
  alt,
  className,
}: {
  name: IllustrationName;
  alt: string;
  className?: string;
}) {
  const [width, height] = SIZES[name];
  return (
    <Image
      src={`/illustrations/${name}.svg`}
      width={width}
      height={height}
      alt={alt}
      unoptimized
      className={cn('mx-auto h-auto w-full', className)}
    />
  );
}
