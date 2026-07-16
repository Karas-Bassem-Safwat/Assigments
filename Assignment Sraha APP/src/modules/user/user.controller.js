import { Router } from "express";
import authMiddleware from "../../middleware/auth.middleware.js";
import {
  getUserService,
  updateUserService,
  deleteUserService,
  updateEmailRequestService,
  confirmUpdateEmailService,
  updatePasswordService,
} from "./user.service.js";
import { localfileupload } from "../../utils/multer.js";
import { validateUpload } from "../../middleware/upload.middleware.js";

const router = Router();

router.use(authMiddleware);

router.get("/signup", async (req, res) => {
  try {
    const { status, data } = await getUserService(req.userId);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/", async (req, res) => {
  try {
    const { status, data } = await updateUserService(req.userId, req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/email", async (req, res) => {
  try {
    const { status, data } = await updateEmailRequestService(req.userId, req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/email/confirm", async (req, res) => {
  try {
    const { status, data } = await confirmUpdateEmailService(req.userId, req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch("/password", async (req, res) => {
  try {
    const { status, data } = await updatePasswordService(req.userId, req.body);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch(
  "/uploadfile",
  validateUpload(localfileupload().single("file")),
  async (req, res) => {
    try {
      res.status(200).json({ message: "File uploaded", file: req.file });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
);

router.delete("/", async (req, res) => {
  try {
    const { status, data } = await deleteUserService(req.userId);
    res.status(status).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
