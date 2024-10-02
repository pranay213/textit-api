import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import userRoutes from "./routes/userRoutes";
import logger from "./utils/logger";
import connectDB from "./config/dbConfig";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server);
connectDB();

app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", userRoutes);
app.use((req, res, next) => {
  logger.info(`Method: ${req.method}, URL: ${req.url}`); // Log method and URL
  next();
});

// Socket connection
io.on("connection", (socket) => {
  console.log("New user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export default server;
