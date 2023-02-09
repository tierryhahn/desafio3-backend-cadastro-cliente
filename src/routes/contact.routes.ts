import { Router } from "express";
import contactCreateController from "../controllers/contact/create.controller";
import contactDeleteController from "../controllers/contact/delete.controller";
import contactListController from "../controllers/contact/list.controller";
import contactUpdateController from "../controllers/contact/update.controller";
import { authenticationMiddleware } from "../middlewares/authUser.middleware";
import verifyOwnerIdMiddleware from "../middlewares/verifyOwnerId.middleware";
import verifySchemaMiddleware from "../middlewares/verifySchema.middleware";
import createSchema from "../schemas/contact/create.schema";
import updateSchema from "../schemas/contact/update.schema";

const contactRoutes = Router()

contactRoutes.post("/build/:id", authenticationMiddleware, verifyOwnerIdMiddleware, verifySchemaMiddleware(createSchema), contactCreateController)
contactRoutes.get("/:id", authenticationMiddleware, verifyOwnerIdMiddleware, contactListController)
contactRoutes.patch("/refresh/:contact_id", authenticationMiddleware, verifySchemaMiddleware(updateSchema), contactUpdateController)
contactRoutes.delete("/remove/:contact_id", authenticationMiddleware, contactDeleteController)

export default contactRoutes
