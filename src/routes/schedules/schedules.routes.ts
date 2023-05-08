import { Router } from "express";
import { schedulesControllers } from "../../controllers";

const schedulesRoutes: Router = Router();

schedulesRoutes.post("", schedulesControllers.post);

schedulesRoutes.get("/realEstate/:id", schedulesControllers.get);

export default schedulesRoutes;
