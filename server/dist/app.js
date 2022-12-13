"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const logger_1 = __importDefault(require("./logger"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: "30mb" }));
app.use(express_1.default.urlencoded({ limit: "30mb", extended: true }));
app.use((0, cors_1.default)());
const CONNECTION_URL = "mongodb+srv://akshat:akshat@cluster0.mt7ym69.mongodb.net/?retryWrites=true&w=majority";
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(CONNECTION_URL)
    .then(() => app.listen(PORT, () => logger_1.default.info(`Server running on port: ${PORT}`)))
    .catch((error) => {
    logger_1.default.error("Unable to connect");
    logger_1.default.error(error);
});
