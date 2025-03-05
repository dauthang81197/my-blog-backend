import express from "express";

const Router = express.Router();
Router.get("/hello", function (req, res) {
  res.send("Hello");
});
export { Router as helloRouter };
