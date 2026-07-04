import multer from "multer";

/**
 * Wraps a multer upload handler (e.g. localfileupload().single("file"))
 * and validates the result before letting the request continue.
 *
 * Usage:
 *   router.patch("/uploadfile", validateUpload(localfileupload().single("file")), handler);
 */
export const validateUpload = (multerMiddleware) => (req, res, next) => {
  multerMiddleware(req, res, (err) => {
    try {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({ message: "File is too large." });
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({ message: err.message || "Unsupported file type." });
        }

        return res.status(400).json({ message: err.message });
      }

      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      next();
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

export default validateUpload;

