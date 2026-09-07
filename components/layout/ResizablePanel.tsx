'use client';

import { useRef, useState, useCallback } from 'react';

interface ResizablePanelProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export default function ResizablePanel({ left, right }: ResizablePanelProps) {
  const [split, setSplit] = useState(50); // percentage
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const onMouseMove = (ev: MouseEvent) => {
      if (!isDragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newSplit = ((ev.clientX - rect.left) / rect.width) * 100;
      setSplit(Math.min(80, Math.max(20, newSplit)));
    };

    const onMouseUp = () => {
      isDragging.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, []);

  return (
    <div ref={containerRef} className="flex h-full overflow-hidden" style={{ flex: 1 }}>
      {/* Left pane — Editor */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ width: `${split}%`, minWidth: 0 }}
      >
        {left}
      </div>

      {/* Divider */}
      <div
        onMouseDown={onMouseDown}
        className="flex-shrink-0 flex items-center justify-center cursor-col-resize z-10"
        style={{
          width: '5px',
          background: '#1e2535',
          borderLeft: '1px solid #2e3a52',
          borderRight: '1px solid #2e3a52',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = '#6366f1';
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLDivElement).style.background = '#1e2535';
        }}
      >
        <div
          className="rounded-full"
          style={{ width: 3, height: 24, background: '#4b5563' }}
        />
      </div>

      {/* Right pane — Preview */}
      <div
        className="flex flex-col overflow-hidden"
        style={{ flex: 1, minWidth: 0 }}
      >
        {right}
      </div>
    </div>
  );
}
