import { Router } from "express";
import loginController from "../controllers/session/login.controller";
import verifySchemaMiddleware from "../middlewares/verifySchema.middleware";
import loginSchema from "../schemas/session/login.schema";

const sessionRoutes = Router()

sessionRoutes.post("/login", verifySchemaMiddleware(loginSchema), loginController)

export default sessionRoutes