# Project: The Mind of a Woman Developer
**Immersive Digital Art Installation**

This project is a high-fidelity, cinematic interactive experience built as a narrative journey through the history and future of innovation.

## 🌌 Narrative Arc
1.  **Curiosity (Hero):** The journey starts with a neural constellation shaped like a woman's profile. Interaction centers on the "Curiosity" node.
2.  **Discovery (Transition):** A "Temporal Expansion" where neural paths grow dynamically, bridging the modern mind to historical roots.
3.  **Legacy (Gallery):** A constellation of four pioneers (Ada Lovelace, Grace Hopper, Margaret Hamilton, Radia Perlman) presented as living star nodes.
4.  **Continuation (Finale):** A "Star-Birth" sequence where the user is invited to become the next node in the constellation.

## 🛠 Tech Stack
- **Framework:** Next.js 15 (App Router), React 19.
- **Styling:** Tailwind CSS (Custom HSL variables).
- **Animation:** 
    - **Framer Motion:** SVG path drawing, staggered text reveals, physics-based springs, and orchestrating complex multi-stage transitions.
    - **Canvas API:** High-performance procedural cosmic background with multi-layer parallax stars, shooting stars, and nebulae.
- **Components:** Radix UI / ShadCN (heavily customized for glassmorphism and neon aesthetics).
- **Icons:** Lucide React.

## 🎨 Visual Identity
- **Background:** Deep cosmic void (`#050508`).
- **Color Palette:** 
    - `Logic`: Electric Blue (`#3b82f6`)
    - `Creativity`: Vivid Violet (`#a855f7`)
    - `Empathy`: Rose Magenta (`#f43f5e`)
    - `Collaboration`: Bright Cyan (`#22d3ee`)
    - `Curiosity`: Amber Gold (`#f59e0b`)
- **Typography:** 'Space Grotesk' (Modern, geometric, high-tracking).
- **Signature Effects:**
    - Custom "Neural Node" cursor with `difference` blend mode.
    - Glassmorphic UI with `backdrop-blur-2xl` and neon glow filters (`drop-shadow`).
    - Cinematic sequential reveals for all historical content.

## ⚡ Key Interactive Systems
- **The Temporal Bridge:** A logic system that handles the transition from the Hero to the Gallery by animating SVG path lengths and performing a synchronized smooth scroll.
- **Star Node Simulation:** Each pioneer portrait is an active "node" with its own orbital particles, pulsing halos, and star-path connections.
- **Cross-Era Mapping:** Hovering over pioneers sends a visual "pulse" through the constellation to highlight corresponding traits in the modern neural mind (e.g., Ada Lovelace → Creativity).
- **Legacy Gateway:** A central "Legacy Node" that acts as a clickable waypoint, replacing manual scrolling with a guided "Warp" transition to the finale.

## 🎬 Animation Philosophy
Every movement is timed to feel "weighty" and cinematic. Transitions avoid instant jumps, instead using `ease-out` and `staggered` materialization to create a sense of wonder and discovery.
