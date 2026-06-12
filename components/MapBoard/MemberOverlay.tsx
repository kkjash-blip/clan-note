'use client';
import { useState } from 'react';
import { ClanMember, COLORS, ROLE_LABELS } from '@/types/board';

const DEFAULT_MEMBERS: (ClanMember & { online: boolean })[] = [
  { id: '1', nickname: 'AceKiller',  color: '#e8a020', role: 'leader',    online: true  },
  { id: '2', nickname: 'ShadowX',    color: '#e05050', role: 'subleader', online: true  },
  { id: '3', nickname: 'GhostSnipe', color: '#40b870', role: 'elite',     online: false },
  { id: '4', nickname: 'IronWall',   color: '#4090e0', role: 'member',    online: false },
];

interface Props {
  onPlaceMember: (name: string, color: string) => void;
}

export default function MemberOverlay({ onPlaceMember }: Props) {
  const [members, setMembers] = useState(DEFAULT_MEMBERS);
  const [dragging, setDragging] = useState<string | null>(null);

  const addMember = () => {
    const name = prompt('팀원 닉네임:');
    if (!name) return;
    const color = COLORS[members.length % COLORS.length];
    setMembers(prev => [...prev, { id: Date.now().toString(), nickname: name, color, role: 'member', online: false }]);
  };

  const onlineCount = members.filter(m => m.online).length;

  return (
    <div
      className="flex flex-col rounded-xl overflow-hidden"
      style={{
        width: '238px',
        background: 'rgba(13,13,26,0.9)',
        border: '1px solid var(--border2)',
        backdropFilter: 'blur(10px)',
      }}
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between px-3 py-2.5 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-semibold" style={{ color: 'var(--text)' }}>팀원 현황</span>
          <span className="flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(64,184,112,0.15)', color: 'var(--success)' }}>
            <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'var(--success)' }} />
            {onlineCount}명 온라인
          </span>
        </div>
        <button
          onClick={addMember}
          className="w-5 h-5 rounded flex items-center justify-center text-[12px] transition-all hover:bg-white/10"
          style={{ color: 'var(--text3)' }}
          title="팀원 추가"
        >+</button>
      </div>

      {/* 팀원 목록 */}
      <div className="flex flex-col gap-0.5 px-2 py-2">
        {members.map(m => (
          <div
            key={m.id}
            draggable
            onDragStart={e => {
              e.dataTransfer.setData('member-nickname', m.nickname);
              e.dataTransfer.setData('member-color', m.color);
              e.dataTransfer.effectAllowed = 'copy';
              setDragging(m.id);
            }}
            onDragEnd={() => setDragging(null)}
            onClick={() => onPlaceMember(m.nickname, m.color)}
            className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg cursor-grab active:cursor-grabbing select-none transition-all"
            style={{
              border: '1px solid transparent',
              opacity: dragging === m.id ? 0.4 : 1,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              e.currentTarget.style.borderColor = m.color + '44';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.borderColor = 'transparent';
            }}
            title={`드래그하거나 클릭해서 ${m.nickname} 마커 배치`}
          >
            {/* 아바타 + 온라인 인디케이터 */}
            <div className="relative shrink-0">
              <span
                className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold"
                style={{ background: m.color + '33', color: m.color, border: `1.5px solid ${m.color}88` }}
              >
                {m.nickname[0]}
              </span>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full"
                style={{
                  background: m.online ? 'var(--success)' : 'var(--text3)',
                  border: '1.5px solid rgba(13,13,26,0.9)',
                }}
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] font-medium truncate" style={{ color: 'var(--text)' }}>{m.nickname}</div>
              <div className="text-[9px]" style={{ color: m.online ? 'var(--success)' : 'var(--text3)' }}>
                {m.online ? '● 온라인' : '○ 오프라인'}
              </div>
            </div>

            {/* 드래그 핸들 힌트 */}
            <span className="text-[10px] shrink-0" style={{ color: 'var(--text3)' }}>⠿</span>
          </div>
        ))}
      </div>
    </div>
  );
}
