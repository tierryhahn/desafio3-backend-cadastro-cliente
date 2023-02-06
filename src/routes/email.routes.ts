import { Router } from "express";
import emailCreateController from "../controllers/email/create.controller";
import emailDeleteController from "../controllers/email/delete.controller";
import emailUpdateController from "../controllers/email/update.controller";
import verifySchemaMiddleware from "../middlewares/verifySchema.middleware";
import { authenticationMiddleware } from "../middlewares/authUser.middleware";
import createSchema from "../schemas/email/create.schema";
import updateSchema from "../schemas/email/update.schema";

const emailRoutes = Router()

emailRoutes.post("/create/:contact_id", authenticationMiddleware, verifySchemaMiddleware(createSchema), emailCreateController)
emailRoutes.delete("/delete/:id", authenticationMiddleware, emailDeleteController)
emailRoutes.patch("/update/:id", authenticationMiddleware, verifySchemaMiddleware(updateSchema), emailUpdateController)

export default emailRoutes