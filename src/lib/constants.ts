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
    x: 740,
    y: 320, // Increased separation
  },
  {
    id: 'creativity',
    label: 'Creativity',
    color: '#a855f7', // Vivid Violet
    insight: 'The leap beyond rules. The spark that imagines what does not yet exist.',
    x: 400,
    y: 280, // Moved down for shard visibility
  },
  {
    id: 'empathy',
    label: 'Empathy',
    color: '#f43f5e', // Strong Rose/Magenta
    insight: 'To design for people, not just systems. To feel the human shape of technology.',
    x: 60,
    y: 580, // Pushed far left
  },
  {
    id: 'collaboration',
    label: 'Collaboration',
    color: '#22d3ee', // Bright Cyan
    insight: 'Where ideas become stronger together. Innovation through connection.',
    x: 740,
    y: 920, // Pushed lower right
  },
  {
    id: 'curiosity',
    label: 'Curiosity',
    color: '#f59e0b', // Amber/Gold
    insight: 'The first ignition. The force that opens every path.',
    x: 400,
    y: 580, // Central Core
  },
];
