const CATEGORIES = ['전체', '공지', '작전 공유', '자유', '경기 결과'];

const POSTS = [
  { id: 1, cat: '공지', title: '6월 클랜전 일정 공지', author: 'AceKiller', role: '클랜장', time: '1시간 전', views: 34, comments: 5, pinned: true, color: '#e8a020' },
  { id: 2, cat: '작전 공유', title: 'A사이트 속공 v2 - 업데이트된 루트', author: 'ShadowX', role: '부클랜장', time: '3시간 전', views: 28, comments: 8, pinned: false, color: '#e05050' },
  { id: 3, cat: '경기 결과', title: 'vs RushB 스크림 결과 (3:1 승)', author: 'AceKiller', role: '클랜장', time: '어제', views: 51, comments: 12, pinned: false, color: '#e8a020' },
  { id: 4, cat: '자유', title: '다음 스크림 참가 가능한 분?', author: 'GhostSnipe', role: '정예', time: '2일 전', views: 19, comments: 6, pinned: false, color: '#40b870' },
  { id: 5, cat: '작전 공유', title: '미드 압박 전술 - 타이밍 정리', author: 'IronWall', role: '일반', time: '3일 전', views: 22, comments: 3, pinned: false, color: '#4090e0' },
  { id: 6, cat: '자유', title: '새 맵 연습 일정 잡아요', author: 'ShadowX', role: '부클랜장', time: '4일 전', views: 15, comments: 4, pinned: false, color: '#e05050' },
];

const CAT_COLORS: Record<string, string> = {
  '공지': 'rgba(232,160,32,0.15)',
  '작전 공유': 'rgba(108,99,255,0.15)',
  '자유': 'rgba(64,184,112,0.12)',
  '경기 결과': 'rgba(64,144,224,0.15)',
};
const CAT_TEXT: Record<string, string> = {
  '공지': '#e8a020', '작전 공유': '#8b84ff', '자유': '#40b870', '경기 결과': '#4090e0',
};

export default function CommunityPage() {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-1.5 text-[11px] mb-4" style={{ color: 'var(--text2)' }}>
          <span>내 클랜</span><span>/</span><span style={{ color: 'var(--text)' }}>커뮤니티</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
            <span>💬</span> 클랜 커뮤니티
          </h1>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90" style={{ background: 'var(--accent)', color: '#fff' }}>
            + 글 작성
          </button>
        </div>

        {/* Category filter */}
        <div className="flex gap-2 mb-5">
          {CATEGORIES.map((c, i) => (
            <button key={c} className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all" style={{
              background: i === 0 ? 'var(--accent)' : 'var(--card)',
              color: i === 0 ? '#fff' : 'var(--text2)',
              border: '1px solid ' + (i === 0 ? 'transparent' : 'var(--border)'),
            }}>{c}</button>
          ))}
        </div>

        {/* Posts */}
        <div className="rounded-xl border overflow-hidden" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {POSTS.map((post, i) => (
            <div key={post.id} className="flex items-center gap-4 px-5 py-3.5 border-b last:border-b-0 hover:bg-white/3 cursor-pointer transition-all" style={{ borderColor: 'var(--border)' }}>
              {post.pinned && <span className="text-[10px] shrink-0" style={{ color: 'var(--gold)' }}>📌</span>}
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap" style={{ background: CAT_COLORS[post.cat] || 'var(--card2)', color: CAT_TEXT[post.cat] || 'var(--text2)' }}>
                {post.cat}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[13px] font-medium truncate" style={{ color: post.pinned ? 'var(--text)' : 'var(--text)' }}>{post.title}</div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: post.color }} />
                  <span className="text-[10px]" style={{ color: 'var(--text2)' }}>{post.author}</span>
                  <span className="text-[10px]" style={{ color: 'var(--text3)' }}>{post.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-4 shrink-0 text-[11px]" style={{ color: 'var(--text2)' }}>
                <span>👁 {post.views}</span>
                <span>💬 {post.comments}</span>
                <span style={{ color: 'var(--text3)' }}>{post.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[220px] shrink-0 h-full overflow-y-auto border-l py-6 px-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>게시판 통계</div>
        {[
          { label: '전체 글', value: '38', icon: '📝' },
          { label: '이번 주 글', value: '6', icon: '📅' },
          { label: '댓글', value: '124', icon: '💬' },
        ].map(s => (
          <div key={s.label} className="flex items-center justify-between px-3 py-2.5 rounded-lg mb-1.5 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
            <span className="text-[11px] flex items-center gap-1.5" style={{ color: 'var(--text2)' }}><span>{s.icon}</span>{s.label}</span>
            <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>{s.value}</span>
          </div>
        ))}

        <div className="text-[11px] font-semibold mt-5 mb-2 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>인기 글</div>
        {POSTS.slice(0, 3).map(post => (
          <div key={post.id} className="px-3 py-2.5 rounded-lg mb-1.5 cursor-pointer hover:bg-white/5 transition-all">
            <div className="text-[11px] font-medium line-clamp-2 leading-relaxed" style={{ color: 'var(--text)' }}>{post.title}</div>
            <div className="text-[10px] mt-1" style={{ color: 'var(--text2)' }}>👁 {post.views} · 💬 {post.comments}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
