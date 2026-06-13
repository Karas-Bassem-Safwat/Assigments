import mongoose from "mongoose";
import Note from "../../DB/models/note.model.js";

export const createNoteService = async (userId, { title, content }) => {
  await Note.create({ title, content, userId });
  return { status: 201, data: { message: "Note created" } };
};

export const updateNoteService = async (noteId, userId, body) => {
  const note = await Note.findById(noteId);
  if (!note) return { status: 404, data: { message: "Note not found" } };
  if (note.userId.toString() !== userId)
    return { status: 403, data: { message: "You are not the owner" } };

  const updated = await Note.findByIdAndUpdate(noteId, body, { new: true, runValidators: true });
  return { status: 200, data: { message: "updated", note: updated } };
};

export const replaceNoteService = async (noteId, userId, body) => {
  const note = await Note.findById(noteId);
  if (!note) return { status: 404, data: { message: "Note not found" } };
  if (note.userId.toString() !== userId)
    return { status: 403, data: { message: "You are not the owner" } };

  const replaced = await Note.findOneAndReplace(
    { _id: noteId },
    { ...body, userId },
    { new: true, runValidators: true }
  );
  return { status: 200, data: replaced };
};

export const updateAllNotesTitlesService = async (userId, title) => {
  const result = await Note.updateMany({ userId }, { title });
  if (result.matchedCount === 0)
    return { status: 404, data: { message: "No note found" } };
  return { status: 200, data: { message: "All notes updated" } };
};

export const deleteNoteService = async (noteId, userId) => {
  const note = await Note.findById(noteId);
  if (!note) return { status: 404, data: { message: "Note not found" } };
  if (note.userId.toString() !== userId)
    return { status: 403, data: { message: "You are not the owner" } };

  await Note.findByIdAndDelete(noteId);
  return { status: 200, data: { message: "deleted", note } };
};

export const getPaginatedNotesService = async (userId, page, limit) => {
  const skip = (page - 1) * limit;
  const notes = await Note.find({ userId }).sort({ createdAt: -1 }).skip(skip).limit(limit);
  return { status: 200, data: notes };
};

export const getNoteByIdService = async (noteId, userId) => {
  const note = await Note.findById(noteId);
  if (!note) return { status: 404, data: { message: "Note not found" } };
  if (note.userId.toString() !== userId)
    return { status: 403, data: { message: "You are not the owner" } };
  return { status: 200, data: note };
};

export const getNoteByContentService = async (userId, content) => {
  const note = await Note.findOne({ userId, content: { $regex: content, $options: "i" } });
  if (!note) return { status: 404, data: { message: "No note found" } };
  return { status: 200, data: note };
};

export const getNotesWithUserService = async (userId) => {
  const notes = await Note.find({ userId })
    .select("title userId createdAt")
    .populate("userId", "email");
  return { status: 200, data: notes };
};

export const aggregateNotesService = async (userId, title) => {
  const matchStage = { userId: new mongoose.Types.ObjectId(userId) };
  if (title) matchStage.title = { $regex: title, $options: "i" };

  const notes = await Note.aggregate([
    { $match: matchStage },
    { $lookup: { from: "users", localField: "userId", foreignField: "_id", as: "user" } },
    { $unwind: "$user" },
    { $project: { title: 1, userId: 1, createdAt: 1, "user.name": 1, "user.email": 1 } },
  ]);
  return { status: 200, data: notes };
};

export const deleteAllNotesService = async (userId) => {
  await Note.deleteMany({ userId });
  return { status: 200, data: { message: "Deleted" } };
};
