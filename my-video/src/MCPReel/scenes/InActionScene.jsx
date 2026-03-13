import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText } from '../components/GradientText';
import { COLORS, GRADIENTS, FONT } from '../constants';

const STEPS = [
  { emoji: '💬', action: 'You ask Claude:', detail: '"Fix the bugs in my codebase"', color: COLORS.primary,   delay: 20 },
  { emoji: '📂', action: 'Claude reads:', detail: 'Your files via MCP Filesystem',   color: COLORS.secondary, delay: 75 },
  { emoji: '🐙', action: 'Claude checks:', detail: 'GitHub issues & PR history',      color: COLORS.accent,    delay: 130 },
  { emoji: '✏️', action: 'Claude writes:', detail: 'Code fix with full context',       color: COLORS.gold,      delay: 185 },
  { emoji: '🧪', action: 'Claude runs:', detail: 'Tests via MCP Dev Tools',            color: COLORS.highlight, delay: 240 },
  { emoji: '🚀', action: 'Claude opens:', detail: 'A Pull Request on GitHub',          color: COLORS.primary,   delay: 295 },
];

export const InActionScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const badgeS = spring({ frame: Math.max(0, frame - 340), fps, config: { damping: 14, stiffness: 90 } });

  return (
    <SceneWrapper gap={28} padding="70px 60px">

      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.primary} size={88} weight={900} style={{ letterSpacing: '-1.5px' }}>
          MCP in Action
        </GradientText>
        <div style={{
          marginTop: 12, fontFamily: FONT.display, fontSize: 30,
          color: COLORS.textMuted, fontWeight: 500,
        }}>
          One conversation. Real work. No custom code.
        </div>
      </div>

      {/* Steps */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: 16, width: '100%',
      }}>
        {STEPS.map(({ emoji, action, detail, color, delay }, i) => {
          const s = spring({
            frame: Math.max(0, frame - delay),
            fps, config: { damping: 13, stiffness: 105 },
          });
          const connectionS = spring({
            frame: Math.max(0, frame - delay - 20), // appears 20 frames AFTER card (was incorrectly + 20)
            fps, config: { damping: 16, stiffness: 120 },
          });

          return (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              {/* Step number */}
              <div style={{
                opacity: s,
                transform: `scale(${s})`,
                width: 50, height: 50, borderRadius: '50%',
                background: `linear-gradient(135deg, ${color}, ${color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: FONT.display, fontSize: 22, fontWeight: 800,
                color: COLORS.bg, flexShrink: 0,
                boxShadow: `0 4px 16px ${color}44`,
              }}>
                {i + 1}
              </div>

              {/* Card */}
              <div style={{
                flex: 1,
                opacity: s,
                transform: `translateX(${interpolate(s, [0, 1], [50, 0])}px)`,
                background: `linear-gradient(135deg, ${color}10, ${color}05)`,
                border: `1.5px solid ${color}44`,
                borderRadius: 22,
                padding: '18px 26px',
                display: 'flex', alignItems: 'center', gap: 18,
                boxShadow: `0 4px 18px ${color}10`,
              }}>
                <span style={{ fontSize: 38, flexShrink: 0 }}>{emoji}</span>
                <div>
                  <div style={{
                    fontFamily: FONT.display, fontSize: 20,
                    fontWeight: 700, color, textTransform: 'uppercase',
                    letterSpacing: '1.5px', marginBottom: 4,
                  }}>{action}</div>
                  <div style={{
                    fontFamily: FONT.display, fontSize: 26,
                    fontWeight: 600, color: COLORS.text,
                  }}>{detail}</div>
                </div>
                {/* Checkmark */}
                <div style={{
                  marginLeft: 'auto',
                  opacity: connectionS,
                  transform: `scale(${connectionS})`,
                  width: 36, height: 36, borderRadius: '50%',
                  background: `${color}22`,
                  border: `2px solid ${color}66`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, color, flexShrink: 0,
                }}>
                  ✓
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Zero code badge */}
      <div style={{
        opacity: badgeS,
        transform: `scale(${badgeS})`,
        background: `linear-gradient(135deg, ${COLORS.accent}18, ${COLORS.primary}18)`,
        border: `2px solid ${COLORS.accent}44`,
        borderRadius: 24, padding: '20px 40px',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <span style={{ fontSize: 36 }}>✨</span>
        <span style={{
          fontFamily: FONT.display, fontSize: 30, fontWeight: 800,
          color: COLORS.accent,
        }}>Zero custom code needed</span>
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.4} />
      {STEPS.map((step, i) => (
        <Audio key={i} src={uiSwitch} startFrom={step.delay} endAt={step.delay + 12} volume={0.28} />
      ))}
      <Audio src={ding} startFrom={300} volume={0.4} />
    </SceneWrapper>
  );
};
