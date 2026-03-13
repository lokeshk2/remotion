import { useCurrentFrame, useVideoConfig } from 'remotion';
import { noise2D } from '@remotion/noise';
import { COLORS, WIDTH, HEIGHT } from '../constants';

// Pre-built static strings — rebuilt only once at module load, not per frame
const ORB1_BG = `radial-gradient(circle, ${COLORS.secondary}1A 0%, transparent 70%)`;
const ORB2_BG = `radial-gradient(circle, ${COLORS.primary}14 0%, transparent 70%)`;
const ORB3_BG = `radial-gradient(circle, ${COLORS.accent}14 0%, transparent 70%)`;

const WRAPPER_STYLE = { position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 };

export const FloatingOrbs = () => {
  const frame = useCurrentFrame();
  const { width = WIDTH, height = HEIGHT } = useVideoConfig();

  const o1x = (noise2D('m1x', 0, frame / 700) + 1) / 2;
  const o1y = (noise2D('m1y', 1, frame / 700) + 1) / 2;
  const o2x = (noise2D('m2x', 2, frame / 600) + 1) / 2;
  const o2y = (noise2D('m2y', 3, frame / 600) + 1) / 2;
  const o3x = (noise2D('m3x', 4, frame / 800) + 1) / 2;
  const o3y = (noise2D('m3y', 5, frame / 800) + 1) / 2;

  return (
    <div style={WRAPPER_STYLE}>
      <div style={{
        position: 'absolute',
        left: o1x * width - 350,
        top: o1y * height - 350,
        width: 700, height: 700,
        borderRadius: '50%',
        background: ORB1_BG,
        filter: 'blur(60px)',
      }} />
      <div style={{
        position: 'absolute',
        left: o2x * width - 280,
        top: o2y * height - 280,
        width: 560, height: 560,
        borderRadius: '50%',
        background: ORB2_BG,
        filter: 'blur(50px)',
      }} />
      <div style={{
        position: 'absolute',
        left: o3x * width - 200,
        top: o3y * height - 200,
        width: 400, height: 400,
        borderRadius: '50%',
        background: ORB3_BG,
        filter: 'blur(45px)',
      }} />
    </div>
  );
};
