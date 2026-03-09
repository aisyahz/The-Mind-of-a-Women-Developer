
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
    insight: 'The structural foundation that transforms complex problems into elegant, scalable architectures.',
    x: 250,
    y: 150,
  },
  {
    id: 'creativity',
    label: 'Creativity',
    color: '#8b5cf6', // violet
    insight: 'The spark that envisions beyond current limitations to build unique digital experiences.',
    x: 550,
    y: 150,
  },
  {
    id: 'empathy',
    label: 'Empathy',
    color: '#ec4899', // pink
    insight: 'Understanding the human at the other end of the screen to design inclusive and accessible systems.',
    x: 200,
    y: 400,
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#06b6d4', // cyan
    insight: 'The multiplier effect where diverse perspectives converge to solve the unsolvable.',
    x: 600,
    y: 400,
  },
  {
    id: 'curiosity',
    label: 'Curiosity',
    color: '#eab308', // gold
    insight: 'The perpetual engine that drives continuous learning and the exploration of new frontiers.',
    x: 400,
    y: 550,
  },
];
