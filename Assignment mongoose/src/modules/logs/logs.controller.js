import mongoose from "mongoose";


export const addLog = async (req, res) => {
  try {
    const db = mongoose.connection.db;
    const result = await db.collection("logs").insertOne(req.body);
    res.status(200).json({ acknowledged: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};
