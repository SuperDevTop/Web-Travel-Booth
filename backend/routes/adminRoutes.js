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
  submitFaq,
  submitQuestion,
  deleteFaq,
  submitTerms,
  submitPolicy,
  deleteTerms,
  deletePolicy,
  fetchTerms,
  fetchPolicy,
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
router.route("/submitfaq").post(protect, submitFaq);
router.route("/submitquestion").post(protect, submitQuestion);
router.route("/deletefaq").delete(protect, deleteFaq);
router.route("/submitterms").post(protect, submitTerms);
router.route("/submitpolicy").post(protect, submitPolicy);
router.route("/deleteterms").delete(protect, deleteTerms);
router.route("/deletepolicy").delete(protect, deletePolicy);
router.route("/terms").get(protect, fetchTerms);
router.route("/policy").get(protect, fetchPolicy);

export default router;
