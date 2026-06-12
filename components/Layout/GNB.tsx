'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/', label: '홈', icon: '⊞' },
  { href: '/board', label: '전술 맵보드', icon: '🗺' },
  { href: '/community', label: '커뮤니티', icon: '💬' },
  { href: '/calendar', label: '클랜 캘린더', icon: '📅' },
  { href: '/ai', label: 'AI 피드백', icon: '🤖' },
  { href: '/members', label: '멤버 관리', icon: '👥' },
];

export default function GNB() {
  const path = usePathname();

  return (
    <header className="flex items-center shrink-0 px-6 gap-1" style={{ height: '52px', background: 'var(--surface)', borderBottom: '1px solid var(--border)', zIndex: 50 }}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 mr-6 shrink-0">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center text-[11px] font-bold shrink-0" style={{ background: 'var(--accent)', color: '#fff' }}>SA</div>
        <span className="text-[14px] font-bold" style={{ color: 'var(--text)' }}>클랜 노트</span>
        <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: 'rgba(108,99,255,0.2)', color: 'var(--accent2)' }}>BETA</span>
      </Link>

      {/* Nav links */}
      <nav className="flex items-center gap-1 flex-1">
        {NAV.map(item => {
          const active = item.href === '/' ? path === '/' : path.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[13px] font-medium transition-all"
              style={{
                color: active ? 'var(--text)' : 'var(--text2)',
                background: active ? 'var(--accent-glow)' : 'transparent',
                border: active ? '1px solid rgba(108,99,255,0.3)' : '1px solid transparent',
              }}
            >
              <span className="text-sm leading-none">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Right: clan + user */}
      <div className="flex items-center gap-3 ml-4">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-white/5 transition-all" style={{ border: '1px solid var(--border2)' }}>
          <div className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0" style={{ background: 'var(--gold)', color: '#000' }}>SA</div>
          <span className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>내 클랜</span>
          <span className="text-[10px]" style={{ color: 'var(--text2)' }}>⌄</span>
        </div>
        <div className="flex items-center gap-2 cursor-pointer hover:bg-white/5 transition-all px-2 py-1 rounded-lg">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold" style={{ background: 'var(--accent)', color: '#fff' }}>A</div>
          <div className="hidden sm:block">
            <div className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>AceKiller</div>
          </div>
        </div>
      </div>
    </header>
  );
}
