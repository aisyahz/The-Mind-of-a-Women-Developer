
export interface NodeData {
  id: string;
  label: string;
  color: string;
  insight: string;
  x: number;
  y: number;
}

export const NODES: NodeData[] = [
  {
    id: 'logic',
    label: 'Logic',
    color: '#3b82f6', // Electric Blue
    insight: 'The structural foundation that transforms complex problems into elegant, scalable architectures. It is the language of order in a world of chaotic data.',
    x: 520,
    y: 330, // Forehead / Prefrontal
  },
  {
    id: 'creativity',
    label: 'Creativity',
    color: '#a855f7', // Vivid Violet
    insight: 'The spark that envisions beyond current limitations to build unique digital experiences. True engineering is an act of creative rebellion.',
    x: 400,
    y: 240, // Crown / Parietal
  },
  {
    id: 'empathy',
    label: 'Empathy',
    color: '#f43f5e', // Strong Rose/Magenta
    insight: 'Understanding the human at the other end of the screen to design inclusive and accessible systems. We code for people, not for machines.',
    x: 300,
    y: 480, // Back / Occipital
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#22d3ee', // Bright Cyan
    insight: 'The multiplier effect where diverse perspectives converge to solve the unsolvable. Innovation is a team sport played at the speed of thought.',
    x: 560,
    y: 520, // Lower Face / Interface
  },
  {
    id: 'curiosity',
    label: 'Curiosity',
    color: '#f59e0b', // Amber/Gold
    insight: 'The perpetual engine that drives continuous learning and the exploration of new frontiers. The best developers are lifelong students of the unknown.',
    x: 420,
    y: 410, // Central Core
  },
];
