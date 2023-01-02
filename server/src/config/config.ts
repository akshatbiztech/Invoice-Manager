import dotenv from "dotenv";

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "akshat";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "akshat";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.mt7ym69.mongodb.net/?retryWrites=true&w=majority`;
const TWILIO_AUTH_SID = "AC5d3583922cb9578944d9b2b08de40432";
const TWILIO_AUTH_TOKEN = "06785554fc0006046d5f2049d3aff2ff";
const UPI_VPA = "akshat64647-2@okhdfcbank";
const UPI_PAYEE = "Invoice Manager";

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
  twilio: {
    sid: TWILIO_AUTH_SID,
    token: TWILIO_AUTH_TOKEN,
  },
  upi: {
    vpa: UPI_VPA,
    payee: UPI_PAYEE,
  },
};
