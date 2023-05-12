import { z } from "zod";
import { createSchedulesSchema } from "../../schemas/schedules/schedules.schema";

type TCreateSchedules = z.infer<typeof createSchedulesSchema>;

export { TCreateSchedules };
