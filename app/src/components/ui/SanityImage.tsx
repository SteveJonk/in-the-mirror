import Image from '@/components/ui/Image';

export type CmsImage =
  | { alt: string | null; src: string | null; width: number | null; height: number | null }
  | null
  | undefined;

type SanityImageProps = {
  image: CmsImage;
  sizes?: string;
  className?: string;
  priority?: boolean;
  /** Fill the (positioned) parent instead of keeping the image's own size. */
  fill?: boolean;
  /** Override the alt text, e.g. '' when the parent already describes it. */
  alt?: string;
};

/**
 * An image from Sanity. Photos are resized by the Sanity CDN; SVG
 * illustrations and icons are served as they are.
 */
export function SanityImage({ image, sizes, className, priority, fill, alt }: SanityImageProps) {
  if (!image?.src) return null;
  const description = alt ?? image.alt ?? '';
  const common = {
    src: image.src,
    sizes,
    priority,
    className,
    unoptimized: image.src.toLowerCase().endsWith('.svg'),
  };
  return fill ? (
    <Image {...common} alt={description} fill />
  ) : (
    <Image {...common} alt={description} width={image.width ?? 1200} height={image.height ?? 800} />
  );
}
