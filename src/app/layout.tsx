import { Metadata } from 'next';
import { ReactNode } from 'react';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: {
    template: '%s | Expendo Mobility Admin',
    default: 'Admin',
  },
  description: 'Expendo Mobility Admin dashboard',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
