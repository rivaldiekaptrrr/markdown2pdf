import type { PaperSettings } from '@/components/pdf/PdfSettings';
import { extractMermaid, reinsertMermaid } from '@/lib/mermaid/renderer';
import { parseMarkdown } from '@/lib/markdown/parser';

/**
 * Build the complete self-contained HTML document that Puppeteer will render.
 * This is also used by the client preview to ensure WYSIWYP fidelity.
 */
export async function buildDocumentHtml(
  markdown: string,
  settings: PaperSettings,
  customCss: string = ''
): Promise<string> {
  const { replaced, diagrams } = extractMermaid(markdown);
  let html = await parseMarkdown(replaced);
  html = reinsertMermaid(html, diagrams);

  const marginTop = settings.margin?.top ?? '20mm';
  const marginRight = settings.margin?.right ?? '20mm';
  const marginBottom = settings.margin?.bottom ?? '20mm';
  const marginLeft = settings.margin?.left ?? '20mm';

  const headerHtml = settings.header
    ? `<div class="page-header">${settings.headerText ?? ''}</div>`
    : '';
  const footerHtml = settings.footer
    ? `<div class="page-footer">${settings.pageNumbers ? '<span class="page-number"></span>' : ''}${settings.footerText ?? ''}</div>`
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Document</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css"/>
<script src="https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js"></script>
<style>
/* ============ RESET + BASE ============ */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { font-size: 11pt; }
body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.75;
  color: #1e293b;
  background: #ffffff;
  padding: 0;
  margin: 0;
  max-width: 100%;
}

