import "reflect-metadata";
import express from "express";
import cors from "cors"
import "express-async-errors";
import errorMiddleware from "./middlewares/error.middleware";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users",)
app.use("/contacts",)
app.use("/login",)
app.use("/emails",)
app.use("/phones",)

app.use(errorMiddleware);

export default app;