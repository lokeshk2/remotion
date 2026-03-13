import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText } from '../components/GradientText';
import { IconBadge } from '../components/Card';
import { COLORS, GRADIENTS, FONT } from '../constants';

const BENEFITS = [
  {
    audience: 'Developers', emoji: '👨‍💻', color: COLORS.primary, gradient: GRADIENTS.primary, delay: 30,
    points: ['Build once, works everywhere', 'No more custom integrations', 'Open standard — free forever', '10× faster tool development'],
  },
  {
    audience: 'Businesses', emoji: '🏢', color: COLORS.secondary, gradient: GRADIENTS.cool, delay: 100,
    points: ['AI that knows your systems', 'Secure controlled access', 'Instant AI workflows', 'No vendor lock-in'],
  },
  {
    audience: 'Everyone', emoji: '🌍', color: COLORS.accent, gradient: GRADIENTS.teal, delay: 170,
    points: ['AI that truly helps', 'Complex tasks automated', 'Natural language control', 'Real results, not just chat'],
  },
];

export const BenefitsScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <SceneWrapper gap={32} padding="80px 60px">
      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.primary} size={88} weight={900} style={{ letterSpacing: '-1.5px' }}>
          Why It Matters
        </GradientText>
        <div style={{ marginTop: 12, fontFamily: FONT.display, fontSize: 30, color: COLORS.textMuted, fontWeight: 500 }}>
          MCP benefits everyone
        </div>
      </div>

      {/* Benefit cards */}
      {BENEFITS.map(({ audience, emoji, color, gradient, points, delay }, i) => {
        const s   = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 90 } });
        const bob = Math.sin(frame / 22 + i * 2.4) * 5;

        return (
          <div key={i} style={{
            opacity: s,
            transform: `translateY(${interpolate(s, [0, 1], [60, 0])}px) translateY(${bob}px)`,
            width: '100%',
            background: COLORS.bgCard,
            border: `2px solid ${color}33`,
            borderRadius: 28, padding: '26px 32px',
            boxShadow: `0 6px 32px ${color}14`,
          }}>
            {/* Header — uses GradientText component, no inline gradient CSS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
              <IconBadge emoji={emoji} color={color} size={72} />
              <GradientText gradient={gradient} size={36} weight={800}>
                For {audience}
              </GradientText>
            </div>

            {/* Points */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {points.map((point, j) => {
                const ps = spring({ frame: Math.max(0, frame - delay - 20 - j * 14), fps, config: { damping: 16, stiffness: 120 } });
                return (
                  <div key={j} style={{
                    opacity: ps, transform: `translateX(${interpolate(ps, [0, 1], [-20, 0])}px)`,
                    display: 'flex', alignItems: 'center', gap: 14,
                  }}>
                    <div style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: `${color}22`, border: `2px solid ${color}55`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, color, flexShrink: 0, fontWeight: 700,
                    }}>✓</div>
                    <span style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 500, color: COLORS.text }}>{point}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Audio src={whoosh} startFrom={0} volume={0.4} />
      {BENEFITS.map((b, i) => (
        <Audio key={i} src={uiSwitch} startFrom={b.delay} endAt={b.delay + 15} volume={0.3} />
      ))}
    </SceneWrapper>
  );
};
