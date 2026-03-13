import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText, SolidText } from '../components/GradientText';
import { Card, IconBadge } from '../components/Card';
import { COLORS, GRADIENTS, FONT } from '../constants';

const PROBLEMS = [
  { emoji: '📁', label: 'Files', desc: 'No file access', color: COLORS.highlight },
  { emoji: '🗄️', label: 'Databases', desc: 'No DB queries', color: COLORS.gold },
  { emoji: '🌐', label: 'APIs', desc: 'No web calls', color: COLORS.accent },
  { emoji: '🔧', label: 'Dev Tools', desc: 'No tool use', color: COLORS.secondary },
];

export const ProblemScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const aiBoxS = spring({ frame: Math.max(0, frame - 25), fps, config: { damping: 12, stiffness: 80 } });
  const lockS  = spring({ frame: Math.max(0, frame - 55), fps, config: { damping: 14, stiffness: 100 } });

  const lockBob = Math.sin(frame / 15) * 6;

  return (
    <SceneWrapper gap={44} padding="80px 60px">

      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-50, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.warm} size={90} weight={900} style={{ letterSpacing: '-1.5px' }}>
          The Problem
        </GradientText>
        <div style={{
          marginTop: 16, fontFamily: FONT.display, fontSize: 36,
          color: COLORS.textMuted, fontWeight: 500,
        }}>
          AI is locked in a box 📦
        </div>
      </div>

      {/* AI box visual */}
      <div style={{
        opacity: aiBoxS,
        transform: `scale(${aiBoxS})`,
        position: 'relative', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          width: 220, height: 220,
          background: 'linear-gradient(135deg, #EEF2FF, #F0F9FF)',
          border: `3px solid ${COLORS.secondary}44`,
          borderRadius: 40,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 8px 40px ${COLORS.secondary}18`,
          gap: 10,
        }}>
          <span style={{ fontSize: 70 }}>🤖</span>
          <span style={{
            fontFamily: FONT.display, fontSize: 28, fontWeight: 700,
            color: COLORS.text,
          }}>Your AI</span>
        </div>
        {/* Lock icon */}
        <div style={{
          position: 'absolute', top: -24, right: -24,
          transform: `translateY(${lockBob}px)`,
          opacity: lockS, fontSize: 64,
        }}>
          🔒
        </div>
        {/* X lines showing no connection */}
        {[0, 90, 180, 270].map((deg, i) => {
          const s = spring({ frame: Math.max(0, frame - 70 - i * 15), fps, config: { damping: 16, stiffness: 100 } });
          return (
            <div key={i} style={{
              position: 'absolute',
              opacity: s,
              transform: `rotate(${deg}deg) translateX(160px)`,
              width: 80, height: 3,
              background: `${COLORS.highlight}88`,
              borderRadius: 2,
            }}>
              <div style={{
                position: 'absolute', right: -14, top: '50%',
                transform: 'translateY(-50%)',
                fontSize: 28, color: COLORS.highlight,
                fontWeight: 900,
              }}>✕</div>
            </div>
          );
        })}
      </div>

      {/* Problem cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 20, width: '100%',
      }}>
        {PROBLEMS.map(({ emoji, label, desc, color }, i) => {
          const s = spring({ frame: Math.max(0, frame - 90 - i * 20), fps, config: { damping: 13, stiffness: 110 } });
          return (
            <div key={i} style={{
              opacity: s,
              transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [30, 0])}px)`,
              background: `${color}0F`,
              border: `1.5px solid ${color}33`,
              borderRadius: 22,
              padding: '22px 24px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 10,
              boxShadow: `0 4px 20px ${color}10`,
            }}>
              <span style={{ fontSize: 42 }}>{emoji}</span>
              <span style={{ fontFamily: FONT.display, fontSize: 26, fontWeight: 700, color }}>{label}</span>
              <span style={{
                fontFamily: FONT.display, fontSize: 22, color: COLORS.highlight,
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                ✕ {desc}
              </span>
            </div>
          );
        })}
      </div>

      {/* Solution hint */}
      <div style={{
        opacity: spring({ frame: Math.max(0, frame - 170), fps, config: { damping: 14, stiffness: 90 } }),
        background: `linear-gradient(135deg, ${COLORS.primary}18, ${COLORS.accent}18)`,
        border: `1.5px solid ${COLORS.primary}44`,
        borderRadius: 20, padding: '18px 32px',
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: FONT.display, fontSize: 30, fontWeight: 700,
          color: COLORS.primary,
        }}>
          Until now... 🚀
        </span>
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.45} />
      {PROBLEMS.map((_, i) => (
        <Audio key={i} src={uiSwitch} startFrom={90 + i * 20} endAt={100 + i * 20} volume={0.3} />
      ))}
    </SceneWrapper>
  );
};
