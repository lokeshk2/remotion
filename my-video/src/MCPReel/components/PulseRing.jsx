import { useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../constants';

export const PulseRing = ({
  color = COLORS.primary,
  size = 120,
  speed = 60,
  style = {},
}) => {
  const frame = useCurrentFrame();
  const t = (frame % speed) / speed;

  const scale  = interpolate(t, [0, 1], [0.7, 1.5]);
  const opacity = interpolate(t, [0, 0.5, 1], [0.6, 0.3, 0]);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        border: `3px solid ${color}`,
        opacity,
        transform: `scale(${scale})`,
        position: 'absolute',
        ...style,
      }}
    />
  );
};
