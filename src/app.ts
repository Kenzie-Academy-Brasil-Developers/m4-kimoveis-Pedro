import "reflect-metadata";
import "express-async-errors";
import express from "express";
import {
  usersRoutes,
  loginRoutes,
  categoriesRoutes,
  realEstateRoutes,
  schedulesRoutes,
} from "./routes";
import { handleErros } from "./error";

const app = express();
app.use(express.json());

app.use("/users", usersRoutes);

app.use("/login", loginRoutes);

app.use("/categories", categoriesRoutes);

app.use("/realEstate", realEstateRoutes);

app.use("/schedules", schedulesRoutes);

app.use(handleErros);

export default app;
