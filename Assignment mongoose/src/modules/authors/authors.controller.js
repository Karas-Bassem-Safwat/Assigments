import { Author } from "../../DB/models/authors.js";


export const addAuthor = async (req, res) => {
  try {
    const newAuth = await Author.create(req.body);
    res.status(200).json({ acknowledged: true, insertedId: newAuth._id });
  } catch (error) {
    res.status(400).json(`error: ${error}`);
  }
};
