import express, { Router } from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./library/logger";
import { config } from "./config/config";
import postRoutes from "./routes/invoice";

const app = express();

app.use("/posts", postRoutes);

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

// const CONNECTION_URL =
//   "mongodb+srv://akshat:akshat@cluster0.mt7ym69.mongodb.net/?retryWrites=true&w=majority";

// const PORT = process.env.SERVER_PORT || 5000;

mongoose
  .connect(config.mongo.url)
  .then(() => {
    app.listen(config.server.port, () =>
      logger.info(`Server running on port: ${config.server.port}`)
    );
    //StartServer();
  })
  .catch((error) => {
    logger.error("Unable to connect");
    logger.error(error);
  });

// const StartServer = () => {
//   Router.use((req,res,next) => {
//     logger.info
//   })
// };
