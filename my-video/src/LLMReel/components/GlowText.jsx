import { COLORS, GRADIENTS, FONT } from '../constants';

export const GlowText = ({
  children,
  color = COLORS.primary,
  size = 80,
  weight = 900,
  style = {},
  glow = true,
}) => {
  return (
    <span
      style={{
        fontFamily: FONT.display,
        fontSize: size,
        fontWeight: weight,
        color: '#FFFFFF',
        textShadow: glow
          ? `0 0 30px ${color}, 0 0 60px ${color}88, 0 0 100px ${color}44`
          : 'none',
        letterSpacing: '-1px',
        lineHeight: 1.1,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
};

export const GradientText = ({
  children,
  gradient = GRADIENTS.purpleCyan,
  size = 80,
  weight = 900,
  style = {},
}) => {
  return (
    <span
      style={{
        fontFamily: FONT.display,
        fontSize: size,
        fontWeight: weight,
        background: gradient,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        letterSpacing: '-1px',
        lineHeight: 1.1,
        display: 'inline-block',
        ...style,
      }}
    >
      {children}
    </span>
  );
};
