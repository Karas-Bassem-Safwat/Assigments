import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  createNoteService,
  updateNoteService,
  replaceNoteService,
  updateAllNotesTitlesService,
  deleteNoteService,
  getPaginatedNotesService,
  getNoteByIdService,
  getNoteByContentService,
  getNotesWithUserService,
  aggregateNotesService,
  deleteAllNotesService,
} from "./notes.service.js";

const router = Router();

// All note routes require authentication
router.use(authMiddleware);

// ⚠️ Specific named routes BEFORE parameterised /:id routes
router.get("/paginate-sort", async (req, res) => {
  try {
    const page  = parseInt(req.query.page)  || 1;
    const limit = parseInt(req.query.limit) || 10;
    const { status, data } = await getPaginatedNotesService(req.userId, page, limit);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/note-by-content", async (req, res) => {
  try {
    const { status, data } = await getNoteByContentService(req.userId, req.query.content);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/note-with-user", async (req, res) => {
  try {
    const { status, data } = await getNotesWithUserService(req.userId);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/aggregate", async (req, res) => {
  try {
    const { status, data } = await aggregateNotesService(req.userId, req.query.title);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.post("/", async (req, res) => {
  try {
    const { status, data } = await createNoteService(req.userId, req.body);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.patch("/all", async (req, res) => {
  try {
    const { status, data } = await updateAllNotesTitlesService(req.userId, req.body.title);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete("/", async (req, res) => {
  try {
    const { status, data } = await deleteAllNotesService(req.userId);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.patch("/:noteId", async (req, res) => {
  try {
    const { status, data } = await updateNoteService(req.params.noteId, req.userId, req.body);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.put("/replace/:noteId", async (req, res) => {
  try {
    const { status, data } = await replaceNoteService(req.params.noteId, req.userId, req.body);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.delete("/:noteId", async (req, res) => {
  try {
    const { status, data } = await deleteNoteService(req.params.noteId, req.userId);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

router.get("/:id", async (req, res) => {
  try {
    const { status, data } = await getNoteByIdService(req.params.id, req.userId);
    res.status(status).json(data);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;
