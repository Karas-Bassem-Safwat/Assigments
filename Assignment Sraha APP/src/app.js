import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.routes.js";
import noteRoutes from "./routes/note.routes.js";

const app = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use("/notes", noteRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  });
