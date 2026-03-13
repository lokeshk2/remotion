import { COLORS } from '../constants';

export const Card = ({
  children,
  color = COLORS.primary,
  style = {},
  glow = false,
}) => (
  <div
    style={{
      background: COLORS.bgCard,
      border: `1.5px solid ${color}33`,
      borderRadius: 28,
      padding: '32px 36px',
      backdropFilter: 'blur(20px)',
      boxShadow: glow
        ? `0 8px 40px ${color}22, 0 2px 12px rgba(0,0,0,0.06)`
        : '0 4px 24px rgba(0,0,0,0.06), 0 1px 6px rgba(0,0,0,0.04)',
      ...style,
    }}
  >
    {children}
  </div>
);

export const IconBadge = ({
  emoji,
  color = COLORS.primary,
  size = 80,
}) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.28,
      background: `linear-gradient(135deg, ${color}22 0%, ${color}11 100%)`,
      border: `2px solid ${color}44`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.52,
      boxShadow: `0 4px 20px ${color}22`,
      flexShrink: 0,
    }}
  >
    {emoji}
  </div>
);
