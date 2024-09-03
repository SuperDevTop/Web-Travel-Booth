import asyncHandler from 'express-async-handler';
import Blog from '../models/blogModel.js';

// @desc Post Blog
// @route POST api/blog/post
// @access Admin Protected
const blogPost = asyncHandler(async (req, res) => {
    const {title, content, image} = req.body;

    const existBlog = await Blog.findOne({title});
    if(existBlog) {
        res.status(400);
        throw new Error("the Same Blog Already Exists");
    }
    const blog = await Blog.create({
        title, content, image
    });

    if(blog){
        res.status(200).send({message: blogPost, state: "Ok"});
    }else {
        res.status(200).send({message: "Failed", state: "No"});
    }
});

// @desc          Fetch all blogs
// @route         GET /api/blog
// @access        protected
const fetchAllBlogs = asyncHandler( async (req, res) => {
    const blogs = await Blog.find({});
    res.json(blogs);
})
// @desc          Fetch one blog
// @route         GET /api/blog/:id
// @access        private

const getBlogById = asyncHandler( async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if (blog){
        res.json(blog)
    }else{
        res.status(404);
        throw new Error('Blog Not Found');
    }
})

// @desc          Delete a Blog
// @route         Delete /api/blog/:id
// @access        Admin

const deleteBlogById = asyncHandler( async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    if(blog) {
        await Blog.deleteOne({_id: blog._id});
        res.json({message: "Deleted successfully!"})
    }else{
        res.status(404);
        throw new Error('Blog Not Found');
    }
})

// @desc            Update a Blog
// @route           PUT /api/blog/:id
// access           Admin

const updateBlogById = asyncHandler(async(req, res) => {
    const blog = await Blog.findById(req.params.id);
    // console.log(req.body)
    if(blog){
        blog.title = req.body.title || blog.title;
        blog.content = req.body.content || blog.content;
        blog.image = req.body.image || blog.image;

        const updateBlog = await blog.save();

        if (updateBlog){
            res.json({state:"ok"})
        }else{
            res.status(404);
            throw new Error('Blog not found');
        }

    }else{
        res.status(404);
        throw new Error('Blog not found');}
})

export {
    blogPost,
    fetchAllBlogs,
    getBlogById,
    deleteBlogById,
    updateBlogById,
}
