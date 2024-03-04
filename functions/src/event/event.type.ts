export type EventEntity = {
  title: string;
  description: string;
  name?: string;
  location?: string;
  start?: Date;
  duration?: number;
  members: unknown[];
};
