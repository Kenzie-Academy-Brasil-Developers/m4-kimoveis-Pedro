import { Router } from "express";
import { schedulesControllers } from "../../controllers";
import { validateMiddlewares } from "../../middlewares";
import { createSchedulesSchema } from "../../schemas";

const schedulesRoutes: Router = Router();

schedulesRoutes.post(
  "",
  validateMiddlewares.token,
  validateMiddlewares.body(createSchedulesSchema),
  schedulesControllers.create
);

schedulesRoutes.get("/realEstate/:id", schedulesControllers.read);

export default schedulesRoutes;
