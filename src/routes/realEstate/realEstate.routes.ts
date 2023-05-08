import { Router } from "express";
import { realEstateControllers } from "../../controllers";

const realEstateRoutes: Router = Router();

realEstateRoutes.post("", realEstateControllers.post);

realEstateRoutes.get("", realEstateControllers.get);

export default realEstateRoutes;
