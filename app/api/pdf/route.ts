import { NextRequest, NextResponse } from 'next/server';
import { buildDocumentHtml } from '@/lib/pdf/template';
import type { PaperSettings } from '@/components/pdf/PdfSettings';

export const runtime = 'nodejs';
export const maxDuration = 60;

// Allowed paper formats
const VALID_FORMATS = ['A4', 'A5', 'Letter', 'Legal'] as const;
const VALID_ORIENTATIONS = ['portrait', 'landscape'] as const;

// Max markdown size: 2 MB
const MAX_MARKDOWN_SIZE = 2 * 1024 * 1024;

export async function POST(req: NextRequest) {
  let markdown: string;
  let settings: PaperSettings;

  try {
    const body = await req.json();
    markdown = body.markdown;
    settings = body.settings;
  } catch {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  // Validation
  if (typeof markdown !== 'string' || !markdown.trim()) {
    return NextResponse.json({ error: 'markdown is required' }, { status: 400 });
  }
  if (Buffer.byteLength(markdown, 'utf8') > MAX_MARKDOWN_SIZE) {
    return NextResponse.json({ error: 'Markdown too large (max 2 MB)' }, { status: 400 });
  }
  if (settings.format && !VALID_FORMATS.includes(settings.format)) {
    return NextResponse.json({ error: 'Invalid format' }, { status: 400 });
  }
  if (settings.orientation && !VALID_ORIENTATIONS.includes(settings.orientation)) {
    return NextResponse.json({ error: 'Invalid orientation' }, { status: 400 });
  }

  try {
    // Dynamically import puppeteer to avoid edge runtime issues
    const puppeteer = await import('puppeteer');
    const browser = await puppeteer.default.launch({
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--font-render-hinting=none',
      ],
    });

    try {
      const page = await browser.newPage();

      // Build full HTML with KaTeX, Mermaid SVG inline, and custom CSS
      const html = await buildDocumentHtml(markdown, settings, settings.customCss ?? '');

      await page.setContent(html, {
        waitUntil: 'load',
        timeout: 30000,
      });

      // Wait for Mermaid rendering script inside Puppeteer page to finish
      await page.waitForFunction(() => (window as any).__MERMAID_DONE__ === true, {
        timeout: 10000,
      }).catch(() => {
        // Fallback delay if timeout reached
      });

      // Extra short delay for layout and SVG rendering to settle
      await new Promise((resolve) => setTimeout(resolve, 300));

      const pdfBuffer = await page.pdf({
        format: settings.format ?? 'A4',
        landscape: settings.orientation === 'landscape',
        margin: {
          top: settings.margin?.top ?? '20mm',
          right: settings.margin?.right ?? '20mm',
          bottom: settings.margin?.bottom ?? '20mm',
          left: settings.margin?.left ?? '20mm',
        },
        printBackground: true,
        displayHeaderFooter: !!(settings.header || settings.footer || settings.pageNumbers),
        headerTemplate: settings.header
          ? `<div style="font-size:9pt;color:#64748b;text-align:center;width:100%;padding:4mm 20mm;border-bottom:1px solid #e2e8f0;">${settings.headerText ?? ''}</div>`
          : '<span></span>',
        footerTemplate:
          settings.footer || settings.pageNumbers
            ? `<div style="font-size:9pt;color:#64748b;text-align:center;width:100%;padding:4mm 20mm;border-top:1px solid #e2e8f0;">${settings.footerText ?? ''}${settings.pageNumbers ? ' <span class="pageNumber"></span>/<span class="totalPages"></span>' : ''}</div>`
            : '<span></span>',
      });

      await page.close();
      await browser.close();

      const buffer = Buffer.from(pdfBuffer);
      return new NextResponse(buffer, {
        status: 200,
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'attachment; filename="document.pdf"',
          'Content-Length': String(buffer.length),
        },
      });
    } catch (innerErr) {
      await browser.close();
      throw innerErr;
    }
  } catch (err) {
    console.error('[PDF API] Error:', err);
    return NextResponse.json(
      { error: 'PDF generation failed. Please try again.' },
      { status: 500 }
    );
  }
}
