const express = require("express");
const { userAuthMiddleware } = require("../Middlewares/user.js");
const { clientInputValidation } = require("../Middlewares/client.js");
const {
  CreateClient,
  GetAllClients,
  GetClientByID,
  UpdateClientByID,
  DeleteClientByID,
  GetAllClientsList,
} = require("../Controllers/client");

const clientRouter = express.Router();

clientRouter.post("/", userAuthMiddleware, clientInputValidation, CreateClient);
clientRouter.get("/", userAuthMiddleware, GetAllClients);
clientRouter.get("/list", userAuthMiddleware, GetAllClientsList);
clientRouter.get("/:clientId", userAuthMiddleware, GetClientByID);
clientRouter.put(
  "/",
  userAuthMiddleware,
  clientInputValidation,
  UpdateClientByID
);
clientRouter.delete("/:clientId", userAuthMiddleware, DeleteClientByID);
module.exports = clientRouter;
