import { Router } from "express";
import { loginControllers } from "../controllers";

const loginRoutes: Router = Router();

loginRoutes.post("", loginControllers.createToken);

export default loginRoutes;
