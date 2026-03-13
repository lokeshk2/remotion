import { useMemo } from 'react';
import { random, useCurrentFrame, useVideoConfig } from 'remotion';
import { FONT } from '../constants';

const DATA_WORDS = [
  'Wikipedia', 'Books', 'Reddit', 'GitHub', 'arXiv',
  'News', 'Code', 'Forums', 'Docs', 'Papers',
  'Blogs', 'Scripts', 'Web', 'Chat', 'Novels',
];

const ROWS_PER_COL = 20;

// Static row style shared by all word divs
const ROW_BASE_STYLE = {
  fontFamily: FONT.mono,
  fontSize: 22,
  fontWeight: 600,
  whiteSpace: 'nowrap',
  textShadow: '0 0 10px rgba(6, 182, 212, 0.5)',
};

export const DataStream = ({ columnCount = 6 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Pre-compute per-column and per-cell static data once
  const columns = useMemo(
    () =>
      Array.from({ length: columnCount }, (_, col) => {
        const speed = random(`spd-${col}`) * 2 + 1;
        const offset = random(`off-${col}`) * -height;
        const x = (col / columnCount) * width + 40;
        const rows = Array.from({ length: ROWS_PER_COL }, (__, row) => {
          const wordIdx = Math.floor(random(`w-${col}-${row}`) * DATA_WORDS.length);
          const alpha = random(`a-${col}-${row}`) * 0.6 + 0.2;
          return { word: DATA_WORDS[wordIdx], color: `rgba(6, 182, 212, ${alpha})` };
        });
        return { x, speed, offset, rows };
      }),
    [columnCount, width, height]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {columns.map((col, ci) => (
        <div
          key={ci}
          style={{
            position: 'absolute',
            left: col.x,
            top: 0,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            transform: `translateY(${(frame * col.speed + col.offset + height) % (height * 1.5) - height * 0.5}px)`,
          }}
        >
          {col.rows.map((row, ri) => (
            <div key={ri} style={{ ...ROW_BASE_STYLE, color: row.color }}>
              {row.word}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
