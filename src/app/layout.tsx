import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/material-tailwind';
import SessionProviderWrapper from './SessionProviderWrapper';

export const metadata: Metadata = {
  title: 'Khus Perpus',
  description: 'Website perpustakaan untuk kebutuhan buku anda',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-blue-gray-50">
      <ThemeProvider>
        <SessionProviderWrapper>
          <body>{children}</body>
        </SessionProviderWrapper>
      </ThemeProvider>
    </html>
  );
}
