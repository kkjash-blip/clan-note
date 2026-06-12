'use client';
import Link from 'next/link';
import { useState } from 'react';

const MENUS = [
  {
    href: '/board',
    icon: '🗺',
    title: '전술 맵보드',
    desc: '실시간으로 전술을 그리고 공유하세요. 경로, 화살표, 팀원 마커를 활용해 작전을 시각화하고 저장할 수 있습니다.',
    badge: null,
    accent: '#6c63ff',
    glow: 'rgba(108,99,255,0.15)',
    border: 'rgba(108,99,255,0.3)',
    tags: ['맵 드로잉', '작전 저장', '팀원 마커'],
  },
  {
    href: '/community',
    icon: '💬',
    title: '클랜 커뮤니티',
    desc: '공지사항, 작전 공유, 경기 결과를 팀원들과 나누세요. 클랜 내 소통의 중심 공간입니다.',
    badge: '글 6개',
    accent: '#40b870',
    glow: 'rgba(64,184,112,0.12)',
    border: 'rgba(64,184,112,0.25)',
    tags: ['공지', '작전 공유', '경기 결과'],
  },
  {
    href: '/calendar',
    icon: '📅',
    title: '클랜 캘린더',
    desc: '팀원들이 게임 가능한 시간대를 직접 체크합니다. 겹치는 시간을 한눈에 파악해 스크림·클랜전 일정을 잡으세요.',
    badge: null,
    accent: '#e05050',
    glow: 'rgba(224,80,80,0.12)',
    border: 'rgba(224,80,80,0.25)',
    tags: ['가용 시간 체크', '일정 조율', '스크림 조율'],
  },
  {
    href: '/ai',
    icon: '🤖',
    title: 'AI 전술 피드백',
    desc: '경기 상황을 텍스트로 입력하면 AI가 포지셔닝, 타이밍, 팀 협력도를 분석해 개선점을 제시합니다.',
    badge: 'NEW',
    accent: '#4090e0',
    glow: 'rgba(64,144,224,0.12)',
    border: 'rgba(64,144,224,0.25)',
    tags: ['포지셔닝 분석', '타이밍 피드백', '전술 추천'],
  },
  {
    href: '/members',
    icon: '👥',
    title: '멤버 관리',
    desc: '클랜원의 역할을 설정하고 활동 현황을 확인하세요. 초대 링크로 새 멤버를 영입할 수 있습니다.',
    badge: '5명',
    accent: '#e8a020',
    glow: 'rgba(232,160,32,0.12)',
    border: 'rgba(232,160,32,0.25)',
    tags: ['역할 관리', '활동 현황', '멤버 초대'],
  },
];

// 디스코드 서버 초대 링크 (클랜 설정에서 변경 가능)
const DISCORD_INVITE = 'https://discord.gg/your-clan';

