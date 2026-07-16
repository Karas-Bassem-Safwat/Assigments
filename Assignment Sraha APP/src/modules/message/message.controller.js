import { Router } from "express";
import multer from "multer";
import authMiddleware from "../../middleware/auth.middleware.js";
import { localfileupload } from "../../utils/multer.js";
import { sendMessageService, getMessagesService } from "./message.service.js";

const router = Router();

router.use(authMiddleware);

const attachmentUpload = (req, res, next) => {
  localfileupload().array("attachment", 5)(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ message: err.message });
    }
    if (err) return res.status(400).json({ message: err.message });
    next();
  });
};

router.post("/", attachmentUpload, async (req, res) => {
  try {
    const { status, data } = await sendMessageService(req.body, req.files || []);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const { status, data } = await getMessagesService(req.userId);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
