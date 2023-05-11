import { Router } from "express";
import { categoriesControllers } from "../../controllers";
import { validateMiddlewares, verifyMiddlewares } from "../../middlewares";
import { createCategoriesSchema } from "../../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(""),
    validateMiddlewares.body(createCategoriesSchema),
    validateMiddlewares.token,
    verifyMiddlewares.isAdminOrOwner,
    categoriesControllers.create;

categoriesRoutes.get("", categoriesControllers.read);

categoriesRoutes.get("/:id/realEstate", categoriesControllers.readRealEstatesCategory);

export default categoriesRoutes;
