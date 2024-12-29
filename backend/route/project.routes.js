import { Router } from "express";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";
import * as projectController from "../controllers/project.controller.js";
const router = Router();

router.post("/create", authMiddleware.authUser, body("name").isString().withMessage("Name is required"), projectController.createProject);
export default router;
