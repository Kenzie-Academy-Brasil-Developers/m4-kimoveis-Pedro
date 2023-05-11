import { Router } from "express";
import { categoriesControllers } from "../../controllers";
import { validateMiddlewares, verifyMiddlewares } from "../../middlewares";
import { createCategoriesSchema } from "../../schemas";

const categoriesRoutes: Router = Router();

categoriesRoutes.post(""),
    validateMiddlewares.token,
    verifyMiddlewares.isAdminOrOwner,
    validateMiddlewares.body(createCategoriesSchema),
    categoriesControllers.post;

categoriesRoutes.get("", categoriesControllers.get);

categoriesRoutes.get("/:id/realEstate", categoriesControllers.getRealEstates);

export default categoriesRoutes;
