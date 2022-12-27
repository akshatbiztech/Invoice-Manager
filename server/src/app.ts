import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./library/logger";
import { config } from "./config/config";
import invoiceRoutes from "./routes/Invoice";
import http from "http";

const app = express();

mongoose
  .connect(config.mongo.url)
  .then(() => {
    logger.info("Connected to MongoDB");
    StartServer();
  })
  .catch((error) => {
    logger.error("Unable to connect");
    logger.error(error);
  });

const StartServer = () => {
  app.use((req, res, next) => {
    logger.info(
      `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    );

    res.on("finish", () => {
      logger.info(
        `Incoming -> Method: [${req.method}] - Url: [${req.url}] - IP: [${req.socket.remoteAddress}] - Status: [${res.statusCode}]`
      );
    });
    next();
  });

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  //Rules of the API
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }
    next();
  });

  //Routes
  app.use("/invoices", invoiceRoutes);

  //Healthcheck
  app.get("/ping", (req, res, next) =>
    res.status(200).json({ message: "pong" })
  );

  //Error handling
  app.use((req, res, next) => {
    const error = new Error("not found");
    logger.error(error);

    return res.status(404).json({ message: error.message });
  });

  http
    .createServer(app)
    .listen(config.server.port, () =>
      logger.info(`Server running on port: ${config.server.port}`)
    );
};
