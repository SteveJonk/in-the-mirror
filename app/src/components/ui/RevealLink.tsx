'use client';

import type { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';

/**
 * A <Reveal> that is a Next link. Its own component because a server
 * component cannot hand `as={Link}` across to the client.
 */
export function RevealLink(props: Omit<ComponentPropsWithoutRef<typeof Reveal<typeof Link>>, 'as'>) {
  return <Reveal as={Link} {...props} />;
}
