import express from "express";
import { connection } from "./DB/connection.js";
import { booksRouter } from "./modules/books/books.service.js";
import { authorsRouter } from "./modules/authors/authors.service.js";
import { collectionRouter } from "./modules/collection/collection.service.js";
import { logsRouter } from "./modules/logs/logs.service.js";

const app = express();
app.use(express.json());
await connection();

export const bootstrap = () => {
  const port = 3000;

  
  app.use("/books", booksRouter);
  app.use("/collection", collectionRouter);
  app.use("/logs", logsRouter);
  app.use("/", authorsRouter); 

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};
