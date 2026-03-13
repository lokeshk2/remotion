import { useCurrentFrame, useVideoConfig, spring, interpolate, Audio } from 'remotion';
import { whoosh, uiSwitch, ding } from '@remotion/sfx';
import { SceneWrapper } from '../components/SceneWrapper';
import { GradientText, SolidText } from '../components/GradientText';
import { Card } from '../components/Card';
import { COLORS, GRADIENTS, FONT } from '../constants';

const LETTERS = [
  { letter: 'M', word: 'Model',   desc: 'Your AI assistant',     color: COLORS.primary,   emoji: '🤖' },
  { letter: 'C', word: 'Context', desc: 'Tools, data & services', color: COLORS.secondary, emoji: '🔌' },
  { letter: 'P', word: 'Protocol',desc: 'Universal standard',     color: COLORS.accent,    emoji: '📡' },
];

export const WhatIsMCPScene = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleS    = spring({ frame, fps, config: { damping: 14, stiffness: 90 } });
  const subtitleS = spring({ frame: Math.max(0, frame - 20), fps, config: { damping: 14, stiffness: 90 } });
  const definitionS = spring({ frame: Math.max(0, frame - 160), fps, config: { damping: 14, stiffness: 80 } });
  const authorS   = spring({ frame: Math.max(0, frame - 210), fps, config: { damping: 14, stiffness: 90 } });

  return (
    <SceneWrapper gap={48} padding="80px 60px">

      {/* Title */}
      <div style={{
        opacity: titleS,
        transform: `translateY(${interpolate(titleS, [0, 1], [-50, 0])}px)`,
        textAlign: 'center',
      }}>
        <GradientText gradient={GRADIENTS.primary} size={92} weight={900} style={{ letterSpacing: '-2px' }}>
          What is MCP?
        </GradientText>
      </div>

      {/* Subtitle */}
      <div style={{
        opacity: subtitleS * 0.75,
        transform: `translateY(${interpolate(subtitleS, [0, 1], [-20, 0])}px)`,
        textAlign: 'center',
      }}>
        <span style={{
          fontFamily: FONT.display, fontSize: 34, fontWeight: 500,
          color: COLORS.textMuted,
        }}>
          Model Context Protocol
        </span>
      </div>

      {/* Letter breakdown */}
      <div style={{ display: 'flex', gap: 22, width: '100%' }}>
        {LETTERS.map(({ letter, word, desc, color, emoji }, i) => {
          const s = spring({
            frame: Math.max(0, frame - 45 - i * 30),
            fps, config: { damping: 12, stiffness: 100 },
          });
          return (
            <div key={i} style={{
              flex: 1,
              opacity: s,
              transform: `scale(${s}) translateY(${interpolate(s, [0, 1], [50, 0])}px)`,
              background: `linear-gradient(145deg, ${color}12, ${color}06)`,
              border: `2px solid ${color}44`,
              borderRadius: 28,
              padding: '28px 20px',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: 14,
              boxShadow: `0 6px 30px ${color}18`,
            }}>
              <span style={{ fontSize: 48 }}>{emoji}</span>
              <span style={{
                fontFamily: FONT.display, fontSize: 88,
                fontWeight: 900, color,
                lineHeight: 1,
                textShadow: `0 4px 20px ${color}44`,
              }}>{letter}</span>
              <span style={{
                fontFamily: FONT.display, fontSize: 24,
                fontWeight: 700, color,
              }}>{word}</span>
              <span style={{
                fontFamily: FONT.display, fontSize: 20,
                fontWeight: 400, color: COLORS.textMuted,
                textAlign: 'center', lineHeight: 1.4,
              }}>{desc}</span>
            </div>
          );
        })}
      </div>

      {/* Definition card */}
      <div style={{
        opacity: definitionS,
        transform: `translateY(${interpolate(definitionS, [0, 1], [40, 0])}px)`,
        width: '100%',
        background: `linear-gradient(145deg, ${COLORS.bgCard}, ${COLORS.bgSurface})`,
        border: `1.5px solid ${COLORS.primary}33`,
        borderRadius: 28, padding: '32px 36px',
        boxShadow: `0 8px 40px ${COLORS.primary}14`,
      }}>
        <div style={{
          fontFamily: FONT.display, fontSize: 30,
          color: COLORS.text, lineHeight: 1.55,
          fontWeight: 500, textAlign: 'center',
        }}>
          An <span style={{ color: COLORS.primary, fontWeight: 700 }}>open standard</span> that gives AI
          a <span style={{ color: COLORS.secondary, fontWeight: 700 }}>universal way</span> to connect
          with tools, data & services — like{' '}
          <span style={{ color: COLORS.accent, fontWeight: 700 }}>USB-C for AI</span> 🔌
        </div>
      </div>

      {/* Published by */}
      <div style={{
        opacity: authorS,
        transform: `translateY(${interpolate(authorS, [0, 1], [20, 0])}px)`,
        display: 'flex', alignItems: 'center', gap: 16,
        background: `${COLORS.highlight}10`,
        border: `1.5px solid ${COLORS.highlight}33`,
        borderRadius: 100, padding: '12px 32px',
      }}>
        <span style={{ fontSize: 28 }}>✨</span>
        <span style={{
          fontFamily: FONT.display, fontSize: 28, fontWeight: 700,
          color: COLORS.highlight,
        }}>Created by Anthropic · Open Source</span>
      </div>

      <Audio src={whoosh} startFrom={0} volume={0.45} />
      {LETTERS.map((_, i) => (
        <Audio key={i} src={ding} startFrom={45 + i * 30} endAt={60 + i * 30} volume={0.4} />
      ))}
      <Audio src={uiSwitch} startFrom={160} volume={0.35} />
    </SceneWrapper>
  );
};
