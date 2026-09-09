import { ImageResponse } from 'next/og';

export const alt = 'Markdown2PDF — Professional Markdown to PDF Converter';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#090d16',
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(99, 102, 241, 0.15) 5%, transparent 0%)',
          backgroundSize: '100px 100px',
          fontFamily: 'sans-serif',
          padding: '60px',
        }}
      >
        {/* Glow backdrop effect */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '350px',
            background: 'radial-gradient(ellipse at center, rgba(99, 102, 241, 0.25), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        {/* Brand Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '10px 24px',
            borderRadius: '9999px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(129, 140, 248, 0.3)',
            color: '#a5b4fc',
            fontSize: 22,
            fontWeight: 600,
            marginBottom: '32px',
          }}
        >
          <span>📄</span>
          <span>Markdown2PDF Pro</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            color: '#ffffff',
            fontSize: 56,
            fontWeight: 800,
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginBottom: '20px',
            maxWidth: '1000px',
          }}
        >
          <span>Write Markdown.</span>
          <span
            style={{
              background: 'linear-gradient(90deg, #6366f1, #a855f7, #ec4899)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            Export Publication-Ready PDF.
          </span>
        </div>

        {/* Subtitle / Feature Tags */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginTop: '20px',
            marginBottom: '32px',
          }}
        >
          {['Mermaid Diagrams', 'KaTeX Math', 'Scroll Sync', 'Custom Layouts'].map((tag) => (
            <div
              key={tag}
              style={{
                padding: '8px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                color: '#cbd5e1',
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Call-to-Action (CTA) Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 32px',
            borderRadius: '14px',
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            color: '#ffffff',
            fontSize: 22,
            fontWeight: 700,
            boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
          }}
        >
          <span>Try Free Online — markdown2pdf.my.id</span>
          <span>→</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
