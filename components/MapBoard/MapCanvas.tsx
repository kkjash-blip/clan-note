'use client';
import { useRef, useEffect, useCallback } from 'react';
import { DrawObject, MapKey } from '@/types/board';

type PreviewObject =
  | { type: 'preview-path'; points: { x: number; y: number }[]; color: string; width: number }
  | { type: 'preview-arrow'; x1: number; y1: number; x2: number; y2: number; color: string; width: number }
  | { type: 'preview-line'; x1: number; y1: number; x2: number; y2: number; color: string; width: number };

interface Props {
  objects: DrawObject[];
  preview: PreviewObject | null;
  currentMap: MapKey;
  cursor: string;
  onMouseDown: (pos: { x: number; y: number }) => void;
  onMouseMove: (pos: { x: number; y: number }) => PreviewObject | null;
  onMouseUp: (pos: { x: number; y: number }) => void;
  setPreview: (p: PreviewObject | null) => void;
}

function drawObject(ctx: CanvasRenderingContext2D, obj: DrawObject | PreviewObject) {
  ctx.save();
  if (obj.type === 'path' || obj.type === 'preview-path') {
    const pts = obj.points;
    if (pts.length < 2) { ctx.restore(); return; }
    ctx.strokeStyle = obj.color; ctx.lineWidth = obj.width;
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.shadowColor = obj.color; ctx.shadowBlur = 4;
    ctx.beginPath(); ctx.moveTo(pts[0].x, pts[0].y);
    pts.slice(1).forEach(p => ctx.lineTo(p.x, p.y));
    ctx.stroke();
  } else if (obj.type === 'arrow' || obj.type === 'preview-arrow') {
    const { x1, y1, x2, y2, color, width } = obj;
    ctx.strokeStyle = color; ctx.fillStyle = color;
    ctx.lineWidth = width; ctx.lineCap = 'round';
    ctx.shadowColor = color; ctx.shadowBlur = 5;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    const a = Math.atan2(y2 - y1, x2 - x1), al = 12 + width * 2;
    ctx.beginPath(); ctx.moveTo(x2, y2);
    ctx.lineTo(x2 - al * Math.cos(a - 0.4), y2 - al * Math.sin(a - 0.4));
    ctx.lineTo(x2 - al * Math.cos(a + 0.4), y2 - al * Math.sin(a + 0.4));
    ctx.closePath(); ctx.fill();
  } else if (obj.type === 'line' || obj.type === 'preview-line') {
    ctx.strokeStyle = obj.color; ctx.lineWidth = obj.width;
    ctx.lineCap = 'round'; ctx.shadowColor = obj.color; ctx.shadowBlur = 3;
    ctx.setLineDash([6, 4]);
    ctx.beginPath(); ctx.moveTo(obj.x1, obj.y1); ctx.lineTo(obj.x2, obj.y2); ctx.stroke();
    ctx.setLineDash([]);
  } else if (obj.type === 'sticker') {
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.shadowColor = 'rgba(0,0,0,0.95)'; ctx.shadowBlur = 12;
    ctx.font = '32px serif';
    ctx.fillStyle = '#fff';
    ctx.fillText(obj.icon, obj.x, obj.y);
    ctx.shadowBlur = 0; ctx.font = 'bold 11px sans-serif';
    ctx.strokeStyle = 'rgba(0,0,0,0.95)'; ctx.lineWidth = 4;
    ctx.strokeText(obj.label, obj.x, obj.y + 22);
    ctx.fillStyle = '#fff'; ctx.fillText(obj.label, obj.x, obj.y + 22);
  } else if (obj.type === 'member') {
    const r = 13;
    ctx.shadowColor = obj.color; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.arc(obj.x, obj.y, r, 0, Math.PI * 2);
    ctx.fillStyle = obj.color + '55'; ctx.strokeStyle = obj.color;
    ctx.lineWidth = 2.5; ctx.fill(); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.font = 'bold 8px sans-serif'; ctx.fillStyle = obj.color;
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(obj.name.slice(0, 3).toUpperCase(), obj.x, obj.y);
    ctx.font = 'bold 9px sans-serif';
    ctx.strokeStyle = 'rgba(0,0,0,0.95)'; ctx.lineWidth = 3;
    ctx.strokeText(obj.name, obj.x, obj.y + r + 9);
    ctx.fillStyle = '#fff'; ctx.fillText(obj.name, obj.x, obj.y + r + 9);
  }
  ctx.restore();
}

export default function MapCanvas({ objects, preview, currentMap, cursor, onMouseDown, onMouseMove, onMouseUp, setPreview }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<Record<string, HTMLImageElement>>({});

  const redrawRef = useRef(null as unknown as () => void);

  const redraw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0d1117';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const img = imagesRef.current[currentMap];
    if (img) {
      const cw = canvas.width, ch = canvas.height;
      const ir = img.width / img.height, cr = cw / ch;
      let dw, dh, dx, dy;
      if (ir > cr) { dw = cw; dh = dw / ir; dx = 0; dy = (ch - dh) / 2; }
      else { dh = ch; dw = dh * ir; dx = (cw - dw) / 2; dy = 0; }
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(0, 0, cw, ch);
    }

    objects.forEach(obj => drawObject(ctx, obj));
    if (preview) drawObject(ctx, preview);
  }, [objects, preview, currentMap]);

  redrawRef.current = redraw;

  useEffect(() => { redraw(); }, [redraw]);

  useEffect(() => {
    const maps: string[] = ['map75', 'map200', 'map234', 'map22'];
    maps.forEach(key => {
      const img = new Image();
      img.onload = () => {
        imagesRef.current[key] = img;
        redrawRef.current();
      };
      img.onerror = () => console.error('Map image load failed: /maps/' + key + '.jpg');
      img.src = '/maps/' + key + '.jpg';
    });
  }, []);

  useEffect(() => {
    const resize = () => {
      const canvas = canvasRef.current;
      const wrap = wrapRef.current;
      if (!canvas || !wrap) return;
      const r = wrap.getBoundingClientRect();
      if (r.width === 0 || r.height === 0) return;
      canvas.width = r.width;
      canvas.height = r.height;
      redrawRef.current();
    };
    resize();
    const t = setTimeout(resize, 50);
    const ro = new ResizeObserver(resize);
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener('resize', resize);
    return () => { clearTimeout(t); ro.disconnect(); window.removeEventListener('resize', resize); };
  }, []);

  const getPos = (e: React.MouseEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div ref={wrapRef} id="canvasWrap" className="absolute inset-0 bg-[#0a0c10]">
      <canvas
        ref={canvasRef}
        style={{ display: 'block', cursor }}
        onMouseDown={e => onMouseDown(getPos(e))}
        onMouseMove={e => { const p = onMouseMove(getPos(e)); setPreview(p); }}
        onMouseUp={e => { onMouseUp(getPos(e)); setPreview(null); }}
        onMouseLeave={() => setPreview(null)}
      />
    </div>
  );
}
