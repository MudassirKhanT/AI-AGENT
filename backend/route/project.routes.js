import { Router } from "express";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";
import * as projectController from "../controllers/project.controller.js";
const router = Router();

router.post("/create", authMiddleware.authUser, body("name").isString().withMessage("Name is required"), projectController.createProject);
router.get("/all", authMiddleware.authUser, projectController.getAllProjects);
router.put(
  "/add-user",
  authMiddleware.authUser,
  body("projectId").isString().withMessage("Project Id is required"),
  body("users")
    .isArray({ min: 1 })
    .withMessage("Users must be an array of String")
    .bail()
    .custom((users) => users.every((user) => typeof user === "string"))
    .withMessage("Each user must be a string"),
  projectController.addUserToProject
);
export default router;
