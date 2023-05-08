import { z } from "zod";

const schedulesSchema = z.object({
  id: z.number(),
  date: z.string(),
  hour: z.string().max(10),
  realEstateId: z.number(),
  userId: z.number(),
});

const createSchedulesSchema = schedulesSchema.omit({ id: true, userId: true });
