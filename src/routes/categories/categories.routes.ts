import { Router } from "express";
import { categoriesControllers } from "../../controllers";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(""), categoriesControllers.post;

categoriesRoutes.get("", categoriesControllers.get);

categoriesRoutes.get("/:id/realEstate", categoriesControllers.getAllRealEstate);

export default categoriesRoutes;
