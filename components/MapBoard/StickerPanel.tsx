'use client';
import { STICKER_LABELS, COLORS } from '@/types/board';

interface Props {
  selectedSticker: string;
  currentColor: string;
  strokeWidth: number;
  onStickerSelect: (icon: string) => void;
  onColorChange: (color: string) => void;
  onStrokeChange: (w: number) => void;
}

const STICKERS = Object.keys(STICKER_LABELS);

export default function StickerPanel({ selectedSticker, currentColor, strokeWidth, onStickerSelect, onColorChange, onStrokeChange }: Props) {
  return (
    <div>
      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text2)' }}>작전 스티커</div>
        <div className="grid grid-cols-3 gap-1.5">
          {STICKERS.map(icon => (
            <button
              key={icon}
              onClick={() => onStickerSelect(icon)}
              className="aspect-square rounded-lg flex flex-col items-center justify-center gap-1 p-1.5 transition-all"
              style={{
                background: selectedSticker === icon ? 'var(--accent-glow)' : 'var(--card)',
                border: `1px solid ${selectedSticker === icon ? 'rgba(108,99,255,0.4)' : 'var(--border)'}`,
              }}
            >
              <span className="text-lg leading-none">{icon}</span>
              <span className="text-[9px]" style={{ color: 'var(--text2)' }}>{STICKER_LABELS[icon]}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 py-3" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text2)' }}>선 색상</div>
        <div className="flex gap-2 flex-wrap">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => onColorChange(c)}
              className="w-6 h-6 rounded-full transition-all"
              style={{ background: c, border: `2px solid ${currentColor === c ? 'var(--text)' : 'transparent'}`, transform: currentColor === c ? 'scale(1.15)' : 'scale(1)' }}
            />
          ))}
        </div>
      </div>

      <div className="px-4 py-3">
        <div className="text-[10px] font-semibold uppercase tracking-wider mb-2.5" style={{ color: 'var(--text2)' }}>선 굵기</div>
        <div className="flex items-center gap-3">
          <input type="range" min={1} max={8} value={strokeWidth} onChange={e => onStrokeChange(Number(e.target.value))} className="flex-1 accent-[var(--accent)]" style={{ accentColor: 'var(--accent)' }} />
          <span className="text-[11px] min-w-[28px] text-right" style={{ color: 'var(--text2)' }}>{strokeWidth}px</span>
        </div>
      </div>
    </div>
  );
}
