import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
const router = Router();
//register
router.post("/register", body("email").isEmail().withMessage("Email must be a valid email addresss"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), userController.createUserController);
//Login
router.post("/login", body("email").isEmail().withMessage("Email must be a valid email addresss"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), userController.loginController);
export default router;