/* ============ TYPOGRAPHY & HEADING ORPHAN PREVENTION ============ */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Inter', -apple-system, sans-serif;
  font-weight: 700;
  margin-top: 1.4em;
  margin-bottom: 0.5em;
  color: #0f172a;
  line-height: 1.3;
  break-after: avoid-page !important;
  page-break-after: avoid !important;
}
h1 { font-size: 2em; border-bottom: 2px solid #e2e8f0; padding-bottom: 0.3em; margin-top: 0.5em; }
h2 { font-size: 1.5em; border-bottom: 1px solid #f1f5f9; padding-bottom: 0.25em; }
h3 { font-size: 1.25em; }
h4 { font-size: 1.1em; }
h5, h6 { font-size: 1em; }

h1 + .mermaid-block,
h2 + .mermaid-block,
h3 + .mermaid-block,
h4 + .mermaid-block,
h1 + pre, h2 + pre, h3 + pre,
h1 + table, h2 + table, h3 + table {
  break-before: avoid-page;
  page-break-before: avoid;
}

p { margin-bottom: 1em; orphans: 3; widows: 3; }
a { color: #4f46e5; text-decoration: underline; text-underline-offset: 2px; }
strong { font-weight: 600; color: #0f172a; }
em { font-style: italic; }
del { text-decoration: line-through; color: #64748b; }

/* ============ LISTS ============ */
ul, ol { margin: 0.5em 0 1em 1.5em; padding: 0; }
ul { list-style-type: disc; }
ol { list-style-type: decimal; }
li { margin-bottom: 0.3em; }
li > ul, li > ol { margin-top: 0.3em; margin-bottom: 0.3em; }
input[type="checkbox"] { margin-right: 0.5em; accent-color: #6366f1; vertical-align: middle; }

/* ============ BLOCKQUOTE ============ */
blockquote {
  border-left: 4px solid #6366f1;
  background: #f8fafc;
  padding: 12px 18px;
  margin: 1.2em 0;
  color: #475569;
  border-radius: 0 6px 6px 0;
  font-style: italic;
}
blockquote p { margin-bottom: 0; }

/* ============ TABLES ============ */
table {
  width: 100%;
  border-collapse: collapse;
  margin: 1.2em 0;
  font-size: 0.95em;
  break-inside: avoid;
  page-break-inside: avoid;
}
th, td {
  border: 1px solid #cbd5e1;
  padding: 10px 14px;
  text-align: left;
  vertical-align: top;
}
th { background: #f8fafc; font-weight: 600; color: #1e293b; }
tr:nth-child(even) { background: #f8fafc; }

/* ============ CODE ============ */
code {
  font-family: 'JetBrains Mono', Consolas, monospace;
  font-size: 0.875em;
  background: #f1f5f9;
  color: #0f172a;
  padding: 0.2em 0.4em;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}
pre {
  background: #0f1117;
  color: #f8fafc;
  border-radius: 8px;
  padding: 1rem 1.25rem;
  overflow-x: auto;
  font-size: 0.875em;
  line-height: 1.6;
  margin: 1.2em 0;
  font-family: 'JetBrains Mono', Consolas, monospace;
  break-inside: avoid;
  page-break-inside: avoid;
}
pre code {
  background: transparent;
  color: inherit;
  padding: 0;
  border: none;
  font-size: inherit;
}

/* ============ IMAGES ============ */
img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.2em auto;
  border-radius: 6px;
}

/* ============ MERMAID ============ */
.mermaid-block {
  margin: 1.2em 0;
  text-align: center;
  overflow-x: auto;
}
.mermaid-block svg {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
.mermaid-error {
  border: 1px solid #ef4444;
  border-radius: 6px;
  padding: 1em;
  background: #fef2f2;
  color: #dc2626;
  font-family: monospace;
  font-size: 0.875em;
}

/* ============ KATEX ============ */
.math-display { overflow-x: auto; margin: 1em 0; }

/* ============ PAGE BREAK ============ */
.page-break, hr.page-break {
  break-before: page;
  page-break-before: always;
  height: 0;
  border: none;
}
hr {
  border: none;
  border-top: 1px solid #e2e8e0;
  margin: 1.5em 0;
}

/* ============ HEADER / FOOTER ============ */
.page-header {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 12mm;
  line-height: 12mm;
  text-align: center;
  font-size: 9pt;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}
.page-footer {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  height: 12mm;
  line-height: 12mm;
  text-align: center;
  font-size: 9pt;
  color: #64748b;
  border-top: 1px solid #e2e8f0;
}
.page-number::before { content: "Page " counter(page); }

/* ============ CUSTOM CSS ============ */
${customCss}
</style>
</head>
<body>
${headerHtml}
${html}
${footerHtml}

<script>
window.__MERMAID_DONE__ = false;
const PAGE_HEIGHT_PX = 842; // A4 height in px at 96dpi ≈ 297mm
const MAX_DIAGRAM_HEIGHT = PAGE_HEIGHT_PX * 0.55; // max 55% of page height

(async function() {
  if (typeof mermaid !== 'undefined') {
    try {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'neutral',
        securityLevel: 'loose',
        fontFamily: 'Inter, Arial, sans-serif'
      });
      const blocks = document.querySelectorAll('.mermaid-block[data-diagram]');
      for (let i = 0; i < blocks.length; i++) {
        const el = blocks[i];
        const source = decodeURIComponent(el.getAttribute('data-diagram') || '');
        if (source) {
          try {
            const { svg } = await mermaid.render('pdf-mermaid-svg-' + i, source);
            el.innerHTML = svg;
            // Scale down tall diagrams so they fit on the page
            const svgEl = el.querySelector('svg');
            if (svgEl) {
              const naturalH = svgEl.getBoundingClientRect().height || svgEl.viewBox?.baseVal?.height || 0;
              if (naturalH > MAX_DIAGRAM_HEIGHT) {
                const scale = MAX_DIAGRAM_HEIGHT / naturalH;
                svgEl.style.width = 'auto';
                svgEl.style.height = MAX_DIAGRAM_HEIGHT + 'px';
                svgEl.style.maxWidth = '100%';
                svgEl.style.display = 'block';
                svgEl.style.margin = '0 auto';
              } else {
                svgEl.style.maxWidth = '100%';
                svgEl.style.display = 'block';
                svgEl.style.margin = '0 auto';
              }
            }
          } catch (err) {
            console.error('Mermaid render error:', err);
          }
        }
      }
    } catch (e) {
      console.error('Mermaid initialization error:', e);
    }
  }
  window.__MERMAID_DONE__ = true;
})();
</script>
</body>
</html>`;
}
