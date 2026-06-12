'use client';
import { useRef, useState, useCallback } from 'react';
import { DrawObject, DrawTool, MapKey, STICKER_LABELS } from '@/types/board';

function generateId() {
  return Math.random().toString(36).slice(2, 10);
}

export function useCanvas() {
  const [objects, setObjects] = useState<DrawObject[]>([]);
  const [history, setHistory] = useState<DrawObject[][]>([]);
  const [currentTool, setCurrentTool] = useState<DrawTool>('pen');
  const [currentColor, setCurrentColor] = useState('#e8a020');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [currentMap, setCurrentMap] = useState<MapKey>('map75');
  const [selectedSticker, setSelectedSticker] = useState('?뱧');
  const [pendingMember, setPendingMember] = useState<{ name: string; color: string } | null>(null);

  const isDrawingRef = useRef(false);
  const drawPathRef = useRef<{ x: number; y: number }[]>([]);
  const lineStartRef = useRef<{ x: number; y: number } | null>(null);

  const saveHistory = useCallback((current: DrawObject[]) => {
    setHistory(prev => {
      const next = [...prev, current];
      return next.length > 30 ? next.slice(1) : next;
    });
  }, []);

  const undo = useCallback(() => {
    setHistory(prev => {
      if (prev.length === 0) return prev;
      const restored = prev[prev.length - 1];
      setObjects(restored);
      return prev.slice(0, -1);
    });
  }, []);

  const clearAll = useCallback(() => {
    setObjects(prev => {
      saveHistory(prev);
      return [];
    });
  }, [saveHistory]);

  const onMouseDown = useCallback((pos: { x: number; y: number }) => {
    if (currentTool === 'pen') {
      setObjects(prev => { saveHistory(prev); return prev; });
      isDrawingRef.current = true;
      drawPathRef.current = [pos];
    } else if (currentTool === 'arrow' || currentTool === 'line') {
      setObjects(prev => { saveHistory(prev); return prev; });
      isDrawingRef.current = true;
      lineStartRef.current = pos;
    } else if (currentTool === 'sticker') {
      setObjects(prev => {
        saveHistory(prev);
        return [...prev, {
          type: 'sticker',
          icon: selectedSticker,
          label: STICKER_LABELS[selectedSticker] || '',
          x: pos.x, y: pos.y,
          id: generateId(),
        }];
      });
    } else if (currentTool === 'member' && pendingMember) {
      setObjects(prev => {
        saveHistory(prev);
        return [...prev, {
          type: 'member',
          name: pendingMember.name,
          color: pendingMember.color,
          x: pos.x, y: pos.y,
          id: generateId(),
        }];
      });
      setPendingMember(null);
      setCurrentTool('select');
    }
  }, [currentTool, selectedSticker, pendingMember, saveHistory]);

  const onMouseMove = useCallback((pos: { x: number; y: number }) => {
    if (!isDrawingRef.current) return null;
    if (currentTool === 'pen') {
      drawPathRef.current.push(pos);
      return { type: 'preview-path' as const, points: [...drawPathRef.current], color: currentColor, width: strokeWidth };
    } else if ((currentTool === 'arrow' || currentTool === 'line') && lineStartRef.current) {
      return {
        type: ('preview-' + currentTool) as 'preview-arrow' | 'preview-line',
        x1: lineStartRef.current.x, y1: lineStartRef.current.y,
        x2: pos.x, y2: pos.y,
        color: currentColor, width: strokeWidth,
      };
    }
    return null;
  }, [currentTool, currentColor, strokeWidth]);

  const onMouseUp = useCallback((pos: { x: number; y: number }) => {
    if (!isDrawingRef.current) return;
    if (currentTool === 'pen') {
      const pts = drawPathRef.current;
      if (pts.length > 1) {
        setObjects(prev => [...prev, { type: 'path', points: [...pts], color: currentColor, width: strokeWidth, id: generateId() }]);
      }
    } else if (currentTool === 'arrow' && lineStartRef.current) {
      const s = lineStartRef.current;
      if (Math.hypot(pos.x - s.x, pos.y - s.y) > 5) {
        setObjects(prev => [...prev, { type: 'arrow', x1: s.x, y1: s.y, x2: pos.x, y2: pos.y, color: currentColor, width: strokeWidth, id: generateId() }]);
      }
    } else if (currentTool === 'line' && lineStartRef.current) {
      const s = lineStartRef.current;
      if (Math.hypot(pos.x - s.x, pos.y - s.y) > 5) {
        setObjects(prev => [...prev, { type: 'line', x1: s.x, y1: s.y, x2: pos.x, y2: pos.y, color: currentColor, width: strokeWidth, id: generateId() }]);
      }
    }
    isDrawingRef.current = false;
    drawPathRef.current = [];
    lineStartRef.current = null;
  }, [currentTool, currentColor, strokeWidth]);

  const placeMember = useCallback((name: string, color: string) => {
    setPendingMember({ name, color });
    setCurrentTool('member');
  }, []);

  const placeMemberAt = useCallback((name: string, color: string, x: number, y: number) => {
    setObjects(prev => {
      saveHistory(prev);
      return [...prev, { type: 'member', name, color, x, y, id: generateId() }];
    });
  }, [saveHistory]);

  return {
    objects, history,
    currentTool, setCurrentTool,
    currentColor, setCurrentColor,
    strokeWidth, setStrokeWidth,
    currentMap, setCurrentMap,
    selectedSticker, setSelectedSticker,
    pendingMember,
    undo, clearAll, placeMember, placeMemberAt,
    onMouseDown, onMouseMove, onMouseUp,
  };
}
