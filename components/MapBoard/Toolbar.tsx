'use client';
import { DrawTool } from '@/types/board';

const TOOLS: { id: DrawTool; icon: string; label: string }[] = [
  { id: 'pen',     icon: '✏️', label: '경로' },
  { id: 'arrow',   icon: '➡️', label: '화살표' },
  { id: 'line',    icon: '╌',  label: '직선' },
  { id: 'sticker', icon: '📌', label: '스티커' },
];

interface Props {
  currentTool: DrawTool;
  onToolChange: (t: DrawTool) => void;
}

export default function Toolbar({ currentTool, onToolChange }: Props) {
  return (
    <div className="flex flex-col items-center gap-1 py-3 px-1.5 shrink-0" style={{ width: '52px', background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
      {TOOLS.map(t => (
        <button
          key={t.id}
          onClick={() => onToolChange(t.id)}
          title={t.label}
          className="w-full flex flex-col items-center justify-center gap-0.5 py-2.5 rounded-lg transition-all"
          style={{
            background: currentTool === t.id ? 'var(--accent-glow)' : 'transparent',
            border: currentTool === t.id ? '1px solid rgba(108,99,255,0.4)' : '1px solid transparent',
            color: currentTool === t.id ? 'var(--accent2)' : 'var(--text2)',
          }}
        >
          <span className="text-[17px] leading-none">{t.icon}</span>
          <span className="text-[8px] font-medium leading-tight">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
