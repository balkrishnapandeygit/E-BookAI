import express from "express";
import { createEbook, getMyBooks, deleteEbook } from "../controllers/eBookController.js";
import { authenticate } from "../middleware/authMiddleware.js";
 import path from 'path';

const router = express.Router();

router.post("/create", authenticate, createEbook);
router.get("/my-books", authenticate, getMyBooks);
router.delete("/:id", authenticate, deleteEbook);
router.get("/download/:filename", (req, res) => {
  const filePath = path.join(process.cwd(), "uploads", req.params.filename);
  res.download(filePath, err => {
    if (err) {
      res.status(500).json({ message: "Download failed", error: err.message });
    }
  });
});

export default router;

