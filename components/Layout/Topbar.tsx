'use client';
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

export default function Topbar({ opName, currentMap, onOpNameChange, onMapChange, onUndo, onClear, onSave }: Props) {
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
