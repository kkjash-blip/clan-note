'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', icon: '⊞', label: '대시보드' },
  { href: '/board', icon: '🗺', label: '전술 맵보드' },
  { href: '/community', icon: '💬', label: '클랜 커뮤니티' },
  { href: '/ai', icon: '🤖', label: 'AI 피드백' },
  { href: '/members', icon: '👥', label: '멤버 관리' },
];

const BOTTOM_NAV = [
  { href: '/settings', icon: '⚙', label: '설정' },
  { href: '/privacy', icon: '🔒', label: '개인정보' },
];

export default function Sidebar() {
  const path = usePathname();

  return (
    <aside className="w-[148px] h-screen flex flex-col shrink-0" style={{ background: 'var(--surface)', borderRight: '1px solid var(--border)' }}>
      {/* Logo */}
      <div className="px-4 py-4 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>CO</div>
          <div>
            <div className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>클랜 오더</div>
            <div className="text-[10px] px-1.5 py-0.5 rounded font-semibold inline-block mt-0.5" style={{ background: 'rgba(108,99,255,0.2)', color: 'var(--accent2)' }}>BETA</div>
          </div>
        </div>
      </div>

      {/* Clan info */}
      <div className="px-3 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-white/5 transition-all">
          <div className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: 'var(--gold)', color: '#000' }}>SA</div>
          <div className="min-w-0">
            <div className="text-[11px] font-semibold truncate" style={{ color: 'var(--text)' }}>내 클랜</div>
          </div>
          <span className="text-[10px] ml-auto" style={{ color: 'var(--text2)' }}>⌄</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5 overflow-y-auto">
        {NAV.map(item => {
          const active = item.href === '/' ? path === '/' : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-[12px] font-medium transition-all"
              style={{
                color: active ? 'var(--text)' : 'var(--text2)',
                background: active ? 'var(--accent-glow)' : 'transparent',
                borderLeft: active ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              <span className="text-base leading-none">{item.icon}</span>
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="px-2 py-2 border-t" style={{ borderColor: 'var(--border)' }}>
        {BOTTOM_NAV.map(item => (
          <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-[11px] transition-all hover:bg-white/5" style={{ color: 'var(--text2)' }}>
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
        {/* User */}
        <div className="flex items-center gap-2 px-3 py-2 mt-1 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
          <div className="w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-[10px] font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>나</div>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-medium truncate" style={{ color: 'var(--text)' }}>AceKiller</div>
            <div className="text-[9px] truncate" style={{ color: 'var(--text2)' }}>클랜장</div>
          </div>
          <span className="text-[10px]" style={{ color: 'var(--text3)' }}>›</span>
        </div>
      </div>
    </aside>
  );
}
