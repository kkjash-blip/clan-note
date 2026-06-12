'use client';
import { useState } from 'react';
import { DrawTool, ClanMember, COLORS, ROLE_LABELS } from '@/types/board';

const TOOLS: { id: DrawTool; icon: string; label: string }[] = [
  { id: 'pen',     icon: '✏️', label: '경로' },
  { id: 'arrow',   icon: '➡️', label: '화살표' },
  { id: 'line',    icon: '╌',  label: '직선' },
  { id: 'sticker', icon: '📌', label: '스티커' },
];

const DEFAULT_MEMBERS: ClanMember[] = [
  { id: '1', nickname: 'AceKiller',  color: '#e8a020', role: 'leader' },
  { id: '2', nickname: 'ShadowX',    color: '#e05050', role: 'subleader' },
  { id: '3', nickname: 'GhostSnipe', color: '#40b870', role: 'elite' },
  { id: '4', nickname: 'IronWall',   color: '#4090e0', role: 'member' },
];

interface Props {
  currentTool: DrawTool;
  onToolChange: (t: DrawTool) => void;
  onPlaceMember: (name: string, color: string) => void;
}

export default function LeftPanel({ currentTool, onToolChange, onPlaceMember }: Props) {
  const [members, setMembers] = useState<ClanMember[]>(DEFAULT_MEMBERS);

  const addMember = () => {
    const name = prompt('팀원 닉네임:');
    if (!name) return;
    const color = COLORS[members.length % COLORS.length];
    setMembers(prev => [...prev, { id: Date.now().toString(), nickname: name, color, role: 'member' }]);
  };

  return (
    <div className="flex flex-col shrink-0 overflow-hidden" style={{ width: '148px', background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>

      {/* 드로잉 툴 — 2×2 아이콘 그리드 */}
      <div className="p-2 shrink-0">
        <div className="grid grid-cols-2 gap-1">
          {TOOLS.map(t => (
            <button
              key={t.id}
              onClick={() => onToolChange(t.id)}
              title={t.label}
              className="flex flex-col items-center justify-center gap-0.5 py-2 rounded-lg transition-all"
              style={{
                background: currentTool === t.id ? 'var(--accent-glow)' : 'transparent',
                border: currentTool === t.id ? '1px solid rgba(108,99,255,0.4)' : '1px solid var(--border)',
                color: currentTool === t.id ? 'var(--accent2)' : 'var(--text2)',
              }}
            >
              <span className="text-[16px] leading-none">{t.icon}</span>
              <span className="text-[9px] font-medium">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-2 shrink-0" style={{ height: '1px', background: 'var(--border)' }} />

      {/* 팀원 배치 목록 */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <div className="px-3 pt-2.5 pb-1 shrink-0">
          <div className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--text3)' }}>팀원 배치</div>
        </div>
        <div className="flex-1 overflow-y-auto flex flex-col gap-1 px-2 pb-2">
          {members.map(m => (
            <button
              key={m.id}
              onClick={() => onPlaceMember(m.nickname, m.color)}
              className="w-full flex items-center gap-2 px-2.5 py-2.5 rounded-lg transition-all text-left"
              style={{ border: '1px solid var(--border)', background: 'transparent' }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.04)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
              title={`${m.nickname} 마커 배치`}
            >
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                style={{ background: m.color + '33', color: m.color, border: `1.5px solid ${m.color}88` }}
              >
                {m.nickname[0]}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-medium truncate" style={{ color: 'var(--text)' }}>{m.nickname}</div>
                <div className="text-[9px]" style={{ color: 'var(--text3)' }}>{ROLE_LABELS[m.role]}</div>
              </div>
            </button>
          ))}
          <button
            onClick={addMember}
            className="w-full py-2 rounded-lg text-[10px] transition-all mt-0.5"
            style={{ border: '1px dashed var(--border2)', color: 'var(--text3)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent2)'; e.currentTarget.style.color = 'var(--accent2)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border2)'; e.currentTarget.style.color = 'var(--text3)'; }}
          >
            + 팀원 추가
          </button>
        </div>
      </div>

    </div>
  );
}
