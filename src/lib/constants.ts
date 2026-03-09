
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
    color: '#3b82f6', // blue
    insight: 'The structural foundation that transforms complex problems into elegant, scalable architectures. It is the language of order in a world of chaotic data.',
    x: 220,
    y: 180,
  },
  {
    id: 'creativity',
    label: 'Creativity',
    color: '#8b5cf6', // violet
    insight: 'The spark that envisions beyond current limitations to build unique digital experiences. True engineering is an act of creative rebellion.',
    x: 580,
    y: 180,
  },
  {
    id: 'empathy',
    label: 'Empathy',
    color: '#ec4899', // pink
    insight: 'Understanding the human at the other end of the screen to design inclusive and accessible systems. We code for people, not for machines.',
    x: 180,
    y: 420,
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#06b6d4', // cyan
    insight: 'The multiplier effect where diverse perspectives converge to solve the unsolvable. Innovation is a team sport played at the speed of thought.',
    x: 620,
    y: 420,
  },
  {
    id: 'curiosity',
    label: 'Curiosity',
    color: '#eab308', // gold
    insight: 'The perpetual engine that drives continuous learning and the exploration of new frontiers. The best developers are lifelong students of the unknown.',
    x: 400,
    y: 580,
  },
];
