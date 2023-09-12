import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);

  router.get("/crud", homeController.getCRUD);

  router.post("/post-crud", homeController.postCRUD);

  router.post("/api/login", userController.handleLogin);

  router.get("/api/get-users-all", userController.handleGetUsers);

  return app.use("/", router);
};

module.exports = initWebRoutes;
