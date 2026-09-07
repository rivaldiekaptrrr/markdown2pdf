# Markdown2PDF

A professional web application for writing Markdown and exporting beautiful PDFs.

## Features

- **Markdown Editor** — CodeMirror 6 with syntax highlighting, line numbers, keyboard shortcuts
- **Live Preview** — Real-time rendering using the same pipeline as PDF output
- **Mermaid Diagrams** — Fully rendered flowcharts, sequence diagrams, ER diagrams, etc.
- **KaTeX Math** — Inline `$...$` and block `$$...$$` mathematical formulas
- **Syntax Highlighting** — Code blocks with language-specific highlighting
- **PDF Export** — High-quality PDF via Puppeteer + Chromium
- **Page Settings** — A4, A5, Letter, Legal; Portrait/Landscape; custom margins
- **Header/Footer** — Optional page header, footer, and page numbers
- **Custom CSS** — Apply your own styles to the PDF output
- **Auto-Save** — Documents auto-saved to IndexedDB in your browser
- **File Import/Export** — Open `.md`/`.txt` files, export `.md` or `.pdf`
- **Drag & Drop** — Drop images or markdown files directly into the editor
- **Responsive** — Works on mobile with tab-based editor/preview switching

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS v4, Inter + JetBrains Mono fonts |
| Editor | CodeMirror 6 |
| Markdown | unified, remark-parse, remark-gfm, remark-rehype |
| Math | remark-math, rehype-katex, KaTeX |
| Diagrams | Mermaid |
| Security | rehype-sanitize |
| PDF | Puppeteer + Chromium |
| Storage | IndexedDB via `idb` |

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Environment Variables

See `.env.example` for configuration options.

```bash
cp .env.example .env.local
```

## Project Structure

```
markdown2pdf/
├── app/
│   ├── page.tsx           # Main application page
│   ├── layout.tsx         # Root layout + metadata
│   ├── globals.css        # Global styles
│   └── api/
│       └── pdf/
│           └── route.ts   # PDF generation API
│
├── components/
│   ├── editor/
│   │   ├── MarkdownEditor.tsx   # CodeMirror 6 editor
│   │   └── EditorToolbar.tsx    # Markdown insertion toolbar
│   ├── preview/
│   │   ├── MarkdownPreview.tsx  # Live HTML preview
│   │   └── MermaidRenderer.tsx  # Client-side Mermaid SVG
│   ├── pdf/
│   │   ├── PdfSettings.tsx      # Document settings panel
│   │   └── ExportPdfButton.tsx  # PDF download button
│   └── layout/
│       └── ResizablePanel.tsx   # Draggable split panel
│
├── lib/
│   ├── markdown/
│   │   └── parser.ts      # unified remark/rehype pipeline
│   ├── mermaid/
│   │   └── renderer.ts    # Mermaid extract/reinsert helpers
│   ├── pdf/
│   │   └── template.ts    # Shared HTML document builder
│   └── storage/
│       └── documentStore.ts  # IndexedDB persistence
│
└── PRD.md                  # Product Requirements Document
```

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + S` | Save |
| `Ctrl + B` | Bold |
| `Ctrl + I` | Italic |
| `Ctrl + K` | Insert Link |
| `Ctrl + Z` | Undo |
| `Ctrl + Shift + Z` | Redo |
| `Ctrl + F` | Find |

## License

MIT
