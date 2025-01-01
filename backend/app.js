import express from "express";
import morgan from "morgan";
import connect from "./db/db.js";
import userRoutes from "./route/user.routes.js";
import projectRoutes from "./route/project.routes.js";
import aiRoutes from "./route/ai.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
connect();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

//user routes
app.use("/users", userRoutes);
//Project ROutes
app.use("/projects", projectRoutes);
//Ai Routes
app.use("/ai", aiRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
