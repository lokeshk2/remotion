export const COLORS = {
  bg: '#050510',
  bgCard: 'rgba(15, 15, 40, 0.85)',
  bgCardBorder: 'rgba(124, 58, 237, 0.3)',
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  secondary: '#06B6D4',
  secondaryLight: '#67E8F9',
  accent: '#F59E0B',
  highlight: '#EC4899',
  green: '#10B981',
  red: '#EF4444',
  text: '#FFFFFF',
  textMuted: 'rgba(255,255,255,0.65)',
};

export const GRADIENTS = {
  purple:
    'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)',
  purpleCyan:
    'linear-gradient(135deg, #7C3AED 0%, #06B6D4 100%)',
  pinkGold:
    'linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)',
  cyanGreen:
    'linear-gradient(135deg, #06B6D4 0%, #10B981 100%)',
  fire:
    'linear-gradient(135deg, #EF4444 0%, #F59E0B 100%)',
  midnight:
    'linear-gradient(180deg, #050510 0%, #0F0524 50%, #050510 100%)',
};

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const TOTAL_FRAMES = 1800; // 60 seconds

// Scene timing in frames
export const SCENES = {
  hook:      { start: 0,    dur: 150 }, // 0–5s
  whatIsLLM: { start: 150,  dur: 210 }, // 5–12s
  training:  { start: 360,  dur: 180 }, // 12–18s
  tokens:    { start: 540,  dur: 180 }, // 18–24s
  attention: { start: 720,  dur: 210 }, // 24–31s
  apps:      { start: 930,  dur: 240 }, // 31–39s
  stats:     { start: 1170, dur: 240 }, // 39–47s
  future:    { start: 1410, dur: 210 }, // 47–54s
  cta:       { start: 1620, dur: 180 }, // 54–60s
};

export const FONT = {
  display: '"Space Grotesk", "Inter", system-ui, sans-serif',
  mono: '"JetBrains Mono", "Fira Mono", monospace',
};
