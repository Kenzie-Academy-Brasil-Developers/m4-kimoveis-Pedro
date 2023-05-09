import { Router } from "express";
import { loginControllers } from "../../controllers";
import { usersLoginSchema } from "../../schemas";
import { validateMiddlewares } from "../../middlewares";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  validateMiddlewares.body(usersLoginSchema),
  loginControllers.createToken
);

export default loginRoutes;
