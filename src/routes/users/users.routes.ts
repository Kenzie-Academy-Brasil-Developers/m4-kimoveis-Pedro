import { Router } from "express";
import { validateMiddlewares, verifyMiddlewares } from "../../middlewares";
import { createUsersSchema, updateUsersSchema } from "../../schemas";
import { usersControllers } from "../../controllers";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateMiddlewares.body(createUsersSchema),
  verifyMiddlewares.email,
  usersControllers.create
);

usersRoutes.get(
  "",
  validateMiddlewares.token,
  verifyMiddlewares.isAdminOrOwner,
  usersControllers.read
);

usersRoutes.patch(
  "/:id",
  verifyMiddlewares.isUserExists,
  validateMiddlewares.body(updateUsersSchema),
  validateMiddlewares.token,
  verifyMiddlewares.isAdminOrOwner,
  usersControllers.update
);

usersRoutes.delete(
  "/:id",
  verifyMiddlewares.isUserExists,
  validateMiddlewares.token,
  verifyMiddlewares.isAdminOrOwner,
  usersControllers.destroy
);

export default usersRoutes;
