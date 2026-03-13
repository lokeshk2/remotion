"""
Generate MCPReel voiceover using edge-tts (Microsoft Edge Neural TTS).

Video: 2700 frames at 30fps = 90 seconds total.
9 scenes connected by 9 transitions × 25-frame overlap.

Voiceover targets ~89 s using rate='+12%' (≈ 148 wpm).
"""

import asyncio
import edge_tts
import os

VOICE  = "en-US-AndrewNeural"
OUTPUT = "/workspaces/remotion/my-video/public/voiceover_mcp.mp3"

# ~220 words — at +12% rate ≈ 89 s of speech
SCRIPT = (
    "What if your AI could browse the web, read your files, access any database, "
    "and control any app — automatically? "
    "That's exactly what MCP makes possible. "

    "Before MCP, AI was incredibly powerful — but completely isolated. "
    "No file access. No database queries. No API calls. "
    "Every integration required custom code. Slow. Expensive. Fragmented. "

    "MCP stands for Model Context Protocol. "
    "An open standard created by Anthropic that gives AI a universal way "
    "to connect with external tools, data, and services. "
    "Think of it as USB-C for AI — one connector that works everywhere. "

    "The architecture has three layers. "
    "First: the Host — your AI application, like Claude Desktop or Cursor. "
    "Second: the MCP Client, which manages connections inside the app. "
    "Third: the MCP Server, which exposes tools and real-world data to the AI. "

    "MCP provides three powerful primitives. "
    "Tools let AI take actions — run code, search the web, update a database. "
    "Resources give AI access to data — files, emails, documents. "
    "Prompts provide reusable templates for common workflows. "

    "In practice, imagine Claude automatically reading your GitHub issues, "
    "writing code fixes, running tests, "
    "and opening a pull request — all in one conversation, with zero custom code. "

    "Today, over one thousand MCP servers exist. "
    "GitHub, Cloudflare, Stripe, and dozens of major companies "
    "have built official integrations. "
    "Claude Desktop, Cursor, and VS Code all support MCP natively. "

    "For developers: build once, deploy everywhere. "
    "For businesses: AI that understands your tools and data. "
    "For everyone: AI that actually gets real work done. "

    "MCP is not just a feature. "
    "It's the foundation for the next generation of AI agents. "
    "One protocol. Infinite possibilities. "

    "Follow for more AI content that actually matters."
)


async def main() -> None:
    os.makedirs(os.path.dirname(OUTPUT), exist_ok=True)
    print(f"Generating MCP voiceover with voice: {VOICE}")
    communicate = edge_tts.Communicate(SCRIPT, VOICE, rate="+12%")
    await communicate.save(OUTPUT)
    size = os.path.getsize(OUTPUT)
    print(f"✓ Saved {OUTPUT}  ({size / 1024:.1f} KB)")


if __name__ == "__main__":
    asyncio.run(main())
