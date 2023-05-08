import { z } from "zod";

const addressesSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullable(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const addressesReturnSchema = addressesSchema.extend({ id: z.number() });

const realStateSchema = z.object({
  id: z.number(),
  value: z.number().positive().or(z.string()),
  size: z.number().int().positive(),
  address: addressesSchema,
  categoryId: z.number(),
  sold: z.boolean().default(false),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const createRealStateSchema = realStateSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

const getRealStateSchema = realStateSchema.array();
