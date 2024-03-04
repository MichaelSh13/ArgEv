import { z } from "zod";
import { TypeToZod } from "../utils/type-to-zod.type";

export type CreateEventI = {
  title: string;
  description: string;
  name?: string;
  location?: string;
  start?: Date;
  duration?: number;
};

export type UpdateEventI = {
  id: string;
  data: Partial<CreateEventI>;
};

export type DeleteEventI = {
  id: string;
};

const createSchema: TypeToZod<CreateEventI> = {
  title: z.string().min(1),
  description: z.string().min(1),
  name: z.string().optional(),
  location: z.string().optional(),
  start: z.date().optional(),
  duration: z.number().optional(),
};
const updateSchema: TypeToZod<UpdateEventI> = {
  id: z.string().min(1),
  data: z.object({
    title: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    name: z.string().optional(),
    location: z.string().optional(),
    start: z.date().optional(),
    duration: z.number().optional(),
  }),
};
const deleteSchema: TypeToZod<DeleteEventI> = {
  id: z.string().min(1),
};
export const eventCreateSchema = z.object(createSchema);
export const eventUpdateSchema = z.object(updateSchema);
export const eventDeleteSchema = z.object(deleteSchema);
