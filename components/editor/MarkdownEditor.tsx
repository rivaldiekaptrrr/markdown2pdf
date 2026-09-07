'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { useTheme } from 'next-themes';
import { EditorState, Compartment, StateEffect } from '@codemirror/state';
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
} from '@codemirror/view';
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from '@codemirror/commands';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { oneDark } from '@codemirror/theme-one-dark';
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  indentOnInput,
} from '@codemirror/language';
import { searchKeymap } from '@codemirror/search';

export interface MarkdownEditorRef {
  setScrollPercentage: (percentage: number) => void;
}

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  onScroll?: (percentage: number) => void;
}

const MarkdownEditor = forwardRef<MarkdownEditorRef, MarkdownEditorProps>(
  function MarkdownEditor({ value, onChange, onScroll }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const themeCompartment = useRef(new Compartment());
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    if (!containerRef.current) return;
    
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';

    const startState = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        history(),
        drawSelection(),
        dropCursor(),
        rectangularSelection(),
        crosshairCursor(),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        keymap.of([
          ...defaultKeymap,
          ...historyKeymap,
          ...searchKeymap,
          indentWithTab,
        ]),
        markdown({
          base: markdownLanguage,
        }),
        themeCompartment.current.of(isDark ? oneDark : []),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current(update.state.doc.toString());
          }
        }),
        EditorView.domEventHandlers({
          scroll(event, view) {
            if (onScroll) {
              const scroller = event.target as HTMLElement;
              if (scroller) {
                const percentage = scroller.scrollTop / (scroller.scrollHeight - scroller.clientHeight);
                // Avoid NaN if perfectly fit
                if (!isNaN(percentage)) {
                  onScroll(percentage);
                }
              }
            }
            return false;
          }
        }),
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px',
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
          },
          '.cm-scroller': {
            overflow: 'auto',
            fontFamily: 'inherit',
          },
          '.cm-content': {
            caretColor: 'var(--accent)',
            padding: '16px 0',
          },
          '.cm-line': {
            padding: '0 16px',
          },
          '.cm-gutters': {
            backgroundColor: 'var(--bg-primary)',
            borderRight: '1px solid var(--border)',
            color: 'var(--text-muted)',
          },
          '.cm-activeLineGutter': {
            backgroundColor: 'var(--bg-secondary)',
          },
          '.cm-focused .cm-cursor': {
            borderLeftColor: 'var(--accent)',
          },
          '.cm-selectionBackground': {
            backgroundColor: 'var(--bg-surface) !important',
          },
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update theme dynamically
  useEffect(() => {
    if (!viewRef.current) return;
    const currentTheme = theme === 'system' ? systemTheme : theme;
    const isDark = currentTheme === 'dark';
    
    viewRef.current.dispatch({
      effects: themeCompartment.current.reconfigure(isDark ? oneDark : [])
    });
  }, [theme, systemTheme]);

  // Sync external value changes (e.g., file open / toolbar inserts)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  useImperativeHandle(ref, () => ({
    setScrollPercentage: (percentage: number) => {
      if (viewRef.current) {
        const scroller = viewRef.current.scrollDOM;
        if (scroller) {
          const targetScrollTop = percentage * (scroller.scrollHeight - scroller.clientHeight);
          // Only update if difference is significant to avoid ping-pong
          if (Math.abs(scroller.scrollTop - targetScrollTop) > 2) {
            scroller.scrollTop = targetScrollTop;
          }
        }
      }
    }
  }));

  return (
    <div
      ref={containerRef}
      className="h-full overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    />
  );
});

export default MarkdownEditor;
