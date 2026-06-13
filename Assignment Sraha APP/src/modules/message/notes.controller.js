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


router.use(authMiddleware);


router.get("/paginate-sort", getPaginatedNotes);          
router.get("/note-by-content", getNoteByContent);         
router.get("/note-with-user", getNotesWithUser);          
router.get("/aggregate", aggregateNotes);                  

router.post("/", createNote);                             
router.patch("/all", updateAllNotesTitles);               
router.delete("/", deleteAllNotes);                       

router.patch("/:noteId", updateNote);                     
router.put("/replace/:noteId", replaceNote);              
router.delete("/:noteId", deleteNote);                    
router.get("/:id", getNoteById);                          

export default router;