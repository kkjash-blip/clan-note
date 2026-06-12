'use client';
import { useState } from 'react';

export default function Timeline() {
  const [seconds, setSeconds] = useState(0);
  const mins = Math.floor(seconds / 60);
  const secs = String(seconds % 60).padStart(2, '0');

  return (
    <div className="px-4 py-3 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex justify-between mb-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text2)' }}>라운드 타임라인</span>
        <span className="text-[12px] font-bold" style={{ color: 'var(--accent2)' }}>{mins}:{secs}</span>
      </div>
      <input type="range" min={0} max={150} value={seconds} onChange={e => setSeconds(Number(e.target.value))} className="w-full" style={{ accentColor: 'var(--accent)' }} />
      <div className="flex justify-between text-[9px] mt-0.5" style={{ color: 'var(--text3)' }}>
        <span>0:00</span><span>2:30</span>
      </div>
    </div>
  );
}
