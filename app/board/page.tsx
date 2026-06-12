'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Topbar from '@/components/Layout/Topbar';
import Toolbar from '@/components/MapBoard/Toolbar';
import MemberOverlay from '@/components/MapBoard/MemberOverlay';
import StickerPanel from '@/components/MapBoard/StickerPanel';
import { useCanvas } from '@/hooks/useCanvas';

const DISCORD_INVITE = 'https://discord.gg/your-clan';

type PreviewObject =
  | { type: 'preview-path'; points: { x: number; y: number }[]; color: string; width: number }
  | { type: 'preview-arrow'; x1: number; y1: number; x2: number; y2: number; color: string; width: number }
  | { type: 'preview-line'; x1: number; y1: number; x2: number; y2: number; color: string; width: number };

const MapCanvas = dynamic(() => import('@/components/MapBoard/MapCanvas'), { ssr: false });

export default function BoardPage() {
  const [opName, setOpName] = useState('A사이트 속공');
  const [preview, setPreview] = useState<PreviewObject | null>(null);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const canvasWrapRef = useRef<HTMLDivElement>(null);

  const {
    objects,
    currentTool, setCurrentTool,
    currentColor, setCurrentColor,
    strokeWidth, setStrokeWidth,
    currentMap, setCurrentMap,
    selectedSticker, setSelectedSticker,
    pendingMember,
    undo, clearAll, placeMember, placeMemberAt,
    onMouseDown, onMouseMove, onMouseUp,
  } = useCanvas();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') { e.preventDefault(); undo(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [undo]);

  const cursor = currentTool === 'pen' ? 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'%3E%3Cpath d=\'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a1 1 0 0 0 0-1.41l-2.34-2.34a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z\' fill=\'%23ffffff\' stroke=\'%23000000\' stroke-width=\'0.5\'/%3E%3C/svg%3E") 0 24, crosshair' : ['arrow', 'line', 'sticker'].includes(currentTool) ? 'crosshair' : 'default';

  const modeLabel = pendingMember
    ? `${pendingMember.name} 배치 — 맵 클릭`
    : { pen: '경로 그리기', arrow: '화살표 그리기', line: '직선 그리기', sticker: '스티커 배치', member: '팀원 마커 배치', eraser: '지우개', select: '' }[currentTool];

  const handleSave = () => alert(`"${opName}" 작전이 저장되었습니다.`);
  const handleClear = () => { if (confirm('모든 작전 내용을 지울까요?')) clearAll(); };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ color: 'var(--text)', fontFamily: "'Pretendard','Noto Sans KR',sans-serif" }}>
      <Topbar
        opName={opName}
        currentMap={currentMap}
        onOpNameChange={setOpName}
        onMapChange={map => setCurrentMap(map)}
        onUndo={undo}
        onClear={handleClear}
        onSave={handleSave}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* 좌측 툴바 — 드로잉 도구만 */}
        <Toolbar currentTool={currentTool} onToolChange={setCurrentTool} />

        {/* 캔버스 — 팀원 오버레이 포함 */}
        <div
          ref={canvasWrapRef}
          className="flex-1 relative overflow-hidden"
          onDragOver={e => e.preventDefault()}
          onDrop={e => {
            e.preventDefault();
            const name = e.dataTransfer.getData('member-nickname');
            const color = e.dataTransfer.getData('member-color');
            if (!name || !canvasWrapRef.current) return;
            const rect = canvasWrapRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            placeMemberAt(name, color, x, y);
          }}
        >
          <MapCanvas
            objects={objects}
            preview={preview}
            currentMap={currentMap}
            cursor={cursor}
            onMouseDown={onMouseDown}
            onMouseMove={pos => { const p = onMouseMove(pos); setPreview(p); return p; }}
            onMouseUp={onMouseUp}
            setPreview={setPreview}
          />

          {/* 현재 모드 표시 */}
          {modeLabel && (
            <div className="absolute top-3 left-3 rounded-full px-3 py-1 text-[11px] pointer-events-none" style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid var(--border2)', color: 'var(--accent2)' }}>
              {modeLabel}
            </div>
          )}

          {/* 좌측 하단 그룹: 링크 공유 + 음성 채널 버튼 + 팀원 현황 오버레이 */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2" style={{ zIndex: 10 }}>
            {/* 링크 공유 + 음성 채널 */}
            <div className="flex gap-1.5">
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap"
                style={{
                  border: copied ? '1px solid rgba(64,184,112,0.5)' : '1px solid var(--border2)',
                  background: copied ? 'rgba(64,184,112,0.15)' : 'rgba(13,13,26,0.9)',
                  color: copied ? 'var(--success)' : 'var(--text2)',
                  backdropFilter: 'blur(6px)',
                }}
              >
                {copied ? '✓ 복사됨' : '🔗 링크 공유'}
              </button>
              <button
                onClick={() => window.open(DISCORD_INVITE, '_blank')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all whitespace-nowrap hover:brightness-110"
                style={{ background: '#5865F2', color: '#fff', border: 'none', backdropFilter: 'blur(6px)' }}
              >
                <svg width="13" height="10" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.4a40.8 40.8 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.3 0A40.8 40.8 0 0 0 25.6.4 58.4 58.4 0 0 0 11 4.9C1.6 18.9-1 32.6.3 46.1a58.9 58.9 0 0 0 18 9.1 44.5 44.5 0 0 0 3.8-6.3 38.4 38.4 0 0 1-6-2.9l1.5-1.1a41.9 41.9 0 0 0 35.7 0l1.5 1.1a38.3 38.3 0 0 1-6 2.9 44.5 44.5 0 0 0 3.9 6.3 58.7 58.7 0 0 0 17.9-9.1C72.2 30.4 68.8 16.8 60.1 4.9ZM23.7 37.9c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Z" fill="white"/>
                </svg>
                음성 채널
              </button>
            </div>

            {/* 팀원 배치 오버레이 */}
            <MemberOverlay onPlaceMember={placeMember} />
          </div>

          {/* 상태 표시 */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 rounded-full px-4 py-1.5 text-[11px] pointer-events-none" style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid var(--border2)', color: 'var(--text2)' }}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--text3)' }} />
              오프라인
            </span>
            <span style={{ color: 'var(--border2)' }}>|</span>
            <span>오브젝트 {objects.length}개</span>
          </div>
        </div>

        {/* 우측 패널 — 도구 설정 */}
        <div className="w-[260px] flex flex-col overflow-hidden shrink-0" style={{ background: 'var(--surface)', borderLeft: '1px solid var(--border)' }}>
          <div className="px-4 py-3 shrink-0" style={{ borderBottom: '1px solid var(--border)' }}>
            <div className="text-[12px] font-semibold" style={{ color: 'var(--text)' }}>도구 설정</div>
          </div>
          <div className="flex-1 overflow-y-auto">
            <StickerPanel
              selectedSticker={selectedSticker}
              currentColor={currentColor}
              strokeWidth={strokeWidth}
              onStickerSelect={icon => { setSelectedSticker(icon); setCurrentTool('sticker'); }}
              onColorChange={setCurrentColor}
              onStrokeChange={setStrokeWidth}
            />
          </div>
          <div className="px-4 py-4 shrink-0" style={{ borderTop: '1px solid var(--border)' }}>
            <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text2)' }}>작전 메모</div>
            <textarea
              placeholder="작전 내용, 타이밍, 콜사인 등..."
              rows={4}
              className="w-full rounded-lg text-[11px] p-3 resize-none outline-none leading-relaxed transition-all"
              style={{ background: 'var(--card)', border: '1px solid var(--border2)', color: 'var(--text)' }}
              onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
              onBlur={e => e.currentTarget.style.borderColor = 'var(--border2)'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
