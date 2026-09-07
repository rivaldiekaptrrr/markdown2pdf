'use client';

import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import MermaidRenderer from './MermaidRenderer';
import { extractMermaid, reinsertMermaid } from '@/lib/mermaid/renderer';
import { parseMarkdown } from '@/lib/markdown/parser';

export interface MarkdownPreviewRef {
  setScrollPercentage: (percentage: number) => void;
}

interface MarkdownPreviewProps {
  markdown: string;
  onScroll?: (percentage: number) => void;
}

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

const MarkdownPreview = forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>(
  function MarkdownPreview({ markdown, onScroll }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rootsRef = useRef<Root[]>([]);
  const debouncedMarkdown = useDebouncedValue(markdown, 300);

  const render = useCallback(async (md: string) => {
    if (!containerRef.current) return;

    // Clean up previous React roots mounted into mermaid blocks safely
    const oldRoots = rootsRef.current;
    rootsRef.current = [];
    if (oldRoots.length > 0) {
      setTimeout(() => {
        for (const root of oldRoots) {
          try {
            root.unmount();
          } catch {
            // ignore if already unmounted
          }
        }
      }, 0);
    }

    const { replaced, diagrams } = extractMermaid(md);
    let html = await parseMarkdown(replaced);
    html = reinsertMermaid(html, diagrams);

    containerRef.current.innerHTML = html;

    // Mount MermaidRenderer React components into placeholder divs
    const placeholders = containerRef.current.querySelectorAll<HTMLDivElement>(
      '.mermaid-block[data-diagram]'
    );
    for (const el of placeholders) {
      const encoded = el.getAttribute('data-diagram') ?? '';
      const source = decodeURIComponent(encoded);
      const root = createRoot(el);
      root.render(<MermaidRenderer source={source} />);
      rootsRef.current.push(root);
    }
  }, []);

  useEffect(() => {
    render(debouncedMarkdown);
  }, [debouncedMarkdown, render]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      const oldRoots = rootsRef.current;
      rootsRef.current = [];
      setTimeout(() => {
        for (const root of oldRoots) {
          try {
            root.unmount();
          } catch {
            // ignore
          }
        }
      }, 0);
    };
  }, []);

  useImperativeHandle(ref, () => ({
    setScrollPercentage: (percentage: number) => {
      if (containerRef.current) {
        const scroller = containerRef.current;
        const targetScrollTop = percentage * (scroller.scrollHeight - scroller.clientHeight);
        if (Math.abs(scroller.scrollTop - targetScrollTop) > 2) {
          scroller.scrollTop = targetScrollTop;
        }
      }
    }
  }));

  const handleScroll = () => {
    if (onScroll && containerRef.current) {
      const scroller = containerRef.current;
      const percentage = scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight);
      if (!isNaN(percentage)) {
        onScroll(percentage);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="markdown-preview h-full overflow-y-auto"
      style={{
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        fontFamily: "'Times New Roman', Georgia, serif",
        fontSize: '11pt',
        lineHeight: '1.75',
        padding: '32px 40px',
      }}
    />
  );
});

export default MarkdownPreview;
