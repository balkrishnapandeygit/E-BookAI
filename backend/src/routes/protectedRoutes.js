import express from "express";
import { authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/test", authenticate, (req, res) => {
  res.json({
    message: "You accessed a protected route!",
    user: req.user,
  });
});

export default router;
