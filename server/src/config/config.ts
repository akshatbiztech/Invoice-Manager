import dotenv from "dotenv";
//import autoIncrement from "mongoose-auto-increment";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "akshat";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "akshat";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.mt7ym69.mongodb.net/?retryWrites=true&w=majority`;

const SERVER_PORT = process.env.SERVER_PORT
  ? Number(process.env.SERVER_PORT)
  : 5000;

export const config = {
  mongo: {
    url: MONGO_URL,
  },
  server: {
    port: SERVER_PORT,
  },
};

//export const autoinc = autoIncrement.initialize(config);
