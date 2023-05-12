import * as z from "zod";

const schedulesSchema = z.object({
  id: z.number(),
  date: z
    .string()
    .regex(/^\d{4}\/\d{2}\/\d{2}$/)
    .min(10)
    .max(10),
  hour: z
    .string()
    .regex(/^\d{2}:\d{2}$/)
    .min(5)
    .max(5),
  realEstateId: z.number().int(),
});

const createSchedulesSchema = schedulesSchema.omit({
  id: true,
});

export { schedulesSchema, createSchedulesSchema };
