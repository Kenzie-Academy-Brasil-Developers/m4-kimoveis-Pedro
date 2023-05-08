import { Router } from "express";
import { loginControllers } from "../../controllers";
import { ensureBodyIsValidMiddleware } from "../../middlewares";
import { usersLoginSchema } from "../../schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  ensureBodyIsValidMiddleware.verify(usersLoginSchema),
  loginControllers.createToken
);

export default loginRoutes;
