export type DrawTool = 'select' | 'pen' | 'arrow' | 'line' | 'sticker' | 'member' | 'eraser';

export type DrawObject =
  | { type: 'path'; points: { x: number; y: number }[]; color: string; width: number; id: string }
  | { type: 'arrow'; x1: number; y1: number; x2: number; y2: number; color: string; width: number; id: string }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number; color: string; width: number; id: string }
  | { type: 'sticker'; icon: string; label: string; x: number; y: number; id: string }
  | { type: 'member'; name: string; color: string; x: number; y: number; id: string };

export type MapKey = 'map75' | 'map200' | 'map234' | 'map22';

export const MAP_NAMES: Record<MapKey, string> = {
  map75: '더스트2 변형',
  map200: '좁은 통로맵',
  map234: '인페르노 변형',
  map22: '멀티레이어맵',
};

export const STICKER_LABELS: Record<string, string> = {
  '📍': '집결',
  '💣': '폭탄',
  '🛡️': '방어',
  '🎯': '저격',
  '⚡': '돌격',
  '🤝': '협공',
  '⚠️': '위험',
  '🔭': '관측',
  '🏁': '목표',
};

export interface Operation {
  id: string;
  name: string;
  mapKey: MapKey;
  objects: DrawObject[];
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClanMember {
  id: string;
  nickname: string;
  color: string;
  role: 'leader' | 'subleader' | 'elite' | 'member' | 'recruit';
}

export const ROLE_LABELS: Record<ClanMember['role'], string> = {
  leader: '클랜장',
  subleader: '부클랜장',
  elite: '정예',
  member: '일반',
  recruit: '수습',
};

export const COLORS = ['#e8a020', '#e05050', '#40b870', '#4090e0', '#a040e0', '#e040a0', '#40d0d0', '#ffffff'];
