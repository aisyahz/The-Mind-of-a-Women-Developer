
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
    insight: 'Structure within complexity. The architecture of understanding.',
    x: 650,
    y: 280, // Upper Right
  },
  {
    id: 'creativity',
    label: 'Creativity',
    color: '#a855f7', // Vivid Violet
    insight: 'The leap beyond rules. The spark that imagines what does not yet exist.',
    x: 400,
    y: 120, // Top Crown
  },
  {
    id: 'empathy',
    label: 'Empathy',
    color: '#f43f5e', // Strong Rose/Magenta
    insight: 'To design for people, not just systems. To feel the human shape of technology.',
    x: 180,
    y: 480, // Far Left
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#22d3ee', // Bright Cyan
    insight: 'Where ideas become stronger together. Innovation through connection.',
    x: 620,
    y: 680, // Lower Right
  },
  {
    id: 'curiosity',
    label: 'Curiosity',
    color: '#f59e0b', // Amber/Gold
    insight: 'The first ignition. The force that opens every path.',
    x: 420,
    y: 420, // Central Core
  },
];
