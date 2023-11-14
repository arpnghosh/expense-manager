import express from "express";
import {
  userLogin,
  userLogout,
  userRegister,
  userProfile,
} from "../controllers/userController.js";

const router = express.Router();

import protect from "../middleware/authMiddleware.js";

router.post("/login", userLogin);
router.post("/register", userRegister);
router.post("/logout", userLogout);
router.get("/profile", protect, userProfile);

export default router;
