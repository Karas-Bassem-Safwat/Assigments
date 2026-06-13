import mongoose from "mongoose";
import Note from "../models/note.model.js";

// ─── 1. Create a note ────────────────────────────────────────────────────────
export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.userId;

    const note = await Note.create({ title, content, userId });
    res.status(201).json({ message: "Note created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 2. Update a single note by id (owner only) ──────────────────────────────
export const updateNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== userId)
      return res.status(403).json({ message: "You are not the owner" });

    const updated = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "updated", note: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 3. Replace entire note document (owner only) ────────────────────────────
export const replaceNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== userId)
      return res.status(403).json({ message: "You are not the owner" });

    // findOneAndReplace replaces the whole document
    const replaced = await Note.findOneAndReplace(
      { _id: noteId },
      { ...req.body, userId },
      { new: true, runValidators: true }
    );

    res.status(200).json(replaced);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 4. Update title of ALL notes for logged-in user ─────────────────────────
export const updateAllNotesTitles = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.body;

    const result = await Note.updateMany({ userId }, { title });
    if (result.matchedCount === 0)
      return res.status(404).json({ message: "No note found" });

    res.status(200).json({ message: "All notes updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 5. Delete a single note by id (owner only) ──────────────────────────────
export const deleteNote = async (req, res) => {
  try {
    const { noteId } = req.params;
    const userId = req.userId;

    const note = await Note.findById(noteId);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== userId)
      return res.status(403).json({ message: "You are not the owner" });

    await Note.findByIdAndDelete(noteId);
    res.status(200).json({ message: "deleted", note });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 6. Paginate & sort notes (descending createdAt) ─────────────────────────
export const getPaginatedNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const notes = await Note.find({ userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 7. Get a note by id (owner only) ────────────────────────────────────────
export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const note = await Note.findById(id);
    if (!note) return res.status(404).json({ message: "Note not found" });
    if (note.userId.toString() !== userId)
      return res.status(403).json({ message: "You are not the owner" });

    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 8. Get a note by content ─────────────────────────────────────────────────
export const getNoteByContent = async (req, res) => {
  try {
    const userId = req.userId;
    const { content } = req.query;

    const note = await Note.findOne({
      userId,
      content: { $regex: content, $options: "i" },
    });

    if (!note) return res.status(404).json({ message: "No note found" });
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 9. Get notes with user info (selected fields only) ──────────────────────
export const getNotesWithUser = async (req, res) => {
  try {
    const userId = req.userId;

    const notes = await Note.find({ userId })
      .select("title userId createdAt")
      .populate("userId", "email");

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 10. Aggregate notes with user info + title search ───────────────────────
export const aggregateNotes = async (req, res) => {
  try {
    const userId = req.userId;
    const { title } = req.query;

    const matchStage = { userId: new mongoose.Types.ObjectId(userId) };
    if (title) {
      matchStage.title = { $regex: title, $options: "i" };
    }

    const notes = await Note.aggregate([
      { $match: matchStage },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          title: 1,
          userId: 1,
          createdAt: 1,
          "user.name": 1,
          "user.email": 1,
        },
      },
    ]);

    res.status(200).json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─── 11. Delete ALL notes for logged-in user ─────────────────────────────────
export const deleteAllNotes = async (req, res) => {
  try {
    const userId = req.userId;
    await Note.deleteMany({ userId });
    res.status(200).json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
