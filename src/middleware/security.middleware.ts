import cors from "cors";
import helmet from "helmet";

export const securityMiddleware = [
  cors({
    origin: ["https://yourdomain.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
  helmet(),
];
