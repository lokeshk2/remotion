import { useMemo } from 'react';
import { random, useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';

export const ParticleField = ({
  count = 60,
  color = 'rgba(124, 58, 237, 0.7)',
  speedFactor = 200,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  // Pre-compute frame-independent particle data once per prop change
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const size = random(`ps-${i}`) * 5 + 1;
        return {
          baseX: random(`px-${i}`) * width,
          baseY: random(`py-${i}`) * height,
          size,
          boxShadow: size > 3 ? `0 0 ${size * 3}px ${color}` : 'none',
        };
      }),
    [count, width, height, color]
  );

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {particles.map((p, i) => {
        const nx = noise2D('nx', i * 0.3, frame / speedFactor) * 90;
        const ny = noise2D('ny', i * 0.3, frame / speedFactor) * 90;
        const alpha = ((noise2D('op', i * 0.7, frame / 120) + 1) / 2) * 0.9 + 0.1;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: p.baseX + nx,
              top: p.baseY + ny,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: color,
              opacity: alpha,
              boxShadow: p.boxShadow,
            }}
          />
        );
      })}
    </div>
  );
};
