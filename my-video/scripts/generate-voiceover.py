"""
Generate LLMReel voiceover using edge-tts (Microsoft Edge Neural TTS).

Video: 1800 frames at 30fps = 60 seconds total.
Scene timing (after TransitionSeries overlaps of 8×25 frames):
  Hook       ~5.5 s
  WhatIsLLM  ~7.5 s
  Training   ~6.7 s
  Tokens     ~6.5 s
  Attention  ~7.3 s
  Apps       ~8.5 s
  Stats      ~8.5 s
  Future     ~7.7 s
  CTA        ~6.3 s  (last scene ends at 1800 frames)

Voiceover targets ~60 s using rate='+15%' (≈ 145–150 wpm).
"""

import asyncio
import edge_tts
import os

VOICE  = "en-US-AndrewNeural"
OUTPUT = "/workspaces/remotion/my-video/public/voiceover.mp3"

# ~120 words — at +15% rate ≈ 60 s of speech
SCRIPT = (
    "Large Language Models — the brain powering every AI you use. "
    "An LLM is a deep learning model trained on massive text data — "
    "books, articles, and the entire web — "
    "to understand and generate human language. "
    "Training feeds billions of examples through neural networks, "
    "adjusting parameters to minimize errors. "
    "LLMs split text into tokens — small character chunks. "
    "GPT-4 handles up to 128,000 tokens at once. "
    "The attention mechanism, from a 2017 breakthrough paper, "
    "lets the model focus on what matters most in context. "
    "This powers ChatGPT, Claude, Gemini, Meta's Llama, and GitHub Copilot — "
    "transforming how we work, create, and code. "
    "GPT-3 has 175 billion parameters. "
    "ChatGPT hit 100 million users in just 60 days. "
    "LLMs are now accelerating drug discovery, scientific research, "
    "and fully autonomous AI agents. "
    "That's Large Language Models — explained. "
    "Follow for daily AI and tech breakdowns. "
    "New content every single day."
)


async def main() -> None:
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    print(f"Generating voiceover with voice: {VOICE}")
    communicate = edge_tts.Communicate(SCRIPT, VOICE, rate="+15%")
    await communicate.save(OUTPUT)
    size = os.path.getsize(OUTPUT)
    print(f"✓ Saved {OUTPUT}  ({size / 1024:.1f} KB)")


if __name__ == "__main__":
    asyncio.run(main())
