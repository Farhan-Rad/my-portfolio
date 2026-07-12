import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import { SmoothScrollProvider } from '@/components/animations/SmoothScrollProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { LoadingScreen } from '@/components/layout/LoadingScreen';
import { ScrollProgress } from '@/components/layout/ScrollProgress';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FarhanR - Portfolio',
  description: 'Full Stack Developer & Designer passionate about creating beautiful, functional digital experiences',
  keywords: ['developer', 'designer', 'portfolio', 'frontend', 'full stack'],
  openGraph: {
    title: 'FarhanR - Portfolio',
    description: 'Full Stack Developer & Designer',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fontVar = [geistSans.variable, geistMono.variable].join(' ');

  return (
    <html lang="en" className={fontVar} suppressHydrationWarning>
      <body className="min-h-screen overflow-x-hidden bg-background font-sans antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <LoadingScreen />
            <Navbar />
            <ScrollProgress />
            <main>{children}</main>
            <Footer />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
