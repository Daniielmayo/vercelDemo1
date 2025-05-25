"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const songs_routes_1 = __importDefault(require("./routes/songs.routes"));
const swagger_1 = require("./docs/swagger");
const serverless_http_1 = __importDefault(require("serverless-http"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*",
};
app.use((0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
(0, db_1.default)();
(0, swagger_1.setupSwagger)(app);
app.use(express_1.default.static("public"));
app.use("/api", user_routes_1.default);
app.use("/api", songs_routes_1.default);
const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
module.exports.handler = (0, serverless_http_1.default)(app);
