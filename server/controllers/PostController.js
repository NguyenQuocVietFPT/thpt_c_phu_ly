const { request } = require("express");
const Post = require("../models/Post");

const PostController = {
  // @route: [GET] api/posts/
  // @desc: Get list of posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find({ author: req.userId }).populate("author", [
        "authorname",
      ]);
      res.status(200).json({
        success: true,
        ListOfPosts: posts,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get list of posts",
        error: err,
      });
    }
  },
  // @route: [POST] api/posts/create
  // @desc: Create a new post
  createPost: async (req, res) => {
    const { tittle, description } = req.body;
    //Check title is null
    if (!tittle) {
      return res.status(400).json({
        success: false,
        message: "Please provide a tittle",
      });
    }
    try {
      const newPost = await new Post({
        tittle,
        description,
        author: req.userId,
      });
      await newPost.save();
      res.status(200).json({
        success: true,
        savedPost: newPost,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to create a new post",
        error: err,
      });
    }
  },
  // @route: [GET] api/posts/:slug
  // @desc: Show post's information by slug
  detail: async (req, res) => {
    try {
      const detailPost = await Post.findOne({
        slug: req.params.slug,
      });
      res.status(200).json({
        success: true,
        postInformation: detailPost,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Failed to get post's information",
        error: err,
      });
    }
  },

  // @route: [PUT] api/posts/update/:slug
  // @desc: Update post's information by slug
  updatePost: async (req, res) => {
    //Check tittle is null
    const { tittle, description } = req.body;

    if (!tittle) {
      return res.status(400).json({
        success: false,
        message: "Please provide a tittle",
      });
    }
    try {
      //Get condition to update post
      const conditionUpdate = {
        slug: req.params.slug,
        author: req.userId,
      };
      let updatePost = {
        tittle,
        description,
      };
      updatePost = await Post.findOneAndUpdate(conditionUpdate, updatePost, {
        new: true,
      });

      if (!updatePost) {
        return res.status(404).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      }

      res.status(201).json({
        success: true,
        message: "Post updated successfully",
        updatedPost: updatePost,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Failed to update post",
        error: err,
      });
    }
  },
  // @route: [DELETE] api/posts/delete/:slug
  // @desc: Delete post's information by slug
  deletePost: async (req, res) => {
    try {
      //Get condition to update post
      const conditionDelete = {
        slug: req.params.slug,
        author: req.userId,
      };

      const deletePost = await Post.findOneAndDelete(conditionDelete);

      if (!deletePost) {
        return res.status(404).json({
          success: false,
          message: "Post not found or user not authorised",
        });
      }

      res.status(201).json({
        success: true,
        message: "Deleted successfully",
        deletedPost: deletePost,
      });
    } catch (err) {
      res.status(400).json({
        success: false,
        message: "Failed to delete post",
        error: err,
      });
    }
  },
};

module.exports = PostController;
