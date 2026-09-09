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
    </section>
  );
}
