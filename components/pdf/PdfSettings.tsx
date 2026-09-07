'use client';

import { useState } from 'react';

export interface PaperSettings {
  format: 'A4' | 'A5' | 'Letter' | 'Legal';
  orientation: 'portrait' | 'landscape';
  margin: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  header: boolean;
  headerText: string;
  footer: boolean;
  footerText: string;
  pageNumbers: boolean;
  customCss: string;
}

export const DEFAULT_SETTINGS: PaperSettings = {
  format: 'A4',
  orientation: 'portrait',
  margin: { top: '15mm', right: '15mm', bottom: '15mm', left: '15mm' },
  header: false,
  headerText: '',
  footer: false,
  footerText: '',
  pageNumbers: true,
  customCss: '',
};

interface PdfSettingsProps {
  settings: PaperSettings;
  onChange: (settings: PaperSettings) => void;
  onClose: () => void;
}

export default function PdfSettings({ settings, onChange, onClose }: PdfSettingsProps) {
  const [local, setLocal] = useState(settings);

  const update = (partial: Partial<PaperSettings>) => {
    setLocal((prev) => ({ ...prev, ...partial }));
  };
  const updateMargin = (side: keyof PaperSettings['margin'], val: string) => {
    setLocal((prev) => ({ ...prev, margin: { ...prev.margin, [side]: val } }));
  };

  const handleApply = () => {
    onChange(local);
    onClose();
  };

  const labelClass = 'block text-xs font-semibold mb-1';
  const inputClass =
    'w-full rounded px-2 py-1.5 text-sm outline-none focus:ring-1 focus:ring-indigo-500';
  const inputStyle = {
    background: '#1e2535',
    color: '#e2e8f0',
    border: '1px solid #2e3a52',
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-4">
      <div
        className="text-xs font-bold uppercase tracking-wider mb-2 pb-1"
        style={{ color: '#6366f1', borderBottom: '1px solid #2e3a52' }}
      >
        {title}
      </div>
      {children}
    </div>
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-end"
      style={{ background: 'rgba(0,0,0,0.6)' }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="h-full overflow-y-auto p-6 w-80 flex flex-col gap-2"
        style={{
          background: '#161b27',
          borderLeft: '1px solid #2e3a52',
          animation: 'fadeIn 0.2s ease',
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold" style={{ color: '#e2e8f0' }}>
            Document Settings
          </h2>
          <button
            onClick={onClose}
            className="text-lg leading-none cursor-pointer"
            style={{ color: '#64748b' }}
          >
            ✕
          </button>
        </div>

        {/* Page Size */}
        <Section title="Page Size">
          <label className={labelClass} style={{ color: '#94a3b8' }}>
            Format
          </label>
          <select
            value={local.format}
            onChange={(e) => update({ format: e.target.value as PaperSettings['format'] })}
            className={inputClass}
            style={inputStyle}
          >
            <option value="A4">A4 (210 × 297 mm)</option>
            <option value="A5">A5 (148 × 210 mm)</option>
            <option value="Letter">Letter (8.5 × 11 in)</option>
            <option value="Legal">Legal (8.5 × 14 in)</option>
          </select>

          <label className={`${labelClass} mt-3`} style={{ color: '#94a3b8' }}>
            Orientation
          </label>
          <div className="flex gap-2">
            {(['portrait', 'landscape'] as const).map((o) => (
              <button
                key={o}
                onClick={() => update({ orientation: o })}
                className="flex-1 py-1.5 rounded text-sm capitalize font-medium transition-all cursor-pointer"
                style={{
                  background: local.orientation === o ? '#6366f1' : '#1e2535',
                  color: local.orientation === o ? '#fff' : '#94a3b8',
                  border: `1px solid ${local.orientation === o ? '#6366f1' : '#2e3a52'}`,
                }}
              >
                {o}
              </button>
            ))}
          </div>
        </Section>

        {/* Margins */}
        <Section title="Margins">
          {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
            <div key={side} className="flex items-center gap-2 mb-2">
              <label
                className="w-12 text-xs capitalize"
                style={{ color: '#94a3b8', flexShrink: 0 }}
              >
                {side}
              </label>
              <input
                type="text"
                value={local.margin[side]}
                onChange={(e) => updateMargin(side, e.target.value)}
                className={inputClass}
                style={inputStyle}
              />
            </div>
          ))}
        </Section>

        {/* Header / Footer */}
        <Section title="Header & Footer">
          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={local.header}
              onChange={(e) => update({ header: e.target.checked })}
              style={{ accentColor: '#6366f1' }}
            />
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              Enable Header
            </span>
          </label>
          {local.header && (
            <input
              type="text"
              placeholder="Header text..."
              value={local.headerText}
              onChange={(e) => update({ headerText: e.target.value })}
              className={`${inputClass} mb-3`}
              style={inputStyle}
            />
          )}

          <label className="flex items-center gap-2 mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={local.footer}
              onChange={(e) => update({ footer: e.target.checked })}
              style={{ accentColor: '#6366f1' }}
            />
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              Enable Footer
            </span>
          </label>
          {local.footer && (
            <input
              type="text"
              placeholder="Footer text..."
              value={local.footerText}
              onChange={(e) => update({ footerText: e.target.value })}
              className={`${inputClass} mb-3`}
              style={inputStyle}
            />
          )}

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={local.pageNumbers}
              onChange={(e) => update({ pageNumbers: e.target.checked })}
              style={{ accentColor: '#6366f1' }}
            />
            <span className="text-sm" style={{ color: '#94a3b8' }}>
              Show page numbers
            </span>
          </label>
        </Section>

        {/* Custom CSS */}
        <Section title="Custom CSS">
          <textarea
            value={local.customCss}
            onChange={(e) => update({ customCss: e.target.value })}
            rows={6}
            placeholder="/* Custom CSS for document only */&#10;body { font-family: Arial; }&#10;h1 { color: #333; }"
            className="w-full rounded p-2 text-xs font-mono outline-none resize-y focus:ring-1 focus:ring-indigo-500"
            style={{ ...inputStyle, lineHeight: '1.5', minHeight: '100px' }}
          />
        </Section>

        <div className="flex gap-2 mt-2">
          <button
            onClick={onClose}
            className="flex-1 py-2 rounded text-sm cursor-pointer transition-all"
            style={{
              background: '#1e2535',
              color: '#94a3b8',
              border: '1px solid #2e3a52',
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="flex-1 py-2 rounded text-sm font-semibold cursor-pointer transition-all"
            style={{ background: '#6366f1', color: '#fff' }}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
