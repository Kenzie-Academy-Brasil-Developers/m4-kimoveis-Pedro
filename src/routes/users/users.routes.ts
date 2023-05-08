import { Router } from "express";
import {
  ensureBodyIsValidMiddleware,
  ensureEmailIsNotRegistedMiddleware,
} from "../../middlewares";
import { createUsersSchema } from "../../schemas";
import { usersControllers } from "../../controllers";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  ensureBodyIsValidMiddleware.verify(createUsersSchema),
  ensureEmailIsNotRegistedMiddleware.verify,
  usersControllers.post
);

usersRoutes.get("", usersControllers.get);

usersRoutes.patch("/:id", usersControllers.update);

usersRoutes.delete("/:id", usersControllers.deleteUser);

export default usersRoutes;
