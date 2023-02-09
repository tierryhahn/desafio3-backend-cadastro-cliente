import "reflect-metadata";
import express from "express";
import cors from "cors"
import "express-async-errors";
import errorMiddleware from "./middlewares/error.middleware";
import userRoutes from "./routes/user.routes";
import contactRoutes from "./routes/contact.routes";
import sessionRoutes from "./routes/session.routes";
import emailRoutes from "./routes/email.routes";
import phoneRoutes from "./routes/phone.routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/user", userRoutes)
app.use("/contact", contactRoutes)
app.use("/login", sessionRoutes)
app.use("/email", emailRoutes)
app.use("/phone", phoneRoutes)

app.use(errorMiddleware);

export default app;