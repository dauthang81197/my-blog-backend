import { Express } from "express";

import rateLimitMiddleware from "./rate-limit.middleware";
import { securityMiddleware } from "./security.middleware";

const applyMiddlewares = (app: Express): void => {
  app.use(securityMiddleware);
  app.use(rateLimitMiddleware);
};
export default applyMiddlewares;
