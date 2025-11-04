import './globals.css';
import { ReactNode } from 'react';

export const metadata = { title: 'Book Review App' };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
    <body className="min-h-screen bg-gray-50 text-gray-900">
    <main className="container mx-auto p-6">
      {/* <SessionProviderWrapper> */}
        {children}
      {/* </SessionProviderWrapper> */}
    </main>
    </body>
    </html>
  );
}