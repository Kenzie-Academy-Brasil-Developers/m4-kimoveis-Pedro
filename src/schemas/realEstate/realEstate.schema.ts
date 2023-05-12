import { z } from "zod";
import { categoriesSchema } from "../categories/categories.schema";

const createAddressSchema = z.object({
  street: z.string(),
  zipCode: z.string().max(8),
  number: z.string().max(7).nullish(),
  city: z.string().max(20),
  state: z.string().max(2),
});

const createaAdressReturnSchema = createAddressSchema.extend({
  id: z.number(),
});

const createRealEstateSchema = z.object({
  sold: z.boolean().default(false),
  value: z.string().or(z.number().positive()),
  size: z.number().positive().int(),
  address: createAddressSchema,
  categoryId: z.number(),
});

const createRealEstateReturnSchema = createRealEstateSchema
  .extend({
    id: z.number(),
    createdAt: z.string(),
    updatedAt: z.string().nullish(),
    address: createaAdressReturnSchema.pick({
      street: true,
      zipCode: true,
      number: true,
      city: true,
      state: true,
      id: true,
    }),
    category: categoriesSchema,
  })
  .omit({
    categoryId: true,
  });

const getRealEstateSchema = z.array(createRealEstateReturnSchema);

export {
  createRealEstateSchema,
  createRealEstateReturnSchema,
  createAddressSchema,
  createaAdressReturnSchema,
  getRealEstateSchema,
};
