import { Express } from "express";

import { authRouter } from "./auth.routes";
import { helloRouter } from "./hello.routes";
// Định nghĩa base URL
const baseUrl = "/api/v1";
export const applyBaseRoutes = (app: Express) => {
  app.use(`${baseUrl}/auth`, authRouter);
  app.use(`${baseUrl}`, helloRouter);
};
