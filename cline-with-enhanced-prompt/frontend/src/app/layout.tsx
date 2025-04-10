import { Providers } from './providers';

export const metadata = {
  title: 'E-Commerce Store',
  description: 'A full-featured e-commerce store',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
