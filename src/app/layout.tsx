import type { Metadata } from 'next';
import { Inter, Lexend } from 'next/font/google';
import { AuthProvider } from '@/lib/auth';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'CropDrive OP Advisor™ - AI-Powered Palm Oil Farm Analysis',
  description: 'Transform your palm oil farming with AI-powered soil and leaf analysis. Get instant insights, recommendations, and trend analysis for optimal farm productivity.',
  keywords: 'palm oil, AI analysis, farm management, soil analysis, leaf analysis, Malaysia, agriculture technology',
  authors: [{ name: 'CropDrive OP Advisor' }],
  creator: 'CropDrive OP Advisor',
  publisher: 'CropDrive OP Advisor',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://cropdrive.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cropdrive.com',
    title: 'CropDrive OP Advisor™ - AI-Powered Palm Oil Farm Analysis',
    description: 'Transform your palm oil farming with AI-powered soil and leaf analysis. Get instant insights, recommendations, and trend analysis for optimal farm productivity.',
    siteName: 'CropDrive OP Advisor',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'CropDrive OP Advisor - AI Farm Analysis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CropDrive OP Advisor™ - AI-Powered Palm Oil Farm Analysis',
    description: 'Transform your palm oil farming with AI-powered soil and leaf analysis.',
    images: ['/og-image.jpg'],
    creator: '@cropdrive',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${lexend.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="msapplication-TileColor" content="#22c55e" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
