import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js';
import Chat from '../models/chatModel.js';
import User from '../models/userModel.js';
import Faq from '../models/faqModel.js';
import Terms from '../models/termsModel.js';
import Privacy from '../models/privacyModel.js';
import fs from 'fs';

//@description     Fetch top 5 commented posts
//@route           GET /api/admin/top_posts
//@access          Protected
const fetchTopPosts = asyncHandler(async (req, res) => {
  try {
    const results = await Post.find({}).populate("sender").populate("reviews.user").sort("-reviews").limit(5);
    //    const results = await Post.find({createdAt: '2024-06-20T09:37:34.547+00:00'}).populate("sender").populate("reviews.user");
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch today posts
//@route           POST /api/admin/posts
//@access          Protected
const fetchPosts = asyncHandler(async (req, res) => {
  try {
    const { today } = req.body;

    if (today !== "ALL") {
      const startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setDate(endDate.getDate() + 1);
      endDate.setHours(0, 0, 0, 0);

      const datePredicate = { 'createdAt': { "$gte": startDate, "$lt": endDate } };
      const results = await Post.find(datePredicate).populate("sender").populate("reviews.user");
      if (results)
        res.status(200).send({ message: results, state: "OK" });
      else
        res.status(200).send({ message: "", state: "NO" });
    }
    else {
      const results = await Post.find({}).populate("sender").populate("reviews.user");
      if (results)
        res.status(200).send({ message: results, state: "OK" });
      else
        res.status(200).send({ message: "", state: "NO" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     Delete post
//@route           POST /api/admin/posts/:id
//@access          Protected
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  // const imagePath = post.image;
  // 
  // // Check if the image exists
  // if (fs.existsSync(imagePath)) {
  //   // If the image exists, delete it
  //   console.log("2")
  //   fs.unlinkSync(imagePath);
  //   res.status(200).send('Image deleted successfully');
  // } else {
  //   // Image not found
  //   res.status(404).send('Image not found');
  // }
  if (post) {
    await Post.deleteOne({ _id: post._id });
    res.json({ message: 'Post removed' });
  } else {
    res.status(404);
    throw new Error('Post not found');
  }
});

//@description     Fetch today chats
//@route           POST /api/admin/chats
//@access          Protected
const fetchChats = asyncHandler(async (req, res) => {
  try {
    const { today } = req.body;

    const startDate = new Date(today);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(today);
    endDate.setDate(endDate.getDate() + 1);
    endDate.setHours(0, 0, 0, 0);
    const datePredicate = { 'createdAt': { "$gte": startDate, "$lt": endDate } };

    const results = await Chat.find(datePredicate).populate("users");
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch users this year
//@route           POST /api/admin/users
//@access          Protected
const fetchUsers = asyncHandler(async (req, res) => {
  try {
    const { today } = req.body;

    if (today !== "ALL") {
      const startDate = new Date(today);
      startDate.setMonth(1);
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(today);
      endDate.setMonth(12);
      endDate.setDate(31);
      endDate.setHours(23, 59, 59, 0);
      const datePredicate = { 'createdAt': { "$gte": startDate, "$lt": endDate } };
      const results = await User.find(datePredicate);
      if (results)
        res.status(200).send({ message: results, state: "OK" });
      else
        res.status(200).send({ message: "", state: "NO" });
    }
    else {
      const results = await User.find({});
      if (results)
        res.status(200).send({ message: results, state: "OK" });
      else
        res.status(200).send({ message: "", state: "NO" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Delete User
//@route           POST /api/admin/users/:id
//@access          Protected
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    res.json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

//@description     Fetch Faqs
//@route           GET /api/admin/faqs
//@access          Protected
const fetchFaqs = asyncHandler(async (req, res) => {
  try {
    const results = await Faq.find({});
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Update And Fetch Faqs
//@route           POST /api/admin/update_faqs
//@access          Protected
const updateFaqs = asyncHandler(async (req, res) => {
  const { answer, id } = req.body;
  try {
    const faq = await Faq.findById({ _id: id });
    faq.answer = answer;
    faq.status = 1;
    const updateFaq = await faq.save();
    if (updateFaq) {
      res.status(200).send({ message: updateFaq, state: "OK" });
    } else {
      res.status(200).send({ message: "faq is not exist", state: "NO" });
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     submit Faqs
//@route           POST /api/admin/submitfaq
//@access          Protected
const submitFaq = asyncHandler(async (req, res) => {
  try {
    const { question, answer } = req.body;
    const results = await Faq.create({ question, answer, status: 1 });
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     submit question
//@route           POST /api/admin/submitquestion
//@access          Protected
const submitQuestion = asyncHandler(async (req, res) => {
  try {
    const { question } = req.body;
    const results = await Faq.create({ question });
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     Delete FAQ
//@route           DELETE /api/admin/deletefaq
//@access          Protected
const deleteFaq = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const faq = await Faq.findById({_id: id});
    if (faq) {
      await Faq.deleteOne({ _id: id });
      res.json({ message: 'Faq removed' });
    } else {
      res.status(404);
      throw new Error('Faq not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     submit Terms
//@route           POST /api/admin/submitterms
//@access          Protected
const submitTerms= asyncHandler(async (req, res) => {
  try {
    const { term, description } = req.body;
    const results = await Terms.create({ title: term, description });
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
//@description     submit Policy
//@route           POST /api/admin/submitpolicy
//@access          Protected
const submitPolicy= asyncHandler(async (req, res) => {
  try {
    const { policy, description } = req.body;
    const results = await Privacy.create({ title: policy, description });
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Delete Terms
//@route           DELETE /api/admin/deleteterms
//@access          Protected
const deleteTerms = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const faq = await Terms.findById({_id: id});
    if (faq) {
      await Terms.deleteOne({ _id: id });
      res.json({ message: 'Terms removed' });
    } else {
      res.status(404);
      throw new Error('Terms not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Delete Policy
//@route           DELETE /api/admin/deletepolicy
//@access          Protected
const deletePolicy = asyncHandler(async (req, res) => {
  try {
    const { id } = req.body;
    const faq = await Privacy.findById({_id: id});
    if (faq) {
      await Privacy.deleteOne({ _id: id });
      res.json({ message: 'Policy removed' });
    } else {
      res.status(404);
      throw new Error('Policy not found');
    }
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch Terms
//@route           GET /api/admin/terms
//@access          Protected
const fetchTerms = asyncHandler(async (req, res) => {
  try {
    const results = await Terms.find({});
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Fetch Policy
//@route           GET /api/admin/terms
//@access          Protected
const fetchPolicy = asyncHandler(async (req, res) => {
  try {
    const results = await Privacy.find({});
    if (results)
      res.status(200).send({ message: results, state: "OK" });
    else
      res.status(200).send({ message: "", state: "NO" });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

export {
  fetchTopPosts,
  fetchPosts,
  fetchChats,
  fetchUsers,
  fetchFaqs,
  updateFaqs,
  deletePost,
  deleteUser,
  submitFaq,
  submitQuestion,
  deleteFaq,
  submitPolicy,
  submitTerms,
  deletePolicy,
  deleteTerms,
  fetchPolicy,
  fetchTerms
};
