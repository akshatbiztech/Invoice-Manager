import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./logger";

const app = express();

app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

const CONNECTION_URL =
  "mongodb+srv://akshat:akshat@cluster0.mt7ym69.mongodb.net/?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => logger.info(`Server running on port: ${PORT}`))
  )
  .catch((error) => {
    logger.error("Unable to connect");
    logger.error(error);
  });
