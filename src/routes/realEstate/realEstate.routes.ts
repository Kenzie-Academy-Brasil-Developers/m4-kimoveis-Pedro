import { Router } from "express";
import { realEstateControllers } from "../../controllers";
import { validateMiddlewares, verifyMiddlewares } from "../../middlewares";
import { createRealEstateSchema } from "../../schemas";

const realEstateRoutes: Router = Router();

realEstateRoutes.post('',
    validateMiddlewares.token,
    verifyMiddlewares.isAdminOrOwner,
    validateMiddlewares.body(createRealEstateSchema),
    verifyMiddlewares.addresses,
    realEstateControllers.create)

realEstateRoutes.get("", realEstateControllers.read);

export default realEstateRoutes;
