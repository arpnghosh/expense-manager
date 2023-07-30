import express from "express";
import {
  userAuth,
  userLogout,
  userRegister,
  userProfile,
} from "../controllers/userController.js";

const router = express.Router();

import protect from "../middleware/authMiddleware.js";

router.post("/auth", userAuth);
router.post("/", userRegister);
router.post("/logout", userLogout);
router.get("/profile", protect, userProfile);

export default router;
