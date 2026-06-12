import GNB from '@/components/Layout/GNB';

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <GNB />
      <div className="flex-1 flex overflow-hidden">
        {children}
      </div>
    </div>
  );
}
