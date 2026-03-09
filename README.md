# Project: The Mind of a Woman Developer
**Immersive Digital Art Installation**

This project is a high-fidelity, cinematic interactive experience built as a narrative journey through the history and future of innovation. It explores the interconnected nature of logic, creativity, empathy, and collaboration.

## 🌌 Narrative Arc
1.  **Curiosity (Hero):** The journey starts with a neural constellation shaped like a woman's profile. Interaction centers on the "Curiosity" node, the spark of all innovation.
2.  **Discovery (Transition):** A "Temporal Expansion" where neural threads grow dynamically downward, bridging the modern mind to its historical roots through a cinematic smooth-scroll transition.
3.  **Legacy (Gallery):** A constellation of four pioneers (Ada Lovelace, Grace Hopper, Margaret Hamilton, Radia Perlman) presented as living "Star Nodes." 
    - **Discovery Lock:** Access to the future is gated until all four pioneers are visited via interactive Nav-Orbs.
    - **Cross-Era Mapping:** Hovering over a pioneer sends a visual pulse to the corresponding trait in the modern mind (e.g., Ada Lovelace → Creativity).
4.  **Continuation (Finale):** A "Star-Birth" sequence where the user ignites their own node, causing the constellation to grow with organic, branching neural paths.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router), React 19.
- **Animation:** 
    - **Framer Motion:** Orchestrates complex multi-stage transitions, SVG path drawing (Temporal Bridge), and the organic branching growth in the finale.
    - **Canvas API:** High-performance procedural cosmic background with multi-layer parallax stars, shooting stars, and nebulae.
- **Styling:** Tailwind CSS with custom HSL variables for a consistent neon/glassmorphic aesthetic.
- **Typography:** 'Space Grotesk' (Modern, geometric, high-tracking).

## 🎨 Visual Identity
- **Background:** Deep cosmic void (`#050508`).
- **Color Palette:** 
    - `Logic`: Electric Blue (`#3b82f6`)
    - `Creativity`: Vivid Violet (`#a855f7`)
    - `Empathy`: Rose Magenta (`#f43f5e`)
    - `Collaboration`: Bright Cyan (`#22d3ee`)
    - `Curiosity`: Amber Gold (`#f59e0b`)
- **Signature Effects:**
    - **Neural Node Cursor:** Custom cursor with `difference` blend mode and reactive glow.
    - **Living Star Nodes:** Each pioneer portrait features orbital particles, pulsing halos, and faint orbit lines.
    - **Procedural Threads:** Ethereal neural filaments connecting the mind's facets.

## ⚡ Key Interactive Systems
- **The Temporal Bridge:** Handles the transition from Hero to Gallery by animating SVG path lengths and performing a synchronized cinematic scroll.
- **Legacy Gateway:** A central "Legacy Node" that acts as a clickable waypoint, replacing manual scrolling with a guided "Warp" transition to the finale.
- **Ignition Sequence:** A final interaction that symbolizes the viewer's contribution, causing the constellation to sprout new branches and nodes dynamically.

## 🎬 Animation Philosophy
Every movement is timed to feel "weighty" and cinematic. Transitions avoid instant jumps, instead using `ease-in-out` curves and staged materialization to create a sense of wonder, history, and discovery.
