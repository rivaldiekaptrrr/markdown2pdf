'use client';

import { useEffect, useRef, useState } from 'react';
import { useTheme } from 'next-themes';

interface MermaidRendererProps {
  source: string;
}

let mermaidInitialized = false;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function getMermaid(currentTheme: string): Promise<any> {
  const m = await import('mermaid');
  const mermaid = m.default ?? m;
  
  // Re-initialize to update theme dynamically
  mermaid.initialize({
    startOnLoad: false,
    theme: currentTheme === 'dark' ? 'dark' : 'neutral',
    securityLevel: 'loose',
    fontFamily: 'Inter, Arial, sans-serif',
  });
  
  return mermaid;
}

export default function MermaidRenderer({ source }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState<string | null>(null);

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    let cancelled = false;
    const currentTheme = theme === 'system' ? systemTheme : theme;

    async function render() {
      try {
        const mermaid = await getMermaid(currentTheme || 'light');
        const id = `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, source);

        if (!cancelled && containerRef.current) {
          containerRef.current.innerHTML = svg;
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Mermaid rendering error');
        }
      }
    }

    render();
    return () => { cancelled = true; };
  }, [source, theme, systemTheme]);

  if (error) {
    return (
      <div className="mermaid-error" style={{ color: 'var(--danger)', padding: '16px', border: '1px solid var(--danger)', borderRadius: '8px' }}>
        <strong>Mermaid Error:</strong>
        <pre style={{ fontSize: '12px', marginTop: '8px', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{error}</pre>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="mermaid-block"
      data-diagram={encodeURIComponent(source)}
    />
  );
}
