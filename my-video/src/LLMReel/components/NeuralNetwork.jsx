import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';

const NODE_LAYERS = [3, 5, 5, 4, 3];
const W = 900;
const H = 600;
const layerGap = W / (NODE_LAYERS.length - 1);

// Hoist static geometry — never changes per frame
const STATIC_NODES = NODE_LAYERS.map((count, li) => {
  const x = li * layerGap + 50;
  return Array.from({ length: count }, (_, ni) => {
    const totalH = (count - 1) * 100;
    const y = H / 2 - totalH / 2 + ni * 100 + 50;
    const isMiddle = li > 0 && li < NODE_LAYERS.length - 1;
    return { x, y, li, ni, isMiddle, grad: isMiddle ? 'url(#nodeGrad2)' : 'url(#nodeGrad)' };
  });
});
const FLAT_NODES = STATIC_NODES.flat();

// Pre-compute static edge geometry + animation offsets — only opacity needs frame
const EDGE_TEMPLATE = [];
for (let li = 0; li < STATIC_NODES.length - 1; li++) {
  for (const src of STATIC_NODES[li]) {
    for (const dst of STATIC_NODES[li + 1]) {
      EDGE_TEMPLATE.push({
        x1: src.x, y1: src.y, x2: dst.x, y2: dst.y,
        animOffset: (src.ni + dst.ni + li) * 7,
      });
    }
  }
}

export const NeuralNetwork = ({ opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const appear = spring({ frame, fps, config: { damping: 15, stiffness: 80 } });

  return (
    <svg
      width={W + 100}
      height={H + 100}
      style={{ opacity: opacity * appear }}
      viewBox={`0 0 ${W + 100} ${H + 100}`}
    >
      <defs>
        <radialGradient id="nodeGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#7C3AED" />
        </radialGradient>
        <radialGradient id="nodeGrad2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="100%" stopColor="#06B6D4" />
        </radialGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {EDGE_TEMPLATE.map((e, i) => {
        const edgeOpacity = interpolate(
          Math.sin(((frame + e.animOffset) / fps) * 3 * Math.PI),
          [-1, 1],
          [0.05, 0.55]
        );
        return (
          <line
            key={i}
            x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
            stroke={`rgba(124, 58, 237, ${edgeOpacity})`}
            strokeWidth={1.5}
          />
        );
      })}

      {FLAT_NODES.map((n, i) => {
        const nodePulse = interpolate(
          Math.sin(((frame + i * 11) / fps) * 2 * Math.PI),
          [-1, 1],
          [10, 15]
        );
        return (
          <g key={i} filter="url(#glow)">
            <circle cx={n.x} cy={n.y} r={nodePulse * 1.5} fill={n.grad} fillOpacity={0.2} />
            <circle cx={n.x} cy={n.y} r={nodePulse} fill={n.grad} />
          </g>
        );
      })}
    </svg>
  );
};
