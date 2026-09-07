'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import ResizablePanel from '@/components/layout/ResizablePanel';
import EditorToolbar from '@/components/editor/EditorToolbar';
import ExportPdfButton from '@/components/pdf/ExportPdfButton';
import PdfSettings, { DEFAULT_SETTINGS, type PaperSettings } from '@/components/pdf/PdfSettings';
import { saveDocument, loadLastDocument } from '@/lib/storage/documentStore';
import type { MarkdownEditorRef } from '@/components/editor/MarkdownEditor';
import type { MarkdownPreviewRef } from '@/components/preview/MarkdownPreview';
import 'katex/dist/katex.min.css';

// Dynamic imports for heavy components (avoid SSR)
const MarkdownEditor = dynamic(() => import('@/components/editor/MarkdownEditor'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center" style={{ color: '#4b5563' }}>
      Loading editor…
    </div>
  ),
});

const MarkdownPreview = dynamic(() => import('@/components/preview/MarkdownPreview'), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center bg-white" style={{ color: '#9ca3af' }}>
      Loading preview…
    </div>
  ),
});

const DEFAULT_MARKDOWN = `# 📄 Markdown2PDF Pro Starter Template
> **System Status:** All rendering engines (Markdown GFM, Mermaid, KaTeX, Syntax Highlighting) operational.

Beautiful Markdown PDFs in one click — **no CSS required**, no manual styling. Edit live on the left, download a print-ready PDF on the right.

## Image Support

![Abstract Tech Workspace](https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=700&q=80)
*Figure 1 — Images from any public URL are embedded inline in both preview and exported PDF.*

---

## 1. Feature Checklist

- [x] **GitHub Flavored Markdown (GFM)** — tables, tasklists, ~~strikethrough~~, auto-links
- [x] **Mermaid Diagrams** — Flowcharts, Sequence Diagrams, Architecture Block Diagrams
- [x] **LaTeX / KaTeX Math** — Inline & Display math equations
- [x] **Syntax Highlighting** — Multi-language code snippet blocks
- [x] **Custom PDF Layouts** — Page formats (A4, Letter, Legal), custom margins & page numbers
- [ ] Your next document project

---

## 2. Mermaid Diagrams

### 2.1 Flowchart Diagram (Top-Down with Decision Branching)
\`\`\`mermaid
flowchart TD
    Start([🚀 Start App]) --> Input[✍️ User Inputs Markdown]
    Input --> Validate{Valid Syntax?}
    Validate -->|No| Fix[⚠️ Show Error Warning]
    Fix --> Input
    Validate -->|Yes| Parse[⚡ Parse AST & Markdown]
    Parse --> Mode{Action Selected?}
    Mode -->|Preview| Live[🖥️ Render Live Web Preview]
    Mode -->|Export| Generate[⚙️ Generate Headless PDF]
    Generate --> Download([📄 Download PDF File])
    Live --> End([✅ Finish])
\`\`\`

### 2.2 System Architecture Block Diagram (Horizontal Layout)
\`\`\`mermaid
flowchart LR
    subgraph Client ["Client Browser Layer"]
        Editor[CodeMirror 6 Editor]
        Preview[Live HTML/SVG Preview]
    end
    subgraph Server ["Next.js Server API"]
        Pipeline[Remark / Rehype Pipeline]
        Puppeteer[Puppeteer Chromium PDF Engine]
    end
    Editor --> Pipeline
    Pipeline --> Preview
    Pipeline --> Puppeteer
\`\`\`

### 2.3 Sequence Diagram
\`\`\`mermaid
sequenceDiagram
    autonumber
    actor User
    participant Editor as CodeMirror Editor
    participant Engine as Unified Pipeline
    participant PDF as Puppeteer API

    User->>Editor: Type / Edit Markdown
    Editor->>Engine: Debounced Content Event
    Engine-->>User: Render HTML & Mermaid SVG
    User->>PDF: Click Export PDF
    PDF-->>User: Download PDF Document
\`\`\`

---

## 3. Mathematical Formulas (KaTeX)

Inline equation example: Einstein's mass-energy relation is $E = mc^2$, and the Euler identity is $e^{i\\pi} + 1 = 0$.

Display equation example:

$$
\\int_{-\\infty}^{\\infty} e^{-x^2} \\, dx = \\sqrt{\\pi}
$$

Matrix notation:

$$
\\mathbf{J} = \\begin{bmatrix}
\\frac{\\partial f_1}{\\partial x_1} & \\frac{\\partial f_1}{\\partial x_2} \\\\
\\frac{\\partial f_2}{\\partial x_1} & \\frac{\\partial f_2}{\\partial x_2}
\\end{bmatrix}
$$

---

## 4. Code Snippets & Syntax Highlighting

### TypeScript / Next.js
\`\`\`typescript
interface PdfExportOptions {
  format: 'A4' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin: string;
}

export async function generatePdf(html: string, options: PdfExportOptions): Promise<Buffer> {
  console.log(\`Generating PDF in \${options.format} (\${options.orientation})...\`);
  return Buffer.from(html);
}
\`\`\`

### Python / Data Science
\`\`\`python
import numpy as np

def calculate_gaussian(x: np.ndarray, mu: float = 0.0, sigma: float = 1.0) -> np.ndarray:
    """Calculate normal distribution PDF values."""
    return (1.0 / (sigma * np.sqrt(2 * np.pi))) * np.exp(-0.5 * ((x - mu) / sigma) ** 2)
\`\`\`

---

## 5. Structured Data Tables

| Feature | Support Level | Engine / Library | Export Status |
| :--- | :---: | :---: | :---: |
| **GFM Tables** | Full | \`remark-gfm\` | ✅ Supported |
| **Code Highlighting** | Full | \`shiki\` | ✅ Supported |
| **Mermaid SVG** | Full | \`mermaid.js\` | ✅ Supported |
| **KaTeX Math** | Full | \`rehype-katex\` | ✅ Supported |
| **Page Break Control** | Full | CSS Page Break | ✅ Supported |

---

## 6. Callouts & Nested Lists

### Project Hierarchy
- **Frontend Layer**
  - Next.js 16 (App Router)
  - CodeMirror 6 Editor
  - Live Preview Panel
- **Rendering Layer**
  - Remark & Rehype Pipeline
  - Mermaid Client Renderer
  - KaTeX TeX Engine
- **Export Engine**
  - Serverless Puppeteer Chromium Driver

> 💡 **Tip:** Press **Ctrl + S** at any time to manually save your document locally in IndexedDB. Use the **⚙ Settings** button in the header to change margins, paper sizes, and add custom headers/footers.
`;

