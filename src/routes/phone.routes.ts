import { Router } from "express";
import phoneCreateController from "../controllers/phone/create.controller";
import phoneDeleteController from "../controllers/phone/delete.controller";
import phoneUpdateController from "../controllers/phone/update.controller";
import { authenticationMiddleware } from "../middlewares/authUser.middleware";
import verifySchemaMiddleware from "../middlewares/verifySchema.middleware";
import createPhoneSchema from "../schemas/phone/create.schema";
import updatePhoneSchema from "../schemas/phone/update.shema";

const phoneRoutes = Router()

phoneRoutes.post("/build/:owner_id", verifySchemaMiddleware(createPhoneSchema), authenticationMiddleware, phoneCreateController)
phoneRoutes.delete("/remove/:id", authenticationMiddleware, phoneDeleteController)
phoneRoutes.patch("/refresh/:id", verifySchemaMiddleware(updatePhoneSchema), authenticationMiddleware, phoneUpdateController)

export default phoneRoutes