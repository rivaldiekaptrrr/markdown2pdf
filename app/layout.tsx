import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Markdown2PDF — Write, Preview & Export',
  description:
    'Convert Markdown to beautiful PDF with real-time preview, Mermaid diagrams, KaTeX math, syntax highlighting, and custom page settings.',
  openGraph: {
    title: 'Markdown2PDF',
    description: 'Write Markdown, see it live, export as professional PDF.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Markdown2PDF',
    description: 'Write Markdown, see it live, export as professional PDF.',
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
