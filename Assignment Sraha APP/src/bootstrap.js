import express from "express";
import { connection } from "./DB/connection.js";
import 'dotenv/config'
const app = express();
app.use(express.json());
await connection();

import "./config/.env"
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


export const bootstrap = () => {

  
  app.use("/books", booksRouter);


  app.listen(port, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
