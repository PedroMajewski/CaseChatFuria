import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from '@/components/layout/Header';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Furia Fan Zone',
  description: 'Your central hub for everything FURIA CS:GO',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark"> {/* Force dark theme */}
      <body className={cn(
        geistSans.variable,
        geistMono.variable,
        "antialiased font-sans"
      )}>
        <div className="flex flex-col min-h-screen">
          <Header /> {/* Add the Header */}
          <main className="flex-grow">
            {children}
          </main>
          {/* You can add a Footer component here later if needed */}
        </div>
        <Toaster /> {/* Add the Toaster for notifications */}
      </body>
    </html>
  );
}
