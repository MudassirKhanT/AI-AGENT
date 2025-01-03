import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { body } from "express-validator";
import * as authMiddleware from "../middleware/auth.middleware.js";
const router = Router();
//register
router.post("/register", body("email").isEmail().withMessage("Email must be a valid email addresss"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), userController.createUserController);
//Login
router.post("/login", body("email").isEmail().withMessage("Email must be a valid email addresss"), body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"), userController.loginController);
//profile
router.get("/profile", authMiddleware.authUser, userController.profileController);
//Logout
router.get("/logout", authMiddleware.authUser, userController.logoutController);
//Get all users
router.get("/all", authMiddleware.authUser, userController.getAllUsersController);
export default router;
