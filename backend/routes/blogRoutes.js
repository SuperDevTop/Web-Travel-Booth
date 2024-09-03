import express from 'express';
import { 
    blogPost,
    deleteBlogById,
    fetchAllBlogs,
    getBlogById,
    updateBlogById
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/post').post(protect, blogPost);
router.route('/').get(fetchAllBlogs);
router.route('/:id').get(getBlogById).delete(protect, deleteBlogById).put(protect, updateBlogById);

export default router;