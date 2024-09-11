export interface nodeData extends Record<string, unknown> {
  imageUrl: string;
  companyName: string;
  customSize?: string;
  position: string;
}

export interface node extends NodeBase {
  id: string;
  type?: string;
  position: { x: number; y: number };
  data: nodeData;
}
