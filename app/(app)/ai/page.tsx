'use client';
import { useState, useRef } from 'react';

const HISTORY = [
  { id: 1, title: 'A사이트 속공 분석', date: '2026-06-10', score: 78, tags: ['포지셔닝', '타이밍'] },
  { id: 2, title: '미드 교전 패턴 분석', date: '2026-06-08', score: 65, tags: ['교전', '협력'] },
  { id: 3, title: 'B사이트 방어 분석', date: '2026-06-05', score: 82, tags: ['방어', '포지셔닝'] },
];

const SAMPLE_FEEDBACK = {
  summary: 'A사이트 진입 시 3명이 동시에 같은 통로를 사용해 클리어링이 비효율적입니다. 진입 타이밍도 카운터 타이밍과 겹치는 경향이 있습니다.',
  items: [
    { icon: '🎯', title: '포지셔닝 개선', desc: '진입 시 역할 분담을 명확히 하세요. 1명은 연막, 2명은 분산 진입 권장.', type: 'warn' },
    { icon: '⏱', title: '타이밍 조정', desc: '라운드 시작 후 45~50초에 진입하면 상대 재장전 타이밍과 겹칩니다.', type: 'warn' },
    { icon: '🤝', title: '팀 협력도 우수', desc: '플래시 활용 협공이 잘 이루어지고 있습니다. 계속 유지하세요.', type: 'good' },
  ],
  recommend: '상대 팀이 A사이트에 집중 배치한다면 B사이트 우회 + 미드 압박 전술을 혼용하는 것이 효과적입니다.',
};

