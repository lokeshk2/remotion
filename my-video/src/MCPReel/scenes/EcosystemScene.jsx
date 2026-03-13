import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText } from '../components/GradientText';
import { COLORS, GRADIENTS, FONT } from '../constants';

const APPS = [
  { name: 'Claude Desktop', emoji: '🤖', desc: 'Native MCP support',        color: COLORS.primary },
  { name: 'Cursor',         emoji: '⚡', desc: 'AI code editor',             color: COLORS.secondary },
  { name: 'VS Code',        emoji: '💻', desc: 'MCP extension available',    color: COLORS.accent },
  { name: 'Windsurf',       emoji: '🏄', desc: 'Built-in MCP client',        color: COLORS.gold },
];

const SERVERS = [
  { name: 'GitHub',     emoji: '🐙', color: COLORS.text },
  { name: 'Stripe',     emoji: '💳', color: COLORS.primary },
  { name: 'Cloudflare', emoji: '☁️', color: COLORS.gold },
  { name: 'PostgreSQL', emoji: '🐘', color: COLORS.secondary },
  { name: 'Slack',      emoji: '💬', color: COLORS.highlight },
  { name: 'Notion',     emoji: '📝', color: COLORS.text },
];

export const EcosystemScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS   = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const countS   = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 10, stiffness: 60 } });
  const appsS    = spring({ frame: Math.max(0, frame - 60), fps, config: { damping: 14, stiffness: 80 } });

  const countVal = Math.round(interpolate(countS, [0, 1], [0, 1000], { extrapolateRight: 'clamp' }));

  return (
    <SceneWrapper gap={36} padding="70px 60px">

      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.primary} size={88} weight={900} style={{ letterSpacing: '-1.5px' }}>
          The Ecosystem
        </GradientText>
      </div>

      {/* Big stat */}
      <div style={{
        opacity: countS,
        transform: `scale(${0.7 + countS * 0.3})`,
        textAlign: 'center',
        background: `linear-gradient(135deg, ${COLORS.primary}14, ${COLORS.secondary}14)`,
        border: `2px solid ${COLORS.primary}44`,
        borderRadius: 32, padding: '32px 50px',
        boxShadow: `0 8px 40px ${COLORS.primary}18`,
        width: '100%',
      }}>
        <div style={{
          fontFamily: FONT.display, fontSize: 110, fontWeight: 900,
          background: GRADIENTS.primary,
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          lineHeight: 1, letterSpacing: '-3px',
        }}>
          {countVal.toLocaleString()}+
        </div>
        <div style={{
          fontFamily: FONT.display, fontSize: 34, fontWeight: 700,
          color: COLORS.text, marginTop: 8,
        }}>
          MCP Servers Available
        </div>
        <div style={{
          fontFamily: FONT.display, fontSize: 24, fontWeight: 400,
          color: COLORS.textMuted, marginTop: 6,
        }}>
          And growing every day 🚀
        </div>
      </div>

      {/* Host apps */}
      <div style={{
        opacity: appsS,
        transform: `translateY(${interpolate(appsS, [0, 1], [30, 0])}px)`,
        width: '100%',
      }}>
        <div style={{
          fontFamily: FONT.display, fontSize: 26,
          fontWeight: 700, color: COLORS.textMuted,
          textTransform: 'uppercase', letterSpacing: '2px',
          marginBottom: 16, textAlign: 'center',
        }}>
          Works natively with
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
          {APPS.map(({ name, emoji, desc, color }, i) => {
            const s = spring({
              frame: Math.max(0, frame - 80 - i * 18),
              fps, config: { damping: 13, stiffness: 110 },
            });
            return (
              <div key={i} style={{
                opacity: s,
                transform: `scale(${s})`,
                background: `${color}10`,
                border: `1.5px solid ${color}44`,
                borderRadius: 22, padding: '20px 22px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: 8, textAlign: 'center',
              }}>
                <span style={{ fontSize: 44 }}>{emoji}</span>
                <span style={{
                  fontFamily: FONT.display, fontSize: 24,
                  fontWeight: 700, color,
                }}>{name}</span>
                <span style={{
                  fontFamily: FONT.display, fontSize: 20,
                  fontWeight: 400, color: COLORS.textMuted,
                }}>{desc}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Server pills */}
      <div style={{
        width: '100%',
        display: 'flex', flexWrap: 'wrap',
        gap: 12, justifyContent: 'center',
      }}>
        <div style={{
          width: '100%', textAlign: 'center', marginBottom: 4,
          fontFamily: FONT.display, fontSize: 22,
          fontWeight: 600, color: COLORS.textMuted,
        }}>
          Official servers from:
        </div>
        {SERVERS.map(({ name, emoji, color }, i) => {
          const s = spring({
            frame: Math.max(0, frame - 165 - i * 14),
            fps, config: { damping: 16, stiffness: 120 },
          });
          return (
            <div key={i} style={{
              opacity: s, transform: `scale(${s})`,
              background: `${color}0F`,
              border: `1.5px solid ${color}33`,
              borderRadius: 50, padding: '10px 28px',
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 26 }}>{emoji}</span>
              <span style={{
                fontFamily: FONT.display, fontSize: 24,
                fontWeight: 700, color,
              }}>{name}</span>
            </div>
          );
        })}
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.4} />
      {APPS.map((_, i) => (
        <Audio key={i} src={uiSwitch} startFrom={80 + i * 18} endAt={95 + i * 18} volume={0.28} />
      ))}
      <Audio src={ding} startFrom={30} volume={0.45} />
    </SceneWrapper>
  );
};
