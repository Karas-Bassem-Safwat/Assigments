import mongoose from "mongoose";


export const createBooksCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    await db.createCollection("books", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title"],
          properties: {
            title: {
              bsonType: "string",
              minLength: 1,
              description: "title must be a non-empty string",
            },
          },
        },
      },
    });
    res.status(200).json({ ok: 1 });
  } catch (error) {
    
    res.status(400).json(`error: ${error.message}`);
  }
};


export const createAuthorsCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const result = await db.collection("authors").insertOne(req.body);
    res.status(200).json({ acknowledged: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};


export const createLogsCappedCollection = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    await db.createCollection("logs", {
      capped: true,
      size: 1024 * 1024, 
    });
    res.status(200).json({ ok: 1 });
  } catch (error) {
    res.status(400).json(`error: ${error.message}`);
  }
};


export const createBooksIndex = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const indexName = await db.collection("books").createIndex({ title: 1 });
    res.status(200).json(indexName);
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};
