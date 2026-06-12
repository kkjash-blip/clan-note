'use client';
import { useState } from 'react';

const MEMBERS = [
  { id: 'ace',    name: 'AceKiller', color: '#e8a020' },
  { id: 'shadow', name: 'ShadowX',   color: '#e05050' },
  { id: 'ghost',  name: 'GhostSnipe',color: '#40b870' },
  { id: 'iron',   name: 'IronWall',  color: '#4090e0' },
  { id: 'rocket', name: 'RocketFly', color: '#a040e0' },
];

const ME = 'ace'; // 현재 로그인 유저

const DAYS = ['월', '화', '수', '목', '금', '토', '일'];
const HOURS = [18, 19, 20, 21, 22, 23, 0, 1, 2]; // 게임 가능 시간대
const HOUR_LABEL = (h: number) => `${h === 0 ? '00' : h}:00`;

// 날짜 계산 (이번 주 월~일)
function getWeekDates(offset = 0) {
  const today = new Date();
  const mon = new Date(today);
  mon.setDate(today.getDate() - ((today.getDay() + 6) % 7) + offset * 7);
  return DAYS.map((_, i) => {
    const d = new Date(mon);
    d.setDate(mon.getDate() + i);
    return d;
  });
}

type Slot = { [memberId: string]: boolean };
type Schedule = { [key: string]: Slot }; // key = "dayIdx-hour"

// 초기 데이터 (샘플)
const INITIAL: Schedule = {
  '0-20': { shadow: true, ghost: true },
  '0-21': { shadow: true, ghost: true, iron: true },
  '0-22': { shadow: true, ghost: true, iron: true },
  '1-20': { ace: true, shadow: true },
  '1-21': { ace: true, shadow: true, rocket: true },
  '2-21': { ghost: true, iron: true },
  '2-22': { ghost: true, iron: true },
  '4-20': { ace: true, shadow: true, ghost: true, iron: true },
  '4-21': { ace: true, shadow: true, ghost: true, iron: true, rocket: true },
  '4-22': { ace: true, shadow: true, ghost: true },
  '5-19': { ace: true, shadow: true, ghost: true, iron: true, rocket: true },
  '5-20': { ace: true, shadow: true, ghost: true, iron: true, rocket: true },
  '5-21': { ace: true, shadow: true, ghost: true, iron: true, rocket: true },
  '5-22': { ace: true, shadow: true, iron: true, rocket: true },
  '6-20': { shadow: true, ghost: true, rocket: true },
  '6-21': { shadow: true, ghost: true, rocket: true },
};

function getCellBg(count: number, total: number) {
  if (count === 0) return 'transparent';
  const ratio = count / total;
  if (ratio >= 1)   return 'rgba(108,99,255,0.85)';
  if (ratio >= 0.6) return 'rgba(108,99,255,0.55)';
  if (ratio >= 0.4) return 'rgba(108,99,255,0.35)';
  return 'rgba(108,99,255,0.18)';
}

export default function CalendarPage() {
  const [schedule, setSchedule] = useState<Schedule>(INITIAL);
  const [weekOffset, setWeekOffset] = useState(0);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const weekDates = getWeekDates(weekOffset);
  const today = new Date();

  const toggle = (dayIdx: number, hour: number) => {
    const key = `${dayIdx}-${hour}`;
    setSchedule(prev => {
      const slot = { ...(prev[key] || {}) };
      if (slot[ME]) delete slot[ME];
      else slot[ME] = true;
      return { ...prev, [key]: slot };
    });
  };

  const getSlot = (dayIdx: number, hour: number): Slot =>
    schedule[`${dayIdx}-${hour}`] || {};

  const getCount = (dayIdx: number, hour: number) =>
    Object.values(getSlot(dayIdx, hour)).filter(Boolean).length;

  const isMe = (dayIdx: number, hour: number) =>
    !!getSlot(dayIdx, hour)[ME];

  const isSameDay = (d: Date) =>
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear();

  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Header */}
        <div className="px-8 pt-7 pb-4 shrink-0">
          <div className="flex items-center gap-1.5 text-[11px] mb-4" style={{ color: 'var(--text2)' }}>
            <span>내 클랜</span><span>/</span><span style={{ color: 'var(--text)' }}>클랜 캘린더</span>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold flex items-center gap-2" style={{ color: 'var(--text)' }}>
                <span>📅</span> 클랜 캘린더
              </h1>
              <p className="text-[12px] mt-1" style={{ color: 'var(--text2)' }}>
                게임 가능한 시간대를 클릭해서 체크하세요. 팀원들의 일정을 한눈에 확인할 수 있습니다.
              </p>
            </div>
            {/* Week nav */}
            <div className="flex items-center gap-2">
              <button onClick={() => setWeekOffset(w => w - 1)} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:bg-white/10" style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>←</button>
              <button onClick={() => setWeekOffset(0)} className="px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all hover:bg-white/5" style={{ border: '1px solid var(--border2)', color: weekOffset === 0 ? 'var(--accent2)' : 'var(--text2)' }}>
                이번 주
              </button>
              <button onClick={() => setWeekOffset(w => w + 1)} className="w-8 h-8 rounded-lg flex items-center justify-center text-sm transition-all hover:bg-white/10" style={{ border: '1px solid var(--border2)', color: 'var(--text2)' }}>→</button>
            </div>
          </div>
        </div>

        {/* Calendar grid */}
        <div className="flex-1 overflow-auto px-8 pb-8">
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--card)', minWidth: '640px' }}>

            {/* Day headers */}
            <div className="grid" style={{ gridTemplateColumns: '52px repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
              <div style={{ borderRight: '1px solid var(--border)' }} />
              {weekDates.map((d, i) => {
                const isToday = isSameDay(d);
                return (
                  <div key={i} className="py-3 text-center" style={{ borderRight: i < 6 ? '1px solid var(--border)' : undefined }}>
                    <div className="text-[10px] font-semibold uppercase mb-1" style={{ color: i >= 5 ? 'var(--accent2)' : 'var(--text2)' }}>{DAYS[i]}</div>
                    <div className={`text-[15px] font-bold mx-auto w-7 h-7 flex items-center justify-center rounded-full`}
                      style={{
                        color: isToday ? '#fff' : i >= 5 ? 'var(--accent2)' : 'var(--text)',
                        background: isToday ? 'var(--accent)' : 'transparent',
                      }}>
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Time rows */}
            {HOURS.map((hour, hi) => (
              <div key={hour} className="grid" style={{ gridTemplateColumns: '52px repeat(7, 1fr)', borderBottom: hi < HOURS.length - 1 ? '1px solid var(--border)' : undefined }}>
                {/* Hour label */}
                <div className="flex items-center justify-center text-[10px] font-medium py-2 shrink-0" style={{ color: 'var(--text3)', borderRight: '1px solid var(--border)', minHeight: '48px' }}>
                  {HOUR_LABEL(hour)}
                </div>

                {/* Day cells */}
                {DAYS.map((_, di) => {
                  const key = `${di}-${hour}`;
                  const slot = getSlot(di, hour);
                  const count = getCount(di, hour);
                  const me = isMe(di, hour);
                  const isHovered = hoveredKey === key;
                  const memberList = MEMBERS.filter(m => slot[m.id]);

                  return (
                    <div
                      key={di}
                      onClick={() => toggle(di, hour)}
                      onMouseEnter={() => setHoveredKey(key)}
                      onMouseLeave={() => setHoveredKey(null)}
                      className="relative flex items-center justify-center cursor-pointer transition-all"
                      style={{
                        minHeight: '48px',
                        borderRight: di < 6 ? '1px solid var(--border)' : undefined,
                        background: me
                          ? isHovered ? 'rgba(108,99,255,0.5)' : getCellBg(count, MEMBERS.length)
                          : isHovered ? 'rgba(255,255,255,0.04)' : getCellBg(count, MEMBERS.length),
                      }}
                    >
                      {/* Member avatar dots */}
                      {memberList.length > 0 && (
                        <div className="flex items-center justify-center gap-0.5 flex-wrap px-2">
                          {memberList.slice(0, 5).map(m => (
                            <div
                              key={m.id}
                              className="w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-bold shrink-0"
                              style={{
                                background: m.color + '33',
                                color: m.color,
                                border: `1px solid ${m.color}88`,
                                outline: m.id === ME ? `2px solid ${m.color}` : undefined,
                                outlineOffset: '1px',
                              }}
                              title={m.name}
                            >
                              {m.name[0]}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Hover: "내 일정 추가/제거" hint */}
                      {isHovered && memberList.length === 0 && (
                        <span className="text-[10px]" style={{ color: 'var(--text3)' }}>+ 나</span>
                      )}

                      {/* Count badge */}
                      {count >= 3 && (
                        <div className="absolute top-1 right-1 text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center" style={{ background: 'rgba(108,99,255,0.9)', color: '#fff' }}>
                          {count}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-[220px] shrink-0 h-full overflow-y-auto border-l py-6 px-4" style={{ borderColor: 'var(--border)', background: 'var(--surface)' }}>

        {/* 내 일정 현황 */}
        <div className="text-[11px] font-semibold mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>내 가능 시간</div>
        {(() => {
          const mySlots: string[] = [];
          DAYS.forEach((day, di) => {
            const hours = HOURS.filter(h => schedule[`${di}-${h}`]?.[ME]);
            if (hours.length > 0) mySlots.push(`${day}요일 ${hours.map(HOUR_LABEL).join(', ')}`);
          });
          return mySlots.length > 0
            ? mySlots.map((s, i) => (
              <div key={i} className="text-[11px] px-3 py-2 rounded-lg mb-1.5" style={{ background: 'var(--card)', color: 'var(--text)', border: '1px solid rgba(108,99,255,0.2)' }}>{s}</div>
            ))
            : <div className="text-[11px] px-3 py-2 rounded-lg" style={{ background: 'var(--card)', color: 'var(--text3)' }}>클릭해서 가능한 시간을 선택하세요.</div>;
        })()}

        {/* 팀원 범례 */}
        <div className="text-[11px] font-semibold mt-6 mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>팀원</div>
        {MEMBERS.map(m => {
          const cnt = HOURS.reduce((acc, h) => acc + DAYS.reduce((a, _, di) => a + (schedule[`${di}-${h}`]?.[m.id] ? 1 : 0), 0), 0);
          return (
            <div key={m.id} className="flex items-center gap-2.5 px-3 py-2 rounded-lg mb-1 border" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>
              <div className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold shrink-0"
                style={{ background: m.color + '22', color: m.color, border: `1px solid ${m.color}66`, outline: m.id === ME ? `2px solid ${m.color}` : undefined, outlineOffset: '1px' }}>
                {m.name[0]}
              </div>
              <span className="flex-1 text-[11px] truncate" style={{ color: m.id === ME ? 'var(--text)' : 'var(--text2)', fontWeight: m.id === ME ? 600 : 400 }}>
                {m.name}{m.id === ME ? ' (나)' : ''}
              </span>
              <span className="text-[10px] shrink-0" style={{ color: 'var(--text3)' }}>{cnt}h</span>
            </div>
          );
        })}

        {/* 이번 주 최다 겹치는 시간 */}
        <div className="text-[11px] font-semibold mt-6 mb-3 uppercase tracking-wider" style={{ color: 'var(--text2)' }}>베스트 타임</div>
        {(() => {
          const best = Object.entries(schedule)
            .map(([key, slot]) => ({ key, count: Object.values(slot).filter(Boolean).length }))
            .filter(x => x.count >= 3)
            .sort((a, b) => b.count - a.count)
            .slice(0, 4);
          if (best.length === 0) return <div className="text-[11px]" style={{ color: 'var(--text3)' }}>아직 데이터가 없습니다.</div>;
          return best.map(({ key, count }) => {
            const [di, h] = key.split('-').map(Number);
            return (
              <div key={key} className="flex items-center justify-between px-3 py-2 rounded-lg mb-1.5 border" style={{ background: 'var(--card)', borderColor: 'rgba(108,99,255,0.2)' }}>
                <span className="text-[11px]" style={{ color: 'var(--text)' }}>{DAYS[di]}요일 {HOUR_LABEL(h)}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ background: 'rgba(108,99,255,0.2)', color: 'var(--accent2)' }}>{count}명</span>
              </div>
            );
          });
        })()}
      </div>
    </div>
  );
}
