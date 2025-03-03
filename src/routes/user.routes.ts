import * as express from "express";

import { AuthController } from "../controllers/auth.controller";
import { UserController } from "../controllers/user.controller";
import { authentification } from "../middleware/authentification";
import { authorization } from "../middleware/authorization";
const Router = express.Router();
/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login user
 *     description: Authenticate user and return token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */
Router.get(
  "/users",
  authentification,
  authorization(["admin"]),
  UserController.getUsers,
);
Router.get(
  "/profile",
  authentification,
  authorization(["user", "admin"]),
  AuthController.getProfile,
);
Router.post("/signup", UserController.signup);
Router.post("/login", AuthController.login);
Router.put(
  "/update/:id",
  authentification,
  authorization(["user", "admin"]),
  UserController.updateUser,
);
Router.delete(
  "/delete/:id",
  authentification,
  authorization(["admin"]),
  UserController.deleteUser,
);
export { Router as userRouter };
