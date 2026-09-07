'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

interface ToolbarAction {
  label: string;
  title: string;
  icon: string;
  action: (selected: string) => string;
  block?: boolean;
}

const ACTIONS: (ToolbarAction | 'separator')[] = [
  {
    label: 'B', title: 'Bold (Ctrl+B)', icon: 'B',
    action: (s) => s ? `**${s}**` : '**bold text**',
  },
  {
    label: 'I', title: 'Italic (Ctrl+I)', icon: 'I',
    action: (s) => s ? `*${s}*` : '*italic text*',
  },
  {
    label: 'S', title: 'Strikethrough', icon: 'S',
    action: (s) => s ? `~~${s}~~` : '~~strikethrough~~',
  },
  'separator',
  {
    label: 'H1', title: 'Heading 1', icon: 'H1',
    action: (s) => `# ${s || 'Heading 1'}`,
  },
  {
    label: 'H2', title: 'Heading 2', icon: 'H2',
    action: (s) => `## ${s || 'Heading 2'}`,
  },
  {
    label: 'H3', title: 'Heading 3', icon: 'H3',
    action: (s) => `### ${s || 'Heading 3'}`,
  },
  'separator',
  {
    label: '🔗', title: 'Link (Ctrl+K)', icon: '🔗',
    action: (s) => s ? `[${s}](url)` : '[link text](https://example.com)',
  },
  {
    label: '🖼', title: 'Image', icon: '🖼',
    action: (s) => `![${s || 'alt text'}](image-url)`,
  },
  'separator',
  {
    label: '`', title: 'Inline Code', icon: '`',
    action: (s) => s ? `\`${s}\`` : '`code`',
  },
  {
    label: '```', title: 'Code Block', icon: '```',
    action: () => '```language\n// your code here\n```',
    block: true,
  },
  {
    label: '>', title: 'Blockquote', icon: '>',
    action: (s) => `> ${s || 'blockquote'}`,
  },
  'separator',
  {
    label: '•', title: 'Bullet List', icon: '•',
    action: () => '- Item 1\n- Item 2\n- Item 3',
    block: true,
  },
  {
    label: '1.', title: 'Numbered List', icon: '1.',
    action: () => '1. Item 1\n2. Item 2\n3. Item 3',
    block: true,
  },
  {
    label: '⊞', title: 'Table', icon: '⊞',
    action: () => '| Column 1 | Column 2 | Column 3 |\n|---|---|---|\n| Cell 1 | Cell 2 | Cell 3 |',
    block: true,
  },
  'separator',
  {
    label: '◇', title: 'Mermaid Diagram', icon: '◇',
    action: () => '```mermaid\nflowchart TD\n    A[Start] --> B[Process]\n    B --> C[End]\n```',
    block: true,
  },
  {
    label: '∑', title: 'Math Formula', icon: '∑',
    action: (s) => s ? `$${s}$` : '$$\nE = mc^2\n$$',
    block: true,
  },
  'separator',
  {
    label: '—', title: 'Horizontal Rule', icon: '—',
    action: () => '---',
    block: true,
  },
];

interface EditorToolbarProps {
  onInsert: (text: string) => void;
  getSelected: () => string;
}

export default function EditorToolbar({ onInsert, getSelected }: EditorToolbarProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-2 py-1.5 overflow-x-auto"
      style={{
        background: 'var(--bg-secondary)',
        borderBottom: '1px solid var(--border)',
        flexShrink: 0,
      }}
    >
      <div className="flex items-center gap-0.5">
      {ACTIONS.map((action, i) => {
        if (action === 'separator') {
          return (
            <div
              key={`sep-${i}`}
              className="mx-1 self-stretch"
              style={{ width: 1, background: 'var(--border)' }}
            />
          );
        }
        return (
          <button
            key={action.label}
            title={action.title}
            onClick={() => {
              const selected = getSelected();
              onInsert(action.action(selected));
            }}
            className="px-2 py-1 rounded text-xs font-semibold transition-all duration-150 cursor-pointer select-none"
            style={{
              color: 'var(--text-secondary)',
              background: 'transparent',
              border: '1px solid transparent',
              minWidth: '28px',
              fontFamily: action.label.length <= 2 ? 'serif' : 'monospace',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-surface)';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
              (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
            }}
          >
            {action.label}
          </button>
        );
      })}
      </div>
      
      {mounted && (
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="ml-4 px-2 py-1 rounded text-sm font-semibold transition-all duration-150 cursor-pointer select-none flex items-center justify-center"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          style={{
            color: 'var(--text-secondary)',
            background: 'transparent',
            border: '1px solid transparent',
            minWidth: '28px',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'var(--bg-surface)';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-primary)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'var(--text-secondary)';
          }}
        >
          {theme === 'dark' ? '🌞' : '🌙'}
        </button>
      )}
    </div>
  );
}
