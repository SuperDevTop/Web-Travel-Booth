import express from 'express'

import {
  fetchPosts,
  fetchChats,
  fetchUsers,
  fetchTopPosts,
  fetchFaqs,
  updateFaqs,
  deletePost,
  deleteUser,
} from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/top_posts").get(protect, fetchTopPosts);
router.route("/posts").post(protect, fetchPosts);
router.route("/posts/:id").delete(protect, deletePost);
router.route("/chats").post(protect, fetchChats);
router.route("/users").post(protect, fetchUsers);
router.route("/users/:id").delete(protect, deleteUser);
router.route("/faqs").get(protect, fetchFaqs);
router.route("/update_faqs").post(protect, updateFaqs);

export default router;
