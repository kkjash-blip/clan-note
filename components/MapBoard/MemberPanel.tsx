'use client';
import { useState } from 'react';
import { ClanMember, COLORS, ROLE_LABELS } from '@/types/board';

const DEFAULT_MEMBERS: ClanMember[] = [
  { id: '1', nickname: 'AceKiller', color: '#e8a020', role: 'leader' },
  { id: '2', nickname: 'ShadowX', color: '#e05050', role: 'subleader' },
  { id: '3', nickname: 'GhostSnipe', color: '#40b870', role: 'elite' },
  { id: '4', nickname: 'IronWall', color: '#4090e0', role: 'member' },
];

interface Props {
  onPlaceMember: (name: string, color: string) => void;
}

export default function MemberPanel({ onPlaceMember }: Props) {
  const [members, setMembers] = useState<ClanMember[]>(DEFAULT_MEMBERS);

  const addMember = () => {
    const name = prompt('팀원 닉네임:');
    if (!name) return;
    const color = COLORS[members.length % COLORS.length];
    setMembers(prev => [...prev, { id: Date.now().toString(), nickname: name, color, role: 'member' }]);
  };

  return (
    <div className="px-4 py-3">
      <div className="text-[10px] font-semibold text-[#8b90a0] tracking-wider uppercase mb-2">팀원</div>
      <div className="flex flex-col gap-1">
        {members.map(m => (
          <button
            key={m.id}
            onClick={() => onPlaceMember(m.nickname, m.color)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg border border-white/14 bg-[#1e2230] hover:border-[#e8a020] cursor-pointer transition-all text-left"
          >
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: m.color }} />
            <span className="text-[11px] text-[#e8eaf0] flex-1">{m.nickname}</span>
            <span className="text-[10px] text-[#8b90a0]">{ROLE_LABELS[m.role]}</span>
          </button>
        ))}
        <button
          onClick={addMember}
          className="w-full py-2 rounded-lg border border-dashed border-white/14 text-[#8b90a0] text-[11px] hover:border-[#e8a020] hover:text-[#e8a020] transition-all mt-1"
        >
          + 팀원 추가
        </button>
      </div>
    </div>
  );
}
