import { Router } from "express";
import { validateMiddlewares, verifyMiddlewares } from "../../middlewares";
import { createUsersSchema } from "../../schemas";
import { usersControllers } from "../../controllers";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  validateMiddlewares.body(createUsersSchema),
  verifyMiddlewares.email,
  usersControllers.create
);

usersRoutes.get("", usersControllers.read);

usersRoutes.patch(
  "/:id",
  verifyMiddlewares.isUserExists,
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
