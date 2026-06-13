import { Router } from "express";
import {
  createNote,
  updateNote,
  replaceNote,
  updateAllNotesTitles,
  deleteNote,
  getPaginatedNotes,
  getNoteById,
  getNoteByContent,
  getNotesWithUser,
  aggregateNotes,
  deleteAllNotes,
} from "../controllers/note.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// All note routes require authentication
router.use(authMiddleware);

// ⚠️ Specific routes must be defined BEFORE parameterised routes
router.get("/paginate-sort", getPaginatedNotes);          // 6
router.get("/note-by-content", getNoteByContent);         // 8
router.get("/note-with-user", getNotesWithUser);          // 9
router.get("/aggregate", aggregateNotes);                  // 10

router.post("/", createNote);                             // 1
router.patch("/all", updateAllNotesTitles);               // 4
router.delete("/", deleteAllNotes);                       // 11

router.patch("/:noteId", updateNote);                     // 2
router.put("/replace/:noteId", replaceNote);              // 3
router.delete("/:noteId", deleteNote);                    // 5
router.get("/:id", getNoteById);                          // 7

export default router;
