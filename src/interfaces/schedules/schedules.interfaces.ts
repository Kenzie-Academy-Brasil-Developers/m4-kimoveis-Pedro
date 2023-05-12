import { z } from "zod";
import { createSchedulesSchema } from "../../schemas/schedules/schedules.schema";

type TCreateSchedule = z.infer<typeof createSchedulesSchema>;
