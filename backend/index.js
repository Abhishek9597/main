import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./src/config/db.js";
import cors from "cors";
import router from "./src/app/routes.js";
import http from "http";
dotenv.config();

const app = express();
await connectDb();
app.use(cors());
app.use(express.json());
app.use(router);
app.use("/uploads",express.static("uploads"))
const server = http.createServer(app);
const PORT = process.env.PORT;
server.listen(PORT, async () => {
  console.log(`Server is running ${PORT}`);
});
