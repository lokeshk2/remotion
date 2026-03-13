import { interpolate } from 'remotion';
import { COLORS, GRADIENTS, FONT } from '../constants';
import { FloatingOrbs } from './FloatingOrbs';
import { GradientText } from './GradientText';

/**
 * Shared wrapper used by every scene.
 * Provides the light background, flex-column layout, FloatingOrbs, and overflow clip.
 */
export const SceneWrapper = ({ children, gap = 40, padding = '80px 60px', style = {} }) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: GRADIENTS.light,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      padding,
      gap,
      ...style,
    }}
  >
    <FloatingOrbs />
    {children}
  </div>
);

/**
 * Animated title block shared by all scenes.
 * springVal: spring output (0→1), title: rendered inside GradientText,
 * subtitle: optional string below, fromY: slide-in start offset.
 */
export const SceneTitle = ({
  springVal,
  title,
  gradient,
  subtitle,
  titleSize = 88,
  fromY = -40,
}) => (
  <div
    style={{
      opacity: springVal,
      transform: `translateY(${interpolate(springVal, [0, 1], [fromY, 0])}px)`,
      textAlign: 'center',
    }}
  >
    <GradientText
      gradient={gradient}
      size={titleSize}
      weight={900}
      style={{ letterSpacing: '-1.5px' }}
    >
      {title}
    </GradientText>
    {subtitle && (
      <div
        style={{
          marginTop: 14,
          fontFamily: FONT.display,
          fontSize: 32,
          color: COLORS.textMuted,
          fontWeight: 500,
        }}
      >
        {subtitle}
      </div>
    )}
  </div>
);

/** Full-screen flash overlay that fades to transparent. */
export const FlashOverlay = ({ opacity, background }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      background,
      opacity,
      pointerEvents: 'none',
      zIndex: 10,
    }}
  />
);
