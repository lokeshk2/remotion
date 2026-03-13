import { COLORS, FONT, GRADIENTS } from '../constants';

export const GradientText = ({
  children,
  gradient = GRADIENTS.primary,
  size = 80,
  weight = 900,
  style = {},
}) => (
  <span
    style={{
      fontFamily: FONT.display,
      fontSize: size,
      fontWeight: weight,
      background: gradient,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      letterSpacing: '-1.5px',
      lineHeight: 1.1,
      display: 'inline-block',
      ...style,
    }}
  >
    {children}
  </span>
);

export const SolidText = ({
  children,
  color = COLORS.text,
  size = 80,
  weight = 900,
  style = {},
}) => (
  <span
    style={{
      fontFamily: FONT.display,
      fontSize: size,
      fontWeight: weight,
      color,
      letterSpacing: '-1px',
      lineHeight: 1.1,
      display: 'inline-block',
      ...style,
    }}
  >
    {children}
  </span>
);
