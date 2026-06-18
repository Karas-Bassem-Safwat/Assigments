import dotenv from "dotenv";
dotenv.config({ path: "./src/config/.env" });
import express from "express";
import connectDB from "./src/DB/connection.js";
import bootstrap from "./src/bootstrap.js";

const app = express();
app.use(express.json());

bootstrap(app);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`)))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
