import rateLimit from "express-rate-limit";

const rateLimitMiddleware = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: Number(process.env.RATE_LIMIT) || 100,
  message: "Please try again",
});

export default rateLimitMiddleware;
