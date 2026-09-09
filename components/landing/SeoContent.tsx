'use client';

import { useState } from 'react';

const steps = [
  {
    step: '01',
    title: 'Write or Paste Markdown',
    description:
      'Type directly in the CodeMirror editor or paste your existing Markdown content. Supports GitHub Flavored Markdown (GFM) including tables, task lists, and strikethrough.',
  },
  {
    step: '02',
    title: 'Customize PDF Layout',
    description:
      'Choose paper size (A4, Letter, Legal, A5), orientation, margins, and add optional headers, footers, and page numbers. Apply custom CSS for total control.',
  },
  {
    step: '03',
    title: 'Export PDF Instantly',
    description:
      'Click the Export PDF button to generate a publication-grade PDF via headless Chromium. All diagrams, math formulas, and syntax highlighting are preserved perfectly.',
  },
];

const features = [
  {
    icon: '⚡',
    title: 'Real-Time Live Preview with Scroll Sync',
    description:
      'See your PDF output update instantly as you type. Scroll sync keeps the editor and preview perfectly aligned so you never lose your place in long documents.',
  },
  {
    icon: '🔷',
    title: 'Mermaid.js Diagram Rendering',
    description:
      'Create Flowcharts, Sequence Diagrams, Gantt Charts, ER Diagrams, and Architecture Block Diagrams using Mermaid.js syntax — all rendered beautifully in your PDF.',
  },
  {
    icon: '∑',
    title: 'KaTeX Math Expression Support',
    description:
      'Write inline math with $...$ or display equations with $$...$$. KaTeX renders LaTeX-quality mathematical formulas for academic papers and technical documentation.',
  },
  {
    icon: '🔒',
    title: 'Privacy First & Zero Data Retention',
    description:
      'Your Markdown content never leaves your browser unencrypted. PDF generation uses a secure server-side pipeline, and we retain zero data after processing.',
  },
];

const faqs = [
  {
    question: 'Is Markdown2PDF completely free to use?',
    answer:
      'Yes, Markdown2PDF is 100% free with no usage limits, no sign-up required, and no hidden costs. You can convert unlimited Markdown files to PDF at no charge.',
  },
  {
    question: 'Are my Markdown documents kept private and secure?',
    answer:
      'Absolutely. Your content is processed securely and we retain zero data after your PDF is generated. No account creation is required, and your documents stay private.',
  },
  {
    question: 'Does it support Mermaid.js diagrams and KaTeX math formulas?',
    answer:
      'Yes! Markdown2PDF has full support for Mermaid.js diagrams (flowcharts, sequence diagrams, Gantt charts) and KaTeX math expressions (both inline $...$ and display $$...$$).',
  },
  {
    question: 'Can I customize paper margins, format, and custom CSS?',
    answer:
      'Yes. You can choose from A4, Letter, Legal, and A5 paper sizes, switch between portrait and landscape orientation, set custom margins, and even inject your own CSS to fully style the PDF output.',
  },
];

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderBottom: '1px solid var(--border)',
        overflow: 'hidden',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        style={{
          width: '100%',
          textAlign: 'left',
          padding: '1.1rem 0',
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          color: 'var(--text-primary)',
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        <span>{question}</span>
        <span
          style={{
            flexShrink: 0,
            width: 24,
            height: 24,
            borderRadius: '50%',
            background: open ? 'var(--accent)' : 'var(--bg-tertiary)',
            color: open ? '#fff' : 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            transition: 'all 0.2s ease',
            transform: open ? 'rotate(45deg)' : 'none',
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? '200px' : '0',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <p
          style={{
            padding: '0 0 1.1rem 0',
            color: 'var(--text-secondary)',
            lineHeight: 1.7,
            margin: 0,
          }}
        >
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function SeoContent() {
  return (
    <section
      aria-label="How it works, features and FAQ"
      style={{
        background: 'var(--bg-primary)',
        borderTop: '1px solid var(--border)',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* ── Section A: How It Works ── */}
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          padding: '4rem 1.5rem 3rem',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          How to Convert Markdown to PDF Online
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Three simple steps to turn any Markdown document into a beautiful, print-ready PDF.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {steps.map((s) => (
            <div
              key={s.step}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.5rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  color: 'var(--accent)',
                  marginBottom: '0.75rem',
                }}
              >
                STEP {s.step}
              </div>
              <h3
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem',
                }}
              >
                {s.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.9rem' }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Section B: Features ── */}
      <div
        style={{
          background: 'var(--bg-secondary)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            padding: '3.5rem 1.5rem',
          }}
        >
          <h2
            style={{
              textAlign: 'center',
              fontSize: 'clamp(1.4rem, 3vw, 2rem)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
            }}
          >
            Powerful Features for Every Use Case
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: '2.5rem',
              lineHeight: 1.6,
            }}
          >
            Everything you need to create professional documents from Markdown.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border)',
                  borderRadius: 10,
                  padding: '1.25rem',
                }}
              >
                <div
                  style={{
                    fontSize: '1.5rem',
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 8,
                  }}
                >
                  {f.icon}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {f.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', lineHeight: 1.65, margin: 0, fontSize: '0.875rem' }}>
                    {f.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section C: FAQ ── */}
      <div
        style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: '3.5rem 1.5rem 4rem',
        }}
      >
        <h2
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: '0.5rem',
          }}
        >
          Frequently Asked Questions
        </h2>
        <p
          style={{
            textAlign: 'center',
            color: 'var(--text-secondary)',
            marginBottom: '2.5rem',
            lineHeight: 1.6,
          }}
        >
          Everything you need to know about Markdown2PDF.
        </p>

        <div>
          {faqs.map((faq) => (
            <FaqItem key={faq.question} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* ── Section D: Footer & Author Credits ── */}
      <footer
        style={{
          borderTop: '1px solid var(--border)',
          background: 'var(--bg-secondary)',
          padding: '2.5rem 1.5rem',
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem',
            textAlign: 'center',
          }}
        >
          {/* Brand & Author Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.75rem',
              color: 'var(--text-secondary)',
              fontSize: '0.95rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 6,
                  background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 12,
                }}
              >
                M
              </div>
              <span>Markdown2PDF</span>
            </div>
            <span>•</span>
            <span>Created with ❤️ by <strong>Rivaldi Eka Putra</strong></span>
          </div>

          {/* Social Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <a
              href="https://github.com/rivaldiekaptrrr"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub — Rivaldi Eka Putra"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              <svg style={{ width: 18, height: 18, fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/rivaldiekaputr"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn — Rivaldi Eka Putra"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'all 0.2s ease',
              }}
            >
              <svg style={{ width: 18, height: 18, fill: 'currentColor' }} viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span>LinkedIn</span>
            </a>
          </div>

          {/* Copyright */}
          <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © {new Date().getFullYear()} Markdown2PDF. Free Online Markdown Converter.
          </div>
        </div>
      </footer>
    </section>
  );
}
