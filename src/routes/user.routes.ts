import { Router } from "express";
import userCreateController from "../controllers/user/create.controller";
import userDeleteController from "../controllers/user/delete.controller";
import userListController from "../controllers/user/list.controller";
import userUpdateController from "../controllers/user/update.controller";
import { authenticationMiddleware } from "../middlewares/authUser.middleware";
import verifyOwnerIdMiddleware from "../middlewares/verifyOwnerId.middleware";
import verifySchemaMiddleware from "../middlewares/verifySchema.middleware";
import createPhoneSchema from "../schemas/phone/create.schema";
import updatePhoneSchema from "../schemas/phone/update.shema";

const userRoutes = Router()

userRoutes.post("/create", verifySchemaMiddleware(createPhoneSchema), userCreateController)
userRoutes.get("/list/:id", authenticationMiddleware, verifyOwnerIdMiddleware, userListController)
userRoutes.delete("/delete/:id", authenticationMiddleware, verifyOwnerIdMiddleware, userDeleteController)
userRoutes.patch("/update/:id", verifySchemaMiddleware(updatePhoneSchema), authenticationMiddleware, verifyOwnerIdMiddleware, userUpdateController)

export default userRoutes