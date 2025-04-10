'use client';

import { ReactNode } from 'react';
import { AppProvider } from '../lib/AppContext';

export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
};
