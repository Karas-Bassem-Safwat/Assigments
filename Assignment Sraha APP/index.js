import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
import express from "express";
import connectDB from "./src/DB/connection.js";
import { connectRedis } from "./src/DB/redis.js";
import bootstrap from "./src/bootstrap.js";

const app = express();
app.use(express.json());

bootstrap(app);

const PORT = process.env.PORT || 3000;

Promise.all([connectDB(), connectRedis()])
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
  .catch((err) => {
    console.error("❌ Startup error:", err.message);
    process.exit(1);
  });
