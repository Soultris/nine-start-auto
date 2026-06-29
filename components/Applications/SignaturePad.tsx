'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface SignaturePadProps {
  /** Label shown above the pad */
  label: string;
  /** Whether this field is required */
  required?: boolean;
  /** Current value (base64 data URL or empty string) */
  value: string;
  /** Called when the signature changes */
  onChange: (dataUrl: string) => void;
  /** Show validation error state */
  error?: boolean;
}

export default function SignaturePad({
  label,
  required = false,
  value,
  onChange,
  error = false,
}: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasContent, setHasContent] = useState(false);
  const [activeTab, setActiveTab] = useState<'draw' | 'upload'>('draw');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Restore canvas from value (e.g. after parent re-render) ──────────────
  useEffect(() => {
    if (!value || activeTab !== 'draw') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      setHasContent(true);
    };
    img.src = value;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  // ── Drawing helpers ───────────────────────────────────────────────────────
  const getPos = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ): { x: number; y: number } | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      if (!touch) return null;
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const pos = getPos(e);
      if (!pos) return;
      const ctx = canvasRef.current?.getContext('2d');
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      setIsDrawing(true);
    },
    []
  );

  const draw = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing) return;
      const pos = getPos(e);
      if (!pos) return;
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!ctx || !canvas) return;
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#111111';
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    },
    [isDrawing]
  );

  const stopDrawing = useCallback(() => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setHasContent(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    onChange(canvas.toDataURL('image/png'));
  }, [isDrawing, onChange]);

  // ── Clear ─────────────────────────────────────────────────────────────────
  const handleClear = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.clearRect(0, 0, canvas.width, canvas.height);
    }
    setHasContent(false);
    setUploadedFileName('');
    onChange('');
  };

  // ── File upload ───────────────────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Accept images only
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file (PNG, JPG, etc.).');
      return;
    }

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      onChange(dataUrl);
      setHasContent(true);
    };
    reader.readAsDataURL(file);
  };

  // ── Tab switch: clear state ───────────────────────────────────────────────
  const switchTab = (tab: 'draw' | 'upload') => {
    handleClear();
    setActiveTab(tab);
  };

  // ─────────────────────────────────────────────────────────────────────────
  const borderColor = error
    ? 'border-red-400'
    : hasContent
    ? 'border-brand-gold'
    : 'border-border-light';

  return (
    <div className="w-full">
      {/* Label */}
      <label className="block text-black text-sm font-medium mb-2 sm:mb-3.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>

      {/* Tab selector */}
      <div className="flex mb-2 rounded-lg overflow-hidden border border-border-light w-fit">
        <button
          type="button"
          onClick={() => switchTab('draw')}
          className={`px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
            activeTab === 'draw'
              ? 'bg-card-dark text-brand-gold'
              : 'bg-card-light text-black hover:bg-gray-200'
          }`}
        >
          ✏️ Draw
        </button>
        <button
          type="button"
          onClick={() => switchTab('upload')}
          className={`px-4 py-1.5 text-xs font-semibold transition-colors duration-200 ${
            activeTab === 'upload'
              ? 'bg-card-dark text-brand-gold'
              : 'bg-card-light text-black hover:bg-gray-200'
          }`}
        >
          📁 Upload
        </button>
      </div>

      {/* Draw tab */}
      {activeTab === 'draw' && (
        <div className={`relative rounded-lg border-2 ${borderColor} bg-white transition-colors duration-300 overflow-hidden`}>
          {/* Placeholder hint */}
          {!hasContent && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
              <span className="text-gray-400 text-xs font-medium tracking-wide">
                Sign here
              </span>
            </div>
          )}
          <canvas
            ref={canvasRef}
            width={600}
            height={130}
            className="w-full touch-none cursor-crosshair block"
            style={{ height: '100px' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>
      )}

      {/* Upload tab */}
      {activeTab === 'upload' && (
        <div
          className={`relative rounded-lg border-2 ${borderColor} bg-white transition-colors duration-300 overflow-hidden`}
          style={{ minHeight: '108px' }}
        >
          {value ? (
            /* Preview */
            <div className="flex items-center justify-center h-full p-2" style={{ minHeight: '104px' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={value}
                alt="Uploaded signature"
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          ) : (
            /* Drop zone / click area */
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex flex-col items-center justify-center gap-1.5 py-6 text-gray-400 hover:text-gray-600 transition-colors duration-200 cursor-pointer"
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              <span className="text-xs font-medium">Click to upload signature image</span>
              <span className="text-[10px]">PNG, JPG, GIF supported</span>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      )}

      {/* Bottom controls row */}
      <div className="flex items-center justify-between mt-1.5">
        {/* File name for upload */}
        <span className="text-[10px] text-gray-400 truncate max-w-[60%]">
          {activeTab === 'upload' && uploadedFileName ? uploadedFileName : ''}
        </span>

        {/* Clear button */}
        {hasContent && (
          <button
            type="button"
            onClick={handleClear}
            className="text-[11px] text-red-500 hover:text-red-700 font-medium transition-colors duration-200 flex items-center gap-1"
          >
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="mt-1 text-xs text-red-600">Required</p>
      )}
    </div>
  );
}
