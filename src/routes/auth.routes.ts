import express from "express";

import { AuthController } from "../controllers/auth.controller";
import { AuthService } from "../services/auth.services";

const Router = express.Router();
// Tạo instance của AuthService
const authService = new AuthService();

// Tạo instance của AuthController và truyền AuthService vào
const authController = new AuthController(authService);
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
Router.post("/login", (req, res) => authController.login(req, res));

export { Router as authRouter };
