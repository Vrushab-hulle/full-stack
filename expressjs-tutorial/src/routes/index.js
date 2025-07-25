import { Router } from "express";
import userRouter from "./users.js";
import productRouter from "./products.js";
import authRouter from "./authRoutes.js";
import { verifyToken } from "../middleware/verifyToken.js";

const routes = Router();

routes.use(authRouter);
//register all router in this file
routes.use(verifyToken)
routes.use(productRouter);
routes.use(userRouter);

export default routes;