// Mobile tab state
type Tab = 'editor' | 'preview';

export default function HomePage() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [settings, setSettings] = useState<PaperSettings>(DEFAULT_SETTINGS);
  const [showSettings, setShowSettings] = useState(false);
  const [title, setTitle] = useState('Untitled.md');
  const [saved, setSaved] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('editor');
  const [isMobile, setIsMobile] = useState(false);

  const markdownRef = useRef(markdown);
  markdownRef.current = markdown;

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const editorRef = useRef<MarkdownEditorRef>(null);
  const previewRef = useRef<MarkdownPreviewRef>(null);

  const handleEditorScroll = useCallback((percentage: number) => {
    previewRef.current?.setScrollPercentage(percentage);
  }, []);

  const handlePreviewScroll = useCallback((percentage: number) => {
    editorRef.current?.setScrollPercentage(percentage);
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Load from IndexedDB on mount
  useEffect(() => {
    loadLastDocument().then((doc) => {
      if (doc) {
        setMarkdown(doc.content);
        setTitle(doc.title);
      }
    });
  }, []);

  // Auto-save with debounce
  useEffect(() => {
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveDocument({ id: 'main', title, content: markdown, updatedAt: Date.now() }).then(() =>
        setSaved(true)
      );
    }, 800);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [markdown, title]);

  // Warn before leaving
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (!saved) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [saved]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        saveDocument({ id: 'main', title, content: markdown, updatedAt: Date.now() }).then(() =>
          setSaved(true)
        );
      }
      if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        handleInsert('**bold text**');
      }
      if (e.ctrlKey && e.key === 'i') {
        e.preventDefault();
        handleInsert('*italic text*');
      }
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        handleInsert('[link text](https://example.com)');
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown, title, saved]);

  // Toolbar insert — appends text to current markdown (simple approach)
  const handleInsert = useCallback((text: string) => {
    setMarkdown((prev) => prev + '\n' + text);
  }, []);

  const getSelected = useCallback(() => '', []);

  // File operations
  const handleNew = () => {
    if (!saved && !confirm('Discard unsaved changes?')) return;
    setMarkdown('# New Document\n\nStart writing...');
    setTitle('Untitled.md');
  };

  const handleOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.md,.markdown,.txt';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        setMarkdown(ev.target?.result as string);
        setTitle(file.name);
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleExportMd = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title.endsWith('.md') ? title : title + '.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        handleInsert(`\n![${file.name}](${dataUrl})\n`);
      };
      reader.readAsDataURL(file);
    } else if (file.name.match(/\.(md|markdown|txt)$/i)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setMarkdown(ev.target?.result as string);
        setTitle(file.name);
      };
      reader.readAsText(file);
    }
  };

  const editorPanel = (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className="px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>✎</span> Editor
        <span className="ml-auto" style={{ color: saved ? 'var(--success)' : 'var(--warning)', fontSize: 10 }}>
          {saved ? '● Saved' : '○ Unsaved'}
        </span>
      </div>
      <EditorToolbar onInsert={handleInsert} getSelected={getSelected} />
      <div className="flex-1 overflow-hidden" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <MarkdownEditor
          ref={editorRef}
          value={markdown}
          onChange={setMarkdown}
          onScroll={handleEditorScroll}
        />
      </div>
    </div>
  );

  const previewPanel = (
    <div className="flex flex-col h-full overflow-hidden">
      <div
        className="px-3 py-1 text-xs font-semibold uppercase tracking-wider flex items-center gap-2"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        <span style={{ color: 'var(--accent)' }}>◉</span>
        <span style={{ color: 'var(--text-secondary)' }}>PDF Preview</span>
        <span className="ml-auto text-xs" style={{ color: 'var(--text-muted)' }}>
          {settings.format} · {settings.orientation}
        </span>
      </div>
      <div className="flex-1 overflow-hidden">
        <MarkdownPreview
          ref={previewRef}
          markdown={markdown}
          onScroll={handlePreviewScroll}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col" style={{ height: '100vh', background: 'var(--bg-primary)' }}>
      {/* ===== HEADER ===== */}
      <header
        className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
        style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border)',
          zIndex: 10,
          height: 48,
        }}
      >
        {/* Brand */}
        <div className="flex items-center gap-2 mr-2">
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center font-bold text-white text-xs"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
          >
            M
          </div>
          <span className="font-bold text-sm hidden sm:block" style={{ color: 'var(--text-primary)' }}>
            Markdown2PDF
          </span>
        </div>

        {/* Title input */}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="rounded px-2 py-1 text-sm font-medium outline-none focus:ring-1 focus:ring-indigo-500"
          style={{
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border)',
            color: 'var(--text-primary)',
            minWidth: 0,
            width: 160,
          }}
        />

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleNew}
            title="New document"
            className="px-2 py-1 rounded text-xs cursor-pointer transition-all hover:brightness-110"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            New
          </button>
          <button
            onClick={handleOpen}
            title="Open file"
            className="px-2 py-1 rounded text-xs cursor-pointer transition-all hover:brightness-110"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            Open
          </button>
          <button
            onClick={handleExportMd}
            title="Export Markdown"
            className="px-2 py-1 rounded text-xs cursor-pointer transition-all hover:brightness-110"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            .md
          </button>
          <button
            onClick={() => setShowSettings(true)}
            title="Document settings"
            className="px-2 py-1 rounded text-xs cursor-pointer transition-all hover:brightness-110"
            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)', border: '1px solid var(--border)' }}
          >
            ⚙ Settings
          </button>
          <ExportPdfButton getMarkdown={() => markdownRef.current} settings={settings} />
        </div>
      </header>

      {/* ===== MOBILE TABS ===== */}
      {isMobile && (
        <div
          className="flex flex-shrink-0"
          style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border)' }}
        >
          {(['editor', 'preview'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 text-sm font-medium capitalize cursor-pointer transition-all"
              style={{
                background: activeTab === tab ? 'var(--bg-surface)' : 'transparent',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-muted)',
                borderBottom: activeTab === tab ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-1 overflow-hidden bg-[var(--bg-primary)]">
        {isMobile ? (
          <div className="h-full overflow-hidden">
            {activeTab === 'editor' ? editorPanel : previewPanel}
          </div>
        ) : (
          <ResizablePanel left={editorPanel} right={previewPanel} />
        )}
      </main>

      {/* ===== SETTINGS PANEL ===== */}
      {showSettings && (
        <PdfSettings
          settings={settings}
          onChange={setSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
