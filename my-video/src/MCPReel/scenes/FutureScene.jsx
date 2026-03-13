import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText, SolidText } from '../components/GradientText';
import { PulseRing } from '../components/PulseRing';
import { COLORS, GRADIENTS, FONT } from '../constants';

const ANALOGY_ITEMS = [
  { label: 'USB-C',  sub: 'Universal connector', emoji: '🔌', direction: -1, color: COLORS.primary   },
  { label: 'WiFi',   sub: 'Wireless standard',    emoji: '📶', direction:  1, color: COLORS.secondary },
  { label: 'HTTP',   sub: 'Web protocol',         emoji: '🌐', direction: -1, color: COLORS.accent    },
];

export const FutureScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS    = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const analogyS  = spring({ frame: Math.max(0, frame - 30), fps, config: { damping: 12, stiffness: 80 } });
  const mcpS      = spring({ frame: Math.max(0, frame - 110), fps, config: { damping: 10, stiffness: 70 } });
  const quoteS    = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 14, stiffness: 80 } });

  const pulseFactor = Math.sin(frame / 18) * 0.02 + 1;

  return (
    <SceneWrapper gap={44} padding="80px 60px">

      {/* Pulse rings behind center */}
      <PulseRing color={COLORS.primary}   size={600} speed={100}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />
      <PulseRing color={COLORS.secondary} size={460} speed={80}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center', zIndex: 2,
      }}>
        <GradientText gradient={GRADIENTS.primary} size={90} weight={900} style={{ letterSpacing: '-2px' }}>
          The Future
        </GradientText>
        <GradientText gradient={GRADIENTS.cool} size={90} weight={900} style={{ letterSpacing: '-2px' }}>
          of AI Agents
        </GradientText>
      </div>

      {/* Analogy items */}
      <div style={{
        opacity: analogyS,
        transform: `translateY(${interpolate(analogyS, [0, 1], [40, 0])}px)`,
        display: 'flex', gap: 20, width: '100%', zIndex: 2,
      }}>
        {ANALOGY_ITEMS.map(({ label, sub, emoji, direction, color }, i) => {
          const s = spring({ frame: Math.max(0, frame - 35 - i * 20), fps, config: { damping: 13, stiffness: 100 } });
          return (
            <div key={i} style={{
              flex: 1, opacity: s,
              transform: `scale(${s}) translateX(${interpolate(s, [0, 1], [direction * 40, 0])}px)`,
              background: `${color}10`,
              border: `1.5px solid ${color}44`,
              borderRadius: 24, padding: '24px 20px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 12, textAlign: 'center',
            }}>
              <span style={{ fontSize: 52 }}>{emoji}</span>
              <div style={{
                fontFamily: FONT.display, fontSize: 26, fontWeight: 800, color,
              }}>{label}</div>
              <div style={{
                fontFamily: FONT.display, fontSize: 20, fontWeight: 400, color: COLORS.textMuted,
              }}>{sub}</div>
            </div>
          );
        })}
      </div>

      {/* MCP = center */}
      <div style={{
        opacity: mcpS,
        transform: `scale(${mcpS * pulseFactor})`,
        textAlign: 'center',
        background: `linear-gradient(135deg, ${COLORS.primary}18, ${COLORS.secondary}18)`,
        border: `3px solid ${COLORS.primary}55`,
        borderRadius: 40, padding: '36px 60px',
        boxShadow: `0 12px 60px ${COLORS.primary}22`,
        width: '100%', zIndex: 2,
      }}>
        <div style={{
          fontFamily: FONT.display, fontSize: 34,
          fontWeight: 600, color: COLORS.textMuted, marginBottom: 8,
        }}>
          MCP is the
        </div>
        <GradientText gradient={GRADIENTS.primary} size={80} weight={900} style={{ letterSpacing: '-1.5px' }}>
          USB-C for AI
        </GradientText>
        <div style={{
          fontFamily: FONT.display, fontSize: 30, fontWeight: 600,
          color: COLORS.textMuted, marginTop: 10,
        }}>
          One standard. Works everywhere.
        </div>
      </div>

      {/* Quote */}
      <div style={{
        opacity: quoteS,
        transform: `translateY(${interpolate(quoteS, [0, 1], [30, 0])}px)`,
        textAlign: 'center', padding: '0 20px', zIndex: 2,
      }}>
        <SolidText size={36} weight={500} color={COLORS.textMuted} style={{ lineHeight: 1.5 }}>
          "MCP will be the foundation for the
          next generation of AI applications."
        </SolidText>
        <div style={{
          marginTop: 16, fontFamily: FONT.display,
          fontSize: 28, fontWeight: 700, color: COLORS.primary,
        }}>
          — Anthropic, 2024
        </div>
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.45} />
      <Audio src={ding} startFrom={110} volume={0.5} />
    </SceneWrapper>
  );
};
