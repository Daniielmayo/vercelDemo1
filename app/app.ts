import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db";
import userRoutes from "./routes/user.routes";
import songRoutes from "./routes/songs.routes";
import { setupSwagger } from "./docs/swagger";
import serverless from "serverless-http";
import path from "path";

dotenv.config();
const app = express();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
    "Access-Control-Allow-Origin": "*",
};

app.use(cors(corsOptions));
app.use(express.json());

connectDB();
setupSwagger(app);
app.use(express.static("public"));
app.use("/api", userRoutes);
app.use("/api", songRoutes);
app.use("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));

export default serverless(app);