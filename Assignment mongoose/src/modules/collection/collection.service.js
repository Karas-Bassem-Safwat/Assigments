import { Router } from "express";
import * as collection from "./collection.controller.js";

const collectionRouter = Router();


collectionRouter.post("/books", collection.createBooksCollection);


collectionRouter.post("/authors", collection.createAuthorsCollection);


collectionRouter.post("/logs/capped", collection.createLogsCappedCollection);


collectionRouter.post("/books/index", collection.createBooksIndex);

export { collectionRouter };
