import { interpolate, useCurrentFrame, spring, useVideoConfig } from 'remotion';
import { GradientText } from './GlowText';
import { COLORS, FONT } from '../constants';

export const StatCounter = ({ value, label, delay = 0, gradient, unit = '' }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const adjustedFrame = Math.max(0, frame - delay);

  const appear = spring({
    frame: adjustedFrame,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const progress = interpolate(adjustedFrame, [0, 50], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const displayValue = typeof value === 'number'
    ? Math.round(value * progress)
    : value;

  return (
    <div
      style={{
        transform: `scale(${appear}) translateY(${interpolate(appear, [0, 1], [40, 0])}px)`,
        opacity: appear,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 8,
        padding: '40px 50px',
        background: COLORS.bgCard,
        borderRadius: 24,
        border: `1px solid ${COLORS.bgCardBorder}`,
        backdropFilter: 'blur(12px)',
        boxShadow: '0 0 40px rgba(124, 58, 237, 0.15)',
        minWidth: 300,
      }}
    >
      <GradientText gradient={gradient} size={90} weight={900}>
        {displayValue}{unit}
      </GradientText>
      <span
        style={{
          color: 'rgba(255,255,255,0.7)',
          fontSize: 28,
          fontFamily: FONT.display,
          fontWeight: 500,
          textAlign: 'center',
          maxWidth: 280,
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
  );
};
