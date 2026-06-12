'use client';
import { useState } from 'react';

const MEMBERS = [
  { id: '1', name: 'AceKiller', role: 'leader', color: '#e8a020', joined: '2025-01-05', online: true, posts: 42, ops: 18 },
  { id: '2', name: 'ShadowX', role: 'subleader', color: '#e05050', joined: '2025-01-10', online: true, posts: 31, ops: 14 },
  { id: '3', name: 'GhostSnipe', role: 'elite', color: '#40b870', joined: '2025-02-15', online: false, posts: 19, ops: 9 },
  { id: '4', name: 'IronWall', role: 'member', color: '#4090e0', joined: '2025-03-01', online: false, posts: 7, ops: 5 },
  { id: '5', name: 'RocketFly', role: 'recruit', color: '#a040e0', joined: '2026-05-20', online: false, posts: 2, ops: 1 },
];

const ROLE_MAP: Record<string, { label: string; color: string; bg: string }> = {
  leader:    { label: '클랜장',   color: '#e8a020', bg: 'rgba(232,160,32,0.12)' },
  subleader: { label: '부클랜장', color: '#e05050', bg: 'rgba(224,80,80,0.12)' },
  elite:     { label: '정예',     color: '#40b870', bg: 'rgba(64,184,112,0.12)' },
  member:    { label: '일반',     color: '#4090e0', bg: 'rgba(64,144,224,0.12)' },
  recruit:   { label: '수습',     color: '#8888aa', bg: 'rgba(136,136,170,0.12)' },
};

export default function MembersPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const sel = MEMBERS.find(m => m.id === selected);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-1.5 text-[11px] mb-4" style={{ color: 'var(--text2)' }}>
          <span>내 클랜</span><span>/</span><span style={{ color: 'var(--text)' }}>멤버 관리</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span>👥</span> 멤버 관리
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90" style={{ background: 'var(--accent)', color: '#fff' }}>
            + 초대 링크 생성
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { label: '전체 멤버', value: '5', icon: '👥' },
            { label: '온라인', value: '2', icon: '🟢' },
            { label: '이번 달 활동', value: '4', icon: '📊' },
            { label: '신규 수습', value: '1', icon: '🌱' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border p-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="text-xl mb-1">{s.icon}</div>
              <div className="text-[22px] font-bold" style={{ color: 'var(--text)' }}>{s.value}</div>
              <div className="text-[11px]" style={{ color: 'var(--text2)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Member list */}
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="grid px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider border-b" style={{ color: 'var(--text2)', borderColor: 'var(--border)', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto' }}>
            <span>멤버</span><span>역할</span><span>가입일</span><span>게시글</span><span>작전 참여</span><span></span>
          </div>
          {MEMBERS.map(m => {
            const r = ROLE_MAP[m.role];
            return (
              <div
                key={m.id}
                onClick={() => setSelected(selected === m.id ? null : m.id)}
                className="grid px-5 py-3.5 border-b last:border-b-0 hover:bg-white/3 cursor-pointer transition-all items-center"
                style={{ borderColor: 'var(--border)', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr auto', background: selected === m.id ? 'rgba(108,99,255,0.06)' : undefined }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold" style={{ background: m.color + '22', color: m.color, border: `1.5px solid ${m.color}55` }}>{m.name[0]}</div>
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2" style={{ background: m.online ? 'var(--success)' : 'var(--text3)', borderColor: 'var(--card)' }} />
                  </div>
                  <span className="text-[13px] font-medium" style={{ color: 'var(--text)' }}>{m.name}</span>
                </div>
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full w-fit" style={{ background: r.bg, color: r.color }}>{r.label}</span>
                <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{m.joined}</span>
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{m.posts}</span>
                <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>{m.ops}</span>
                <button className="text-[14px] px-2 hover:text-white transition-all" style={{ color: 'var(--text2)' }} onClick={e => e.stopPropagation()}>⋯</button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right panel — member detail */}
      <div className="w-[240px] shrink-0 h-full overflow-y-auto border-l py-6 px-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        {sel ? (
          <>
            <div className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>멤버 상세</div>
            <div className="rounded-xl border p-4 text-center mb-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="w-14 h-14 rounded-full mx-auto mb-2 flex items-center justify-center text-xl font-bold" style={{ background: sel.color + '22', color: sel.color, border: `2px solid ${sel.color}66` }}>{sel.name[0]}</div>
              <div className="text-[14px] font-bold mb-1" style={{ color: 'var(--text)' }}>{sel.name}</div>
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: ROLE_MAP[sel.role].bg, color: ROLE_MAP[sel.role].color }}>{ROLE_MAP[sel.role].label}</span>
            </div>
            <div className="flex flex-col gap-2 mb-4">
              {[['가입일', sel.joined], ['게시글', String(sel.posts)], ['작전 참여', String(sel.ops)], ['상태', sel.online ? '🟢 온라인' : '⚫ 오프라인']].map(([k, v]) => (
                <div key={k} className="flex justify-between px-3 py-2 rounded-lg" style={{ background: 'var(--card)' }}>
                  <span className="text-[11px]" style={{ color: 'var(--text2)' }}>{k}</span>
                  <span className="text-[11px] font-medium" style={{ color: 'var(--text)' }}>{v}</span>
                </div>
              ))}
            </div>
            <div className="text-[11px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>역할 변경</div>
            <div className="flex flex-col gap-1.5">
              {Object.entries(ROLE_MAP).map(([key, r]) => (
                <button key={key} className="px-3 py-2 rounded-lg text-[11px] font-medium text-left border transition-all hover:border-[var(--accent)]" style={{
                  background: sel.role === key ? r.bg : 'var(--card)',
                  color: sel.role === key ? r.color : 'var(--text2)',
                  borderColor: sel.role === key ? r.color + '55' : 'var(--border)',
                }}>{r.label}</button>
              ))}
            </div>
            <button className="w-full mt-4 py-2 rounded-lg text-[11px] font-medium border transition-all hover:bg-[rgba(224,80,80,0.1)]" style={{ borderColor: 'rgba(224,80,80,0.3)', color: 'var(--danger)' }}>
              클랜에서 강퇴
            </button>
          </>
        ) : (
          <>
            <div className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>역할 설명</div>
            {Object.entries(ROLE_MAP).map(([key, r]) => (
              <div key={key} className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg mb-1.5 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: r.color }} />
                <span className="text-[11px] font-semibold" style={{ color: r.color }}>{r.label}</span>
              </div>
            ))}
            <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'var(--text2)' }}>멤버를 클릭하면 상세 정보와 역할 관리 옵션이 표시됩니다.</p>
          </>
        )}
      </div>
    </div>
  );
}
