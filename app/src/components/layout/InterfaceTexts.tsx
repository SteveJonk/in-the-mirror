'use client';

import { createContext, useContext, type ReactNode } from 'react';
import type { InterfaceTexts } from '@/lib/site';

const Context = createContext<InterfaceTexts | null>(null);

/** Hands the interface texts from Site information to the client components that need them. */
export function InterfaceTextsProvider({ value, children }: { value: InterfaceTexts; children: ReactNode }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useInterfaceTexts(): InterfaceTexts {
  const value = useContext(Context);
  if (!value) throw new Error('useInterfaceTexts must be used inside <InterfaceTextsProvider>');
  return value;
}