export default function AIPage() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<typeof SAMPLE_FEEDBACK | null>(null);
  const [replayFile, setReplayFile] = useState<File | null>(null);
  const [replayParsing, setReplayParsing] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleReplayUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setReplayFile(file);
    setReplayParsing(true);
    setTimeout(() => {
      setReplayParsing(false);
      setInput(`[리플레이 파일: ${file.name}]\n자동 분석된 경기 데이터:\n- 라운드 수: 24라운드 (13:11 승)\n- A사이트 진입 성공률: 61%\n- 평균 진입 인원: 3.2명\n- 첫 교전 위치: 미드 60%, 롱 30%, 숏 10%\n- 팀 생존율: 공격 38%, 수비 52%`);
      setReplayParsing(false);
    }, 1600);
  };

  const analyze = () => {
    if (!input.trim()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setResult(SAMPLE_FEEDBACK); }, 1800);
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="flex items-center gap-1.5 text-[11px] mb-4" style={{ color: 'var(--text2)' }}>
          <span>내 클랜</span><span>/</span><span style={{ color: 'var(--text)' }}>AI 피드백</span>
        </div>
        <h1 className="text-xl font-bold mb-2 flex items-center gap-2" style={{ color: 'var(--text)' }}>
          <span>🤖</span> AI 전술 피드백
        </h1>
        <p className="text-[12px] mb-5" style={{ color: 'var(--text2)' }}>경기 상황이나 작전을 텍스트로 입력하거나, 2D 리플레이 파일을 업로드하면 AI가 전술적 피드백을 제공합니다.</p>

        {/* 2D 리플레이 업로드 */}
        <div className="rounded-xl border p-4 mb-4" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>🎬 전장 리플레이 파일 업로드</div>
              <div className="text-[11px] mt-0.5" style={{ color: 'var(--text2)' }}>.json 파일을 업로드하면 경기 데이터를 자동으로 분석합니다.</div>
            </div>
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleReplayUpload} />
            <button
              onClick={() => fileRef.current?.click()}
              disabled={replayParsing}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90 disabled:opacity-50 shrink-0 ml-4"
              style={{ background: replayFile ? 'rgba(64,184,112,0.15)' : 'var(--card2)', border: `1px solid ${replayFile ? 'rgba(64,184,112,0.4)' : 'var(--border2)'}`, color: replayFile ? 'var(--success)' : 'var(--text2)' }}
            >
              {replayParsing
                ? <><span className="animate-spin inline-block">↻</span> 파싱 중...</>
                : replayFile
                  ? <><span>✓</span> {replayFile.name.length > 18 ? replayFile.name.slice(0, 18) + '…' : replayFile.name}</>
                  : <><span>📂</span> 파일 선택</>
              }
            </button>
          </div>
          {replayFile && !replayParsing && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px]" style={{ background: 'rgba(64,184,112,0.07)', border: '1px solid rgba(64,184,112,0.2)', color: 'var(--text2)' }}>
              <span style={{ color: 'var(--success)' }}>✓</span>
              파싱 완료 — 텍스트 입력란에 경기 데이터가 자동으로 채워졌습니다. AI 분석을 시작하세요.
            </div>
          )}
        </div>

        {/* Input */}
        <div className="rounded-xl border p-4 mb-6" style={{ background: 'var(--card)', borderColor: 'var(--border2)' }}>
          <div className="text-[11px] font-semibold mb-2 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>경기/작전 내용 입력 <span className="normal-case font-normal" style={{ color: 'var(--text3)' }}>— 직접 입력 또는 리플레이 파싱 결과</span></div>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="예: A사이트 속공 작전에서 3명이 롱 통로로 진입하고 2명이 미드를 통해 압박합니다. 최근 상대팀이 롱 쪽 집중 방어를 하고 있어서 계속 막힙니다..."
            rows={5}
            className="w-full rounded-lg p-3 text-[12px] resize-none outline-none transition-all"
            style={{ background: 'var(--card2)', border: '1px solid var(--border2)', color: 'var(--text)', lineHeight: 1.6 }}
            onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
            onBlur={e => e.currentTarget.style.borderColor = 'var(--border2)'}
          />
          <div className="flex items-center justify-between mt-3">
            <span className="text-[10px]" style={{ color: 'var(--text3)' }}>AI 모델: Claude Sonnet · 월 3회 무료</span>
            <button
              onClick={analyze}
              disabled={loading || !input.trim()}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-semibold transition-all disabled:opacity-40"
              style={{ background: 'var(--accent)', color: '#fff' }}
            >
              {loading ? <><span className="animate-spin">↻</span> 분석 중...</> : '🤖 AI 분석 시작'}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="rounded-xl border p-5 mb-6" style={{ background: 'var(--card)', borderColor: 'var(--accent)', boxShadow: '0 0 20px var(--accent-glow)' }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs" style={{ background: 'var(--accent)' }}>🤖</div>
              <span className="text-[13px] font-bold" style={{ color: 'var(--text)' }}>AI 분석 결과</span>
            </div>
            <p className="text-[12px] mb-5 leading-relaxed" style={{ color: 'var(--text2)' }}>{result.summary}</p>
            <div className="flex flex-col gap-3 mb-5">
              {result.items.map((item, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg border" style={{
                  background: item.type === 'good' ? 'rgba(64,184,112,0.06)' : 'rgba(232,160,32,0.06)',
                  borderColor: item.type === 'good' ? 'rgba(64,184,112,0.2)' : 'rgba(232,160,32,0.2)',
                }}>
                  <span className="text-xl shrink-0">{item.icon}</span>
                  <div>
                    <div className="text-[12px] font-semibold mb-0.5" style={{ color: 'var(--text)' }}>{item.title}</div>
                    <div className="text-[11px] leading-relaxed" style={{ color: 'var(--text2)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 rounded-lg border" style={{ background: 'rgba(108,99,255,0.08)', borderColor: 'rgba(108,99,255,0.25)' }}>
              <div className="text-[11px] font-semibold mb-1" style={{ color: 'var(--accent2)' }}>💡 전술 추천</div>
              <div className="text-[12px] leading-relaxed" style={{ color: 'var(--text2)' }}>{result.recommend}</div>
            </div>
          </div>
        )}
      </div>

      {/* Right panel */}
      <div className="w-[220px] shrink-0 h-full overflow-y-auto border-l py-6 px-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>
        <div className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>분석 히스토리</div>
        <div className="flex flex-col gap-2">
          {HISTORY.map(h => (
            <div key={h.id} className="p-3 rounded-xl border cursor-pointer hover:border-[var(--accent)] transition-all" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="text-[11px] font-semibold mb-1" style={{ color: 'var(--text)' }}>{h.title}</div>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--card2)' }}>
                  <div className="h-full rounded-full" style={{ width: `${h.score}%`, background: h.score >= 75 ? 'var(--success)' : h.score >= 60 ? 'var(--gold)' : 'var(--danger)' }} />
                </div>
                <span className="text-[11px] font-bold shrink-0" style={{ color: h.score >= 75 ? 'var(--success)' : h.score >= 60 ? 'var(--gold)' : 'var(--danger)' }}>{h.score}</span>
              </div>
              <div className="flex gap-1 flex-wrap">
                {h.tags.map(t => <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: 'var(--accent-glow)', color: 'var(--accent2)' }}>{t}</span>)}
              </div>
              <div className="text-[9px] mt-1.5" style={{ color: 'var(--text3)' }}>{h.date}</div>
            </div>
          ))}
        </div>

        <div className="text-[11px] font-semibold mt-5 mb-2 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>팀 종합 리포트</div>
        <div className="p-3 rounded-xl border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
          {[['포지셔닝', 72], ['교전 타이밍', 65], ['팀 협력', 85], ['작전 수행', 70]].map(([label, val]) => (
            <div key={label as string} className="mb-2.5 last:mb-0">
              <div className="flex justify-between text-[10px] mb-1" style={{ color: 'var(--text2)' }}>
                <span>{label}</span><span style={{ color: 'var(--text)' }}>{val}</span>
              </div>
              <div className="h-1 rounded-full overflow-hidden" style={{ background: 'var(--card2)' }}>
                <div className="h-full rounded-full" style={{ width: `${val}%`, background: 'var(--accent)' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
