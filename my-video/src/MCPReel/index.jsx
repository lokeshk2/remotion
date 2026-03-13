import { useCurrentFrame, interpolate, staticFile, Audio } from 'remotion';
import { TransitionSeries, springTiming, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';
import { wipe } from '@remotion/transitions/wipe';
import { flip } from '@remotion/transitions/flip';
import { clockWipe } from '@remotion/transitions/clock-wipe';

import { HookScene }         from './scenes/HookScene';
import { ProblemScene }      from './scenes/ProblemScene';
import { WhatIsMCPScene }    from './scenes/WhatIsMCPScene';
import { ArchitectureScene } from './scenes/ArchitectureScene';
import { PrimitivesScene }   from './scenes/PrimitivesScene';
import { InActionScene }     from './scenes/InActionScene';
import { EcosystemScene }    from './scenes/EcosystemScene';
import { BenefitsScene }     from './scenes/BenefitsScene';
import { FutureScene }       from './scenes/FutureScene';
import { CTAScene }          from './scenes/CTAScene';

import { COLORS, SCENE_DURATIONS, TRANSITION_DUR, FONT, WIDTH, HEIGHT, TOTAL_FRAMES } from './constants';

// ── Module-level constants — built once, never rebuilt per-frame ─────────────
const PROGRESS_BG    = `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.accent})`;
const DOT1_SHADOW    = `0 0 12px ${COLORS.primary}`;
const DOT2_SHADOW    = `0 0 12px ${COLORS.secondary}`;
const ROOT_STYLE     = { width: '100%', height: '100%', background: COLORS.bg, position: 'relative', overflow: 'hidden', fontFamily: FONT.display };
const SERIES_STYLE   = { position: 'absolute', inset: 0, zIndex: 1 };

const FADE_IN  = 30; // 1 s
const FADE_OUT = 60; // 2 s

// Instagram-style progress bar at the top
const ProgressBar = () => {
  const frame = useCurrentFrame();
  const progress = frame / TOTAL_FRAMES;

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0,
      height: 4, background: 'rgba(0,0,0,0.08)',
      zIndex: 200, overflow: 'hidden',
    }}>
      <div style={{ height: '100%', width: `${progress * 100}%`, background: PROGRESS_BG, borderRadius: '0 4px 4px 0' }} />
    </div>
  );
};

// Floating brand bar at the bottom
const BrandBar = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [5, 25], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(0deg, rgba(238,242,255,0.95) 0%, transparent 100%)',
      zIndex: 100, opacity, gap: 16, paddingBottom: 20,
    }}>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.primary, boxShadow: DOT1_SHADOW }} />
      <span style={{ color: COLORS.textMuted, fontSize: 24, fontFamily: FONT.display, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
        Model Context Protocol
      </span>
      <div style={{ width: 10, height: 10, borderRadius: '50%', background: COLORS.secondary, boxShadow: DOT2_SHADOW }} />
    </div>
  );
};

export const MCPReel = () => {
  return (
    <div style={ROOT_STYLE}>
      {/* ── Background voiceover ── */}
      <Audio
        src={staticFile('voiceover_mcp.mp3')}
        volume={(f) =>
          interpolate(
            f,
            [0, FADE_IN, TOTAL_FRAMES - FADE_OUT, TOTAL_FRAMES],
            [0, 1.0, 1.0, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
          )
        }
      />

      {/* Progress bar */}
      <ProgressBar />

      {/* ── Scene transitions ── */}
      <TransitionSeries style={SERIES_STYLE}>

        {/* 1 – Hook */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.hook}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 20, stiffness: 60 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 2 – Problem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.problem}>
          <ProblemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-right' })}
          timing={springTiming({ config: { damping: 18, stiffness: 70 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 3 – What is MCP */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.whatIsMCP}>
          <WhatIsMCPScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-top-left' })}
          timing={linearTiming({ durationInFrames: TRANSITION_DUR })}
        />

        {/* 4 – Architecture */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.architecture}>
          <ArchitectureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-bottom' })}
          timing={springTiming({ config: { damping: 18, stiffness: 80 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 5 – Primitives */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.primitives}>
          <PrimitivesScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={clockWipe({ width: WIDTH, height: HEIGHT })}
          timing={springTiming({ config: { damping: 20, stiffness: 60 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 6 – In Action */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.inAction}>
          <InActionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: 'from-top-right' })}
          timing={springTiming({ config: { damping: 18, stiffness: 70 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 7 – Ecosystem */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.ecosystem}>
          <EcosystemScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip({ direction: 'from-left' })}
          timing={springTiming({ config: { damping: 20, stiffness: 70 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 8 – Benefits */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.benefits}>
          <BenefitsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: 'from-left' })}
          timing={springTiming({ config: { damping: 18, stiffness: 80 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 9 – Future */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.future}>
          <FutureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={springTiming({ config: { damping: 20, stiffness: 50 }, durationInFrames: TRANSITION_DUR })}
        />

        {/* 10 – CTA */}
        <TransitionSeries.Sequence durationInFrames={SCENE_DURATIONS.cta}>
          <CTAScene />
        </TransitionSeries.Sequence>

      </TransitionSeries>

      {/* Brand bar always on top */}
      <BrandBar />
    </div>
  );
};
