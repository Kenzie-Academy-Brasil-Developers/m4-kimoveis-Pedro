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
  usersControllers.create
);

usersRoutes.get("");

usersRoutes.patch("/:id");

usersRoutes.delete("/:id");

export default usersRoutes;
