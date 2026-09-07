'use client';

import { useState } from 'react';
import type { PaperSettings } from '@/components/pdf/PdfSettings';

interface ExportPdfButtonProps {
  getMarkdown: () => string;
  settings: PaperSettings;
}

export default function ExportPdfButton({ getMarkdown, settings }: ExportPdfButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const markdown = getMarkdown();
      const res = await fetch('/api/pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ markdown, settings }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? 'PDF generation failed. Please try again.');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'PDF generation failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={handleExport}
        disabled={loading}
        title="Export PDF"
        className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-semibold transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        style={{
          background: loading ? '#4f46e5' : '#6366f1',
          color: '#fff',
          border: 'none',
          boxShadow: loading ? 'none' : '0 0 12px rgba(99,102,241,0.4)',
        }}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin"
              style={{ width: 14, height: 14 }}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4" strokeDashoffset="10" />
            </svg>
            Generating…
          </>
        ) : (
          <>
            <svg style={{ width: 14, height: 14 }} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4 4m0 0l4-4m-4 4V4" />
            </svg>
            Export PDF
          </>
        )}
      </button>
      {error && (
        <div
          className="absolute right-0 top-full mt-2 p-3 rounded text-xs z-50 w-64"
          style={{
            background: '#1a0707',
            border: '1px solid #ef4444',
            color: '#f87171',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
