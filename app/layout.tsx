import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0b0f19' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://markdown2pdf.app'),
  title: {
    default: 'Markdown2PDF — Professional Markdown to PDF Converter',
    template: '%s | Markdown2PDF',
  },
  description:
    'Free and powerful online Markdown to PDF converter with live preview, Mermaid.js diagrams, KaTeX formulas, syntax highlighting, scroll sync, and custom page formatting.',
  applicationName: 'Markdown2PDF',
  authors: [{ name: 'Markdown2PDF Team' }],
  generator: 'Next.js',
  keywords: [
    'Markdown to PDF',
    'Convert Markdown to PDF',
    'Mermaid to PDF',
    'KaTeX Math to PDF',
    'Markdown Editor',
    'Live Preview',
    'Scroll Sync',
    'Dark Mode Markdown',
    'Developer Documentation PDF',
    'Academic Paper Markdown',
  ],
  creator: 'Markdown2PDF',
  publisher: 'Markdown2PDF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Markdown2PDF — Professional Markdown to PDF Converter',
    description:
      'Transform your Markdown into publication-grade PDFs in real time with Mermaid diagrams, LaTeX math, code highlighting, and custom paper layouts.',
    url: 'https://markdown2pdf.app',
    siteName: 'Markdown2PDF',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown2PDF — Professional Markdown to PDF Converter',
    description:
      'Transform your Markdown into publication-grade PDFs in real time with Mermaid diagrams, LaTeX math, code highlighting, and custom paper layouts.',
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

import { ThemeProvider } from '@/components/theme-provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
