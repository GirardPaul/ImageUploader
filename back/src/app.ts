import "reflect-metadata";
import express from "express";
import { createExpressServer, useContainer } from "routing-controllers";
import { Container } from "typedi";
import { AppDataSource } from "./config/db/data-source";
import { DocumentsController } from "./controllers/DocumentsController";
import { CustomErrorHandler } from "./middlewares/CustomErrorHandler";
import {config} from "dotenv";
config();
AppDataSource.initialize()
  .then(async () => {
    useContainer(Container);

    const app = createExpressServer({
      cors: true,
      routePrefix: "/api",
      defaultErrorHandler: false,
      controllers: [DocumentsController],
      middlewares: [CustomErrorHandler]
    });
    app.use(express.json({ limit: "50mb" }));

    app.listen(3000, () => {
      console.log("API Image Uploader listening on port 3000!");
    });
  })
  .catch((error) => console.log(error));