export default function GatePage() {
  const [discordOpen, setDiscordOpen] = useState(false);
  const [discordLink, setDiscordLink] = useState(DISCORD_INVITE);

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-[860px] mx-auto px-8 py-14">

        {/* Hero */}
        <div className="mb-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-semibold mb-5" style={{ background: 'rgba(108,99,255,0.15)', border: '1px solid rgba(108,99,255,0.3)', color: 'var(--accent2)' }}>
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: 'var(--accent2)' }} />
            서든어택 클랜 전술 플랫폼
          </div>
          <h1 className="text-[32px] font-bold mb-3 leading-tight" style={{ color: 'var(--text)' }}>
            클랜 노트에 오신 걸 환영합니다
          </h1>
          <p className="text-[14px] leading-relaxed mb-7" style={{ color: 'var(--text2)', maxWidth: '480px', margin: '0 auto 28px' }}>
            전술 설계부터 팀원 관리, AI 피드백까지 — 클랜 운영에 필요한 모든 것을 한 곳에서.
          </p>

          {/* 클랜 현황 */}
          <div className="inline-flex items-center gap-0 rounded-2xl overflow-hidden mb-7" style={{ border: '1px solid var(--border2)', background: 'var(--card)' }}>
            {[
              { label: '클랜 인원', value: '5명',      icon: '👥' },
              { label: '클랜 EXP',  value: '12,480',   icon: '⭐' },
              { label: '클랜 승률', value: '61%',       icon: '🏆' },
              { label: '클랜 랭킹', value: '23위',      icon: '📊' },
              { label: '클랜 마스터', value: 'AceKiller', icon: '👑' },
            ].map((s, i, arr) => (
              <div key={s.label} className="flex items-center gap-3 px-5 py-3.5" style={{ borderRight: i < arr.length - 1 ? '1px solid var(--border)' : undefined }}>
                <span className="text-[18px]">{s.icon}</span>
                <div className="text-left">
                  <div className="text-[10px] font-medium" style={{ color: 'var(--text2)' }}>{s.label}</div>
                  <div className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>{s.value}</div>
                </div>
              </div>
            ))}
            {/* 클랜 가입 버튼 */}
            <div className="flex items-center px-4 py-3.5">
              <button
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-semibold transition-all hover:opacity-90 whitespace-nowrap"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                🙋 클랜 가입
              </button>
            </div>
          </div>

          {/* Discord CTA */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl" style={{ background: '#1e1f2e', border: '1px solid rgba(88,101,242,0.4)', boxShadow: '0 0 24px rgba(88,101,242,0.15)' }}>
            <div className="flex items-center gap-2.5">
              {/* Discord logo */}
              <svg width="22" height="16" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.4a40.8 40.8 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.3 0A40.8 40.8 0 0 0 25.6.4 58.4 58.4 0 0 0 11 4.9C1.6 18.9-1 32.6.3 46.1a58.9 58.9 0 0 0 18 9.1 44.5 44.5 0 0 0 3.8-6.3 38.4 38.4 0 0 1-6-2.9l1.5-1.1a41.9 41.9 0 0 0 35.7 0l1.5 1.1a38.3 38.3 0 0 1-6 2.9 44.5 44.5 0 0 0 3.9 6.3 58.7 58.7 0 0 0 17.9-9.1C72.2 30.4 68.8 16.8 60.1 4.9ZM23.7 37.9c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Z" fill="#5865F2"/>
              </svg>
              <div className="text-left">
                <div className="text-[13px] font-semibold" style={{ color: 'var(--text)' }}>클랜 디스코드 음성 채널</div>
                <div className="text-[11px]" style={{ color: 'var(--text2)' }}>팀원들과 보이스로 실시간 소통</div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-2">
              <button
                onClick={() => window.open(discordLink, '_blank')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-[12px] font-bold transition-all hover:brightness-110"
                style={{ background: '#5865F2', color: '#fff' }}
              >
                채널 입장 →
              </button>
              <button
                onClick={() => setDiscordOpen(!discordOpen)}
                className="px-3 py-2 rounded-xl text-[11px] font-medium transition-all hover:bg-white/5"
                style={{ border: '1px solid rgba(88,101,242,0.35)', color: '#7e87f0' }}
                title="초대 링크 설정"
              >
                ⚙
              </button>
            </div>
          </div>

          {/* Discord link settings dropdown */}
          {discordOpen && (
            <div className="mt-3 inline-flex flex-col gap-2 px-4 py-3 rounded-xl text-left" style={{ background: 'var(--card)', border: '1px solid var(--border2)', minWidth: '380px' }}>
              <div className="text-[11px] font-semibold mb-1" style={{ color: 'var(--text2)' }}>클랜 디스코드 초대 링크 설정</div>
              <div className="flex gap-2">
                <input
                  value={discordLink}
                  onChange={e => setDiscordLink(e.target.value)}
                  placeholder="https://discord.gg/..."
                  className="flex-1 px-3 py-2 rounded-lg text-[12px] outline-none"
                  style={{ background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#5865F2'}
                  onBlur={e => e.currentTarget.style.borderColor = 'var(--border2)'}
                />
                <button
                  onClick={() => setDiscordOpen(false)}
                  className="px-4 py-2 rounded-lg text-[12px] font-semibold transition-all hover:brightness-110"
                  style={{ background: '#5865F2', color: '#fff' }}
                >
                  저장
                </button>
              </div>
              <p className="text-[10px]" style={{ color: 'var(--text3)' }}>
                디스코드 서버 설정 → 초대 링크에서 복사하세요.
              </p>
            </div>
          )}
        </div>

        {/* Menu cards */}
        <div className="grid gap-4 mb-8" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {MENUS.map(m => (
            <Link
              key={m.href}
              href={m.href}
              className="group rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-0.5"
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-[22px] shrink-0 transition-transform group-hover:scale-110" style={{ background: m.glow, border: `1px solid ${m.border}` }}>
                  {m.icon}
                </div>
                {m.badge && (
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: m.glow, color: m.accent, border: `1px solid ${m.border}` }}>
                    {m.badge}
                  </span>
                )}
              </div>

              {/* Title + desc */}
              <div>
                <div className="text-[16px] font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text)' }}>
                  {m.title}
                  <span className="text-[12px] font-normal opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: m.accent }}>→</span>
                </div>
                <p className="text-[12px] leading-relaxed" style={{ color: 'var(--text2)' }}>
                  {m.desc}
                </p>
              </div>

              {/* Tags */}
              <div className="flex gap-1.5 flex-wrap mt-auto">
                {m.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2.5 py-1 rounded-full font-medium" style={{ background: m.glow, color: m.accent }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="h-0.5 rounded-full -mb-6 -mx-6 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${m.accent}, transparent)` }} />
            </Link>
          ))}
        </div>


      </div>
    </div>
  );
}
