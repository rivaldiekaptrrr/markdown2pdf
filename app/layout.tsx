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

const APP_URL = 'https://markdown2pdf.my.id';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  alternates: {
    canonical: APP_URL,
  },
  title: {
    default: 'Markdown2PDF — Free Online Markdown to PDF Converter',
    template: '%s | Markdown2PDF',
  },
  description:
    'Free online Markdown to PDF converter with live preview, Mermaid.js diagrams, KaTeX math formulas, syntax highlighting, and custom page layouts.',
  applicationName: 'Markdown2PDF',
  authors: [{ name: 'Markdown2PDF Team' }],
  generator: 'Next.js',
  keywords: [
    'Markdown to PDF',
    'Markdown to PDF online',
    'Convert Markdown to PDF',
    'free Markdown PDF converter',
    'Markdown PDF online free',
    'Mermaid diagram to PDF',
    'KaTeX Math to PDF',
    'Markdown Editor online',
    'live preview Markdown',
    'Scroll Sync Markdown',
    'Dark Mode Markdown editor',
    'Developer Documentation PDF',
    'Academic Paper Markdown',
    'export Markdown as PDF',
  ],
  creator: 'Markdown2PDF',
  publisher: 'Markdown2PDF',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Markdown2PDF — Free Online Markdown to PDF Converter',
    description:
      'Convert Markdown to PDF online for free. Real-time preview, Mermaid diagrams, KaTeX math, syntax highlighting & custom CSS.',
    url: APP_URL,
    siteName: 'Markdown2PDF',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown2PDF — Free Online Markdown to PDF Converter',
    description:
      'Convert Markdown to PDF online for free. Real-time preview, Mermaid diagrams, KaTeX math, syntax highlighting & custom CSS.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Markdown2PDF',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Web',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              url: 'https://markdown2pdf.my.id',
              description:
                'Free online Markdown to PDF converter with live preview, Mermaid.js diagrams, KaTeX math expressions, syntax highlighting, and custom page formatting.',
              featureList: [
                'Real-Time Live Preview with Scroll Sync',
                'Mermaid.js Diagram Rendering (Flowchart, Sequence, Gantt)',
                'KaTeX Math Expression Support',
                'Custom Paper Size (A4, Letter, Legal, A5)',
                'Privacy First & Zero Data Retention',
                'GitHub Flavored Markdown (GFM)',
                'Syntax Highlighting via Shiki',
              ],
              screenshot: 'https://markdown2pdf.my.id/og-image.png',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                ratingCount: '127',
              },
            }),
          }}
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
