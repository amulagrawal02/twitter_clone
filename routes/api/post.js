const express = require("express");
const router = express.Router();
const Post = require("../../models/post");
const { isLoggedIn } = require("../../middleware");
const User = require("../../models/user");

router.get("/api/post", isLoggedIn, async (req, res) => {
  const posts = await Post.find({}).populate("postedBy");
  res.json(posts);
});

router.post("/api/post", isLoggedIn, async (req, res) => {
  console.log("inside the api");
  // console.log(req.user._id);

  const post = {
    content: req.body.content,
    postedBy: req.user._id,
  };
  const newPost = await Post.create(post);
  res.json(newPost);
});

router.patch("/api/posts/:id/like", isLoggedIn, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const isLiked = req.user.likedPost && req.user.likedPost.includes(postId);
  const option = isLiked ? `$pull` : `$addToSet`;

  req.user = await User.findByIdAndUpdate(
    userId,
    { [option]: { likedPost: postId } },
    { new: true }
  );
  const post = await Post.findByIdAndUpdate(
    postId,
    { [option]: { likedBy: userId } },
    { new: true }
  );

  res.status(200).json(post);
});

router.get("/api/post/:id", isLoggedIn, async (req, res) => {
  const post = await Post.findById(req.params.id).populate("postedBy");

  res.status(200).json(post);
});

module.exports = router;
