import * as dotenv from "dotenv";
import express from "express";
import path from "path";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import { AppDataSource } from "./databases/data-source";
import { userRouter } from "./routes/user.routes";

import "reflect-metadata";

dotenv.config();

const app = express();
app.use(express.json());

const { PORT = 3000 } = process.env;
app.use("/auth", userRouter);

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
        url: "http://localhost:8080",
      },
    ],
  },
  apis: [path.join(__dirname, "./routes/*.ts")],
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
