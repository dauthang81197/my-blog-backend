import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./databases/data-source";
import { authRouter } from "./routes/auth.routes";
import { helloRouter } from "./routes/hello.routes";

dotenv.config();

const app = express();
app.use(express.json());

const { PORT = 8080 } = process.env;
// Định nghĩa base URL
const baseUrl = "/api/v1";

app.use(baseUrl, (req, res, next) => {
  console.log(`Request received at: ${req.originalUrl}`);
  next();
});

app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}`, helloRouter);
// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My Blogs API",
      version: "1.0.0",
      description: "API documentation",
    },
    servers: [
      {
        url: "http://localhost:${PORT}${baseUrl}",
      },
    ],
  },
  apis: [
    path.join(__dirname, "./routes/*.ts"),
    path.join(__dirname, "./routes/*.js"),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

AppDataSource.initialize()
  .then(async () => {
    app.listen(PORT, () => {
      console.log("Server is running on http://localhost:" + PORT);
      console.log(
        "Swagger docs available at http://localhost:" + PORT + "/documentation",
      );
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));
