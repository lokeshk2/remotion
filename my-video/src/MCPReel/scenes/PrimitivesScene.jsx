import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText } from '../components/GradientText';
import { IconBadge } from '../components/Card';
import { COLORS, GRADIENTS, FONT } from '../constants';

const PRIMITIVES = [
  {
    name: 'Tools',     emoji: '🔧', tagline: 'AI can DO things',
    examples: ['Run code', 'Search web', 'Update DB', 'Send email'],
    color: COLORS.primary,   gradient: GRADIENTS.primary,  delay: 30,
  },
  {
    name: 'Resources', emoji: '📂', tagline: 'AI can READ data',
    examples: ['Files & docs', 'Emails & calendar', 'Database rows', 'API responses'],
    color: COLORS.accent,    gradient: GRADIENTS.teal,     delay: 85,
  },
  {
    name: 'Prompts',   emoji: '💬', tagline: 'Reusable templates',
    examples: ['Code review', 'Data analysis', 'Debug assist', 'Report gen'],
    color: COLORS.secondary, gradient: GRADIENTS.cool,     delay: 140,
  },
];

export const PrimitivesScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });

  return (
    <SceneWrapper gap={40} padding="80px 60px">
      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.cool} size={88} weight={900} style={{ letterSpacing: '-1.5px' }}>
          3 Primitives
        </GradientText>
        <div style={{ marginTop: 14, fontFamily: FONT.display, fontSize: 32, color: COLORS.textMuted, fontWeight: 500 }}>
          What MCP gives AI superpowers with
        </div>
      </div>

      {/* Primitive cards */}
      {PRIMITIVES.map(({ name, emoji, tagline, examples, color, gradient, delay }, i) => {
        const s        = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 90 } });
        const slideDir = i % 2 === 0 ? -80 : 80;
        const tx       = interpolate(s, [0, 1], [slideDir, 0]);
        const hover    = Math.sin(frame / 25 + i * 2.1) * 4;

        return (
          <div key={i} style={{
            opacity: s,
            transform: `translateX(${tx}px) translateY(${hover}px)`,
            width: '100%',
            background: COLORS.bgCard,
            border: `2px solid ${color}44`,
            borderRadius: 28, padding: '28px 32px',
            boxShadow: `0 8px 40px ${color}14`,
            display: 'flex', flexDirection: 'column', gap: 18,
          }}>
            {/* Header — GradientText component used instead of inline gradient CSS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              <IconBadge emoji={emoji} color={color} size={80} />
              <div>
                <GradientText gradient={gradient} size={40} weight={800} style={{ letterSpacing: '-0.5px' }}>
                  {name}
                </GradientText>
                <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 600, color: COLORS.textMuted }}>
                  {tagline}
                </div>
              </div>
            </div>

            {/* Example pills */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {examples.map((ex, j) => {
                const ps = spring({ frame: Math.max(0, frame - delay - 30 - j * 12), fps, config: { damping: 16, stiffness: 120 } });
                return (
                  <div key={j} style={{
                    opacity: ps, transform: `scale(${ps})`,
                    background: `${color}14`, border: `1px solid ${color}44`,
                    borderRadius: 50, padding: '8px 22px',
                    fontFamily: FONT.display, fontSize: 22, fontWeight: 600, color,
                  }}>
                    {ex}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}

      <Audio src={whoosh} startFrom={0} volume={0.4} />
      {PRIMITIVES.map((p, i) => (
        <Audio key={i} src={ding} startFrom={p.delay} endAt={p.delay + 20} volume={0.38} />
      ))}
    </SceneWrapper>
  );
};
