import asyncHandler from 'express-async-handler'
import Location from '../models/locationModel.js';
import Post from '../models/postModel.js';

// @desc    Submit Post
// @route   POST /api/post/submit
// @access  Protected
const submitPost = asyncHandler(async (req, res) => {
  const {sender, title, details, location, isPublic, image} = req.body;

  const results = await Post.create({
    sender, title, details, location, isPublic, image
  });

  if(results)
    res.status(200).send({message: results, state: "OK"});
  else
    res.status(200).send({message: "", state: "NO"});
});

//@description     Fetch all posts
//@route           POST /api/post/index
//@access          Protected
const fetchPosts = asyncHandler(async (req, res) => {
  try {
    const {sender} = req.body;
    // console.log(sender)
    const results = await Post.find({sender: sender}).populate("sender").populate("reviews.user");
    // console.log("result", results)
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});


//@description     Fetch all locations
//@route           GET /api/post/location
//@access          Protected
const fetchLocations = asyncHandler(async (req, res) => {
  try {
    const results = await Location.find({});
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Get Post
// @route   POST /api/post/edit
// @access  Protected
const getPost = asyncHandler(async (req, res) => {
  const {id} = req.body;

  try {
    const results = await Post.find({_id: id}).populate("sender").populate("reviews.user");
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @desc    Rename Group
// @route   POST /api/post/update
// @access  Protected
const updatePost = asyncHandler(async (req, res) => {
  const {sender, title, details, location, isPublic, image, id} = req.body;
//  console.log(req.body)
  const results = await Post.findByIdAndUpdate(id);
    // console.log(results)
  results.title = title;
  results.details = details;
  results.location = location;
  results.image = image;
  results.isPublic = isPublic;
  // results.rating = rating;

  await results.save();

  if(results)
    res.status(200).send({message: results, state: "OK"});
  else
    res.status(200).send({message: "", state: "NO"});
});

// @desc    Import Locations From File 
// @route   POST /api/post/location/import
// @access  Protected
/*const importLocations = asyncHandler(async (req, res) => {
  const location = req.body;

  location.map(async function(loc){
    const locExist = await Location.findOne({ location: loc });
    if(!locExist){
      await Location.create({
        location: loc,
      });  
    }
  });

  const results = await Location.find({});
  if(results)
    res.status(200).send({message: results, state: "OK"});
  else
    res.status(200).send({message: "", state: "NO"});
});*/

//@description     Fetch all other user's posts
//@route           POST /api/post/explore
//@access          Protected
const explorePosts = asyncHandler(async (req, res) => {
  try {
    const {sender} = req.body;
    const results = await Post.find({sender: {$ne: sender}}).populate("sender").populate("reviews.user");
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Change Liked Post And Fetch all other user's posts
//@route           POST /api/post/like_post
//@access          Protected
const changeLikedPost = asyncHandler(async (req, res) => {
  const {userId, postId} = req.body;
  const post = await Post.findById(postId);
  if (post) {
    const alreadyReviewed = await Post.findOne({"_id": postId, 'reviews.user': userId});
    if (alreadyReviewed) {
      alreadyReviewed.reviews[0].liked=!alreadyReviewed.reviews[0].liked;
      alreadyReviewed.reviews[0].noticed=false;
      await alreadyReviewed.save();
    }
    else{
      const review = {
        user: userId,
        liked: true,
      };

      post.reviews.push(review);
      await post.save();
    }
  }

  try {
    const results = await Post.find({sender: {$ne: userId}}).populate("sender").populate("reviews.user");
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

//@description     Change Comment Post
//@route           POST /api/post/comment_post
//@access          Protected
const changeCommentPost = asyncHandler(async (req, res) => {
  const {userId, postId, comment, liked, rating} = req.body;
  const post = await Post.findById(postId);
  if (post) {
    const alreadyReviewed = await Post.findOne({"_id": postId, 'reviews.user': userId});
    if (alreadyReviewed) {
      alreadyReviewed.reviews[0].comment=comment;
      alreadyReviewed.reviews[0].liked=liked;
      alreadyReviewed.reviews[0].noticed=false;
      await alreadyReviewed.save();
    }
    else{
      const review = {
        user: userId,
        comment: comment,
        liked: liked,
        rating: rating,
      };

      post.reviews.push(review);
      post.numReviews = post.reviews.length;
  
      post.rating =
      post.reviews.reduce((acc, item) => item.rating + acc, 0) /
      post.reviews.length;
      await post.save();
    }
  }
  res.status(200).send({message: "", state: "OK"});
});

const notifyPost = asyncHandler(async (req, res) => {
  const {userId, postId} = req.body;
  const post = await Post.findById(postId);
  if (post) {
    const alreadyReviewed = await Post.findOne({"_id": postId, 'reviews.user': userId});
    if (alreadyReviewed) {
      alreadyReviewed.reviews[0].noticed=true;
      await alreadyReviewed.save();
    }
  }
  res.status(200).send({message: "", state: "OK"});
});

const notifyPost2 = asyncHandler(async (req, res) => {
  const {userId, postId} = req.body;
  const post = await Post.findById(postId);

  post.noticed.push(userId);
  await post.save();
  res.status(200).send({message: "", state: "OK"});
});
//@description     Fetch all posts for notification
//@route           POST /api/post/notified_posts
//@access          Protected
const fetchNotifiedPosts = asyncHandler(async (req, res) => {
  try {
    const {sender} = req.body;
    const results = await Post.find({noticed: {$ne: sender}}).populate("sender");
    if(results)
      res.status(200).send({message: results, state: "OK"});
    else
      res.status(200).send({message: "", state: "NO"});
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});
// @desc            Update a Post
// @route           PUT /api/post/:id
// access           Admin

const updatePostById = asyncHandler(async(req, res) => {
  const post = await Post.findById(req.params.id);
  // console.log(req.body)
  if(post){
    post.title = req.body.title || post.title;
    post.details = req.body.detail || post.details;
    post.image = req.body.image || post.image;

      const updatePost = await post.save();

      if (updatePost){
          res.json({state:"ok"})
      }else{
          res.status(404);
          throw new Error('Post not found');
      }

  }else{
      res.status(404);
      throw new Error('Post not found');}
})

export {
  fetchLocations,
  fetchNotifiedPosts,
//  importLocations,
  submitPost,
  fetchPosts,
  updatePost,
  getPost,
  explorePosts,
  changeLikedPost,
  changeCommentPost,
  notifyPost,
  notifyPost2,
  updatePostById,
};
