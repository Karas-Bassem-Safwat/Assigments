import { Book } from "../../DB/models/books.js";
import { Log } from "../../DB/models/logs.js";
import mongoose from "mongoose";


export const addBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(200).json({ acknowledged: true, insertedId: newBook._id });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const addBooks = async (req, res) => {
  try {
    const newBooks = await Book.insertMany(req.body);
    const insertedIds = {};
    newBooks.forEach((book, i) => {
      insertedIds[String(i)] = book._id;
    });
    res.status(200).json({ acknowledged: true, insertedIds });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const updateBookYear = async (req, res) => {
  try {
    const { title } = req.params;
    const result = await Book.updateOne({ title }, { $set: { year: 2022 } });
    res.status(200).json({
      acknowledged: true,
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBookByTitle = async (req, res) => {
  try {
    const { title } = req.query;
    const book = await Book.findOne({ title });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBooksByYearRange = async (req, res) => {
  try {
    const { from, to } = req.query;
    const books = await Book.find({
      year: { $gte: Number(from), $lte: Number(to) },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBooksByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const books = await Book.find({ genres: genre });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBooksSkipLimit = async (req, res) => {
  try {
    const books = await Book.find().sort({ year: -1 }).skip(2).limit(3);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBooksByYearInteger = async (req, res) => {
  try {
    const books = await Book.find({ year: { $type: "int" } });
    
    const allBooks = await Book.find({ year: { $exists: true, $type: "number" } });
    res.status(200).json(allBooks);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const getBooksExcludeGenres = async (req, res) => {
  try {
    const books = await Book.find({
      genres: { $nin: ["Horror", "Science Fiction"] },
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const deleteBooksBeforeYear = async (req, res) => {
  try {
    const { year } = req.query;
    const result = await Book.deleteMany({ year: { $lt: Number(year) } });
    res.status(200).json({ acknowledged: true, deletedCount: result.deletedCount });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const aggregate1 = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $sort: { year: -1 } },
    ]);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const aggregate2 = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $match: { year: { $gt: 2000 } } },
      { $project: { _id: 0, title: 1, author: 1, year: 1 } },
    ]);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const aggregate3 = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $unwind: "$genres" },
      { $project: { _id: 0, title: 1, genres: 1 } },
    ]);
    res.status(200).json(books);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const aggregate4 = async (req, res) => {
  try {
    const result = await Log.aggregate([
      {
        $lookup: {
          from: "books",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $project: {
          _id: 0,
          action: 1,
          book_details: { title: 1, author: 1, year: 1 },
        },
      },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};
