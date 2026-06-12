'use client';
import { useState } from 'react';
import { MapKey, MAP_NAMES } from '@/types/board';

interface Props {
  opName: string;
  currentMap: MapKey;
  onOpNameChange: (name: string) => void;
  onMapChange: (map: MapKey) => void;
  onUndo: () => void;
  onClear: () => void;
  onSave: () => void;
}

const DISCORD_INVITE = 'https://discord.gg/your-clan';

export default function Topbar({ opName, currentMap, onOpNameChange, onMapChange, onUndo, onClear, onSave }: Props) {
  const [copied, setCopied] = useState(false);
  const [discordHover, setDiscordHover] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex items-center gap-2 px-4 h-[48px] shrink-0" style={{ background: 'var(--card)', borderBottom: '1px solid var(--border)' }}>
      <select
        value={currentMap}
        onChange={e => onMapChange(e.target.value as MapKey)}
        className="rounded-lg px-3 py-1.5 text-[12px] cursor-pointer outline-none transition-all"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', height: '32px' }}
      >
        {(Object.keys(MAP_NAMES) as MapKey[]).map(k => (
          <option key={k} value={k}>{MAP_NAMES[k]}</option>
        ))}
      </select>

      <input
        value={opName}
        onChange={e => onOpNameChange(e.target.value)}
        placeholder="작전명..."
        className="rounded-lg px-3 py-1.5 text-[12px] w-[148px] outline-none transition-all"
        style={{ background: 'var(--surface)', border: '1px solid var(--border2)', color: 'var(--text)', height: '32px' }}
        onFocus={e => e.currentTarget.style.borderColor = 'var(--accent)'}
        onBlur={e => e.currentTarget.style.borderColor = 'var(--border2)'}
      />

      <div className="flex-1" />

      {/* Share + Discord */}
      <div className="flex items-center gap-2 mr-1">
        {/* URL 공유 */}
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all whitespace-nowrap"
          style={{
            border: copied ? '1px solid rgba(64,184,112,0.5)' : '1px solid var(--border2)',
            background: copied ? 'rgba(64,184,112,0.1)' : 'var(--surface)',
            color: copied ? 'var(--success)' : 'var(--text2)',
          }}
        >
          {copied ? '✓ 복사됨' : '🔗 링크 공유'}
        </button>

        {/* Discord */}
        <button
          onClick={() => window.open(DISCORD_INVITE, '_blank')}
          onMouseEnter={() => setDiscordHover(true)}
          onMouseLeave={() => setDiscordHover(false)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-semibold transition-all whitespace-nowrap"
          style={{
            background: discordHover ? '#4752c4' : '#5865F2',
            color: '#fff',
            border: 'none',
          }}
        >
          <svg width="16" height="12" viewBox="0 0 71 55" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60.1 4.9A58.5 58.5 0 0 0 45.5.4a40.8 40.8 0 0 0-1.8 3.7 54.1 54.1 0 0 0-16.3 0A40.8 40.8 0 0 0 25.6.4 58.4 58.4 0 0 0 11 4.9C1.6 18.9-1 32.6.3 46.1a58.9 58.9 0 0 0 18 9.1 44.5 44.5 0 0 0 3.8-6.3 38.4 38.4 0 0 1-6-2.9l1.5-1.1a41.9 41.9 0 0 0 35.7 0l1.5 1.1a38.3 38.3 0 0 1-6 2.9 44.5 44.5 0 0 0 3.9 6.3 58.7 58.7 0 0 0 17.9-9.1C72.2 30.4 68.8 16.8 60.1 4.9ZM23.7 37.9c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Zm23.6 0c-3.5 0-6.4-3.2-6.4-7.2s2.8-7.2 6.4-7.2c3.5 0 6.4 3.2 6.3 7.2 0 4-2.8 7.2-6.3 7.2Z" fill="white"/>
          </svg>
          음성 채널
        </button>
      </div>

      {/* Divider */}
      <div className="w-px h-5 shrink-0" style={{ background: 'var(--border2)' }} />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button onClick={onUndo} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-white/5 whitespace-nowrap" style={{ border: '1px solid var(--border2)', background: 'var(--surface)', color: 'var(--text)' }}>
          ↩ 되돌리기
        </button>
        <button onClick={onClear} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium transition-all hover:bg-[rgba(224,80,80,0.1)] whitespace-nowrap" style={{ border: '1px solid rgba(224,80,80,0.3)', background: 'var(--surface)', color: 'var(--danger)' }}>
          전체 지우기
        </button>
        <button onClick={onSave} className="flex items-center gap-2 px-5 py-2 rounded-lg text-[12px] font-semibold transition-all hover:opacity-90 whitespace-nowrap" style={{ background: 'var(--accent)', color: '#fff', border: 'none' }}>
          💾 저장
        </button>
      </div>
    </div>
  );
}
