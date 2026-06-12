'use client';
import { Operation } from '@/types/board';

const SAMPLE_OPS: Operation[] = [
  { id: '1', name: 'A사이트 속공', mapKey: 'map75', objects: [], notes: '', createdAt: '2026-06-10', updatedAt: '2026-06-10' },
  { id: '2', name: 'B사이트 우회', mapKey: 'map200', objects: [], notes: '', createdAt: '2026-06-09', updatedAt: '2026-06-09' },
  { id: '3', name: '미드 압박 전술', mapKey: 'map234', objects: [], notes: '', createdAt: '2026-06-08', updatedAt: '2026-06-08' },
];

interface Props {
  currentOpName: string;
  onLoad: (op: Operation) => void;
}

export default function OpsPanel({ currentOpName, onLoad }: Props) {
  return (
    <div className="px-4 py-3">
      <div className="text-[10px] font-semibold text-[#8b90a0] tracking-wider uppercase mb-2">저장된 작전</div>
      <div className="flex flex-col gap-1.5">
        {SAMPLE_OPS.map(op => (
          <button
            key={op.id}
            onClick={() => onLoad(op)}
            className={`px-3 py-2 rounded-lg border text-left transition-all
              ${op.name === currentOpName
                ? 'border-[#e8a020] bg-[rgba(232,160,32,0.08)]'
                : 'border-white/14 bg-[#1e2230] hover:border-[#e8a020]'}`}
          >
            <div className="text-[11px] font-medium text-[#e8eaf0]">{op.name}</div>
            <div className="text-[10px] text-[#8b90a0] mt-0.5">{op.mapKey} · {op.createdAt}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
