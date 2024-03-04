import type { ZodOptional, ZodType } from "zod";

export type TypeToZod<T> = {
  [K in keyof T]: T[K] extends string | number | boolean | null | undefined
    ? undefined extends T[K]
      ? ZodOptional<ZodType<Exclude<T[K], undefined>>>
      : ZodType<T[K]>
    : ZodType<T[K]>;
};
