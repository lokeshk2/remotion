import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText } from '../components/GradientText';
import { IconBadge } from '../components/Card';
import { COLORS, GRADIENTS, FONT } from '../constants';

const LAYERS = [
  { label: 'HOST',       icon: '🖥️', desc: 'Claude Desktop, Cursor, VS Code', subDesc: 'Your AI application',        color: COLORS.primary,   delay: 20  },
  { label: 'MCP CLIENT', icon: '⚡',  desc: 'Protocol manager inside the app',  subDesc: 'Manages server connections',  color: COLORS.secondary, delay: 80  },
  { label: 'MCP SERVER', icon: '🔧', desc: 'GitHub, Filesystem, Stripe, DB',   subDesc: 'Exposes tools and data',      color: COLORS.accent,    delay: 140 },
];

const FLOW_ARROW_LEAD = 30; // frames after layer appears before arrow shows

const FlowArrow = ({ frame, delay, color }) => {
  const { fps } = useVideoConfig();
  const s    = spring({ frame: Math.max(0, frame - delay - FLOW_ARROW_LEAD), fps, config: { damping: 14, stiffness: 100 } });
  const flow = (frame % 40) / 40;

  return (
    <div style={{ opacity: s, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <div style={{
        width: 4, height: 50,
        background: `linear-gradient(180deg, ${color}00, ${color}88, ${color}00)`,
        borderRadius: 4, transform: `scaleY(${s})`,
      }} />
      <div style={{
        fontSize: 32, color, opacity: 0.5 + flow * 0.5,
        transform: `translateY(${interpolate(flow, [0, 1], [-4, 4])}px)`,
      }}>↓</div>
    </div>
  );
};

export const ArchitectureScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS    = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const dataFlowS = spring({ frame: Math.max(0, frame - 220), fps, config: { damping: 14, stiffness: 80 } });

  return (
    <SceneWrapper gap={32} padding="80px 60px">
      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-40, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.cool} size={88} weight={900} style={{ letterSpacing: '-1.5px' }}>
          How MCP Works
        </GradientText>
        <div style={{ marginTop: 14, fontFamily: FONT.display, fontSize: 32, color: COLORS.textMuted, fontWeight: 500 }}>
          3 layers. 1 universal standard.
        </div>
      </div>

      {/* Architecture layers */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 0, marginTop: 8 }}>
        {LAYERS.map(({ label, icon, desc, subDesc, color, delay }, i) => {
          const s     = spring({ frame: Math.max(0, frame - delay), fps, config: { damping: 12, stiffness: 100 } });
          const pulse = Math.sin(frame / 20 + i) * 0.03 + 1;
          const ty    = interpolate(s, [0, 1], [40, 0]);

          return (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
              <div style={{
                opacity: s,
                transform: `scale(${s * pulse}) translateY(${ty}px)`,
                width: '100%',
                background: `linear-gradient(135deg, ${color}14, ${color}07)`,
                border: `2px solid ${color}55`,
                borderRadius: 28, padding: '28px 36px',
                display: 'flex', alignItems: 'center', gap: 28,
                boxShadow: `0 6px 30px ${color}18`,
              }}>
                <IconBadge emoji={icon} color={color} size={90} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: FONT.display, fontSize: 20, fontWeight: 700, color, letterSpacing: '2px', marginBottom: 6, textTransform: 'uppercase' }}>{label}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 30, fontWeight: 700, color: COLORS.text, marginBottom: 4 }}>{desc}</div>
                  <div style={{ fontFamily: FONT.display, fontSize: 24, fontWeight: 400, color: COLORS.textMuted }}>{subDesc}</div>
                </div>
                <div style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: `${color}22`, border: `2px solid ${color}55`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: color, boxShadow: `0 0 12px ${color}` }} />
                </div>
              </div>

              {i < LAYERS.length - 1 && (
                <FlowArrow frame={frame} delay={delay} color={LAYERS[i + 1].color} />
              )}
            </div>
          );
        })}
      </div>

      {/* Data flow label */}
      <div style={{
        opacity: dataFlowS,
        transform: `translateY(${interpolate(dataFlowS, [0, 1], [30, 0])}px)`,
        background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.accent}15)`,
        border: `1.5px solid ${COLORS.primary}33`,
        borderRadius: 20, padding: '18px 36px',
        display: 'flex', alignItems: 'center', gap: 16, marginTop: 8,
      }}>
        <span style={{ fontSize: 32 }}>🔄</span>
        <span style={{ fontFamily: FONT.display, fontSize: 28, fontWeight: 700, color: COLORS.primary }}>
          Bi-directional data flow
        </span>
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.4} />
      {LAYERS.map((l, i) => (
        <Audio key={i} src={uiSwitch} startFrom={l.delay} endAt={l.delay + 15} volume={0.35} />
      ))}
      <Audio src={ding} startFrom={220} volume={0.4} />
    </SceneWrapper>
  );
};
