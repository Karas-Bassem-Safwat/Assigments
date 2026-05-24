import { Router } from "express";
import * as books from "./books.controller.js";

const booksRouter = Router();


booksRouter.post("/", books.addBook);


booksRouter.post("/batch", books.addBooks);


booksRouter.patch("/:title", books.updateBookYear);


booksRouter.get("/title", books.getBookByTitle);


booksRouter.get("/year", books.getBooksByYearRange);


booksRouter.get("/genre", books.getBooksByGenre);


booksRouter.get("/skip-limit", books.getBooksSkipLimit);


booksRouter.get("/year-integer", books.getBooksByYearInteger);


booksRouter.get("/exclude-genres", books.getBooksExcludeGenres);


booksRouter.delete("/before-year", books.deleteBooksBeforeYear);


booksRouter.get("/aggregate1", books.aggregate1);


booksRouter.get("/aggregate2", books.aggregate2);


booksRouter.get("/aggregate3", books.aggregate3);


booksRouter.get("/aggregate4", books.aggregate4);

export { booksRouter };
