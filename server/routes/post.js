const express = require("express");
const router = express.Router();
const verifyMidlleware = require("../middlewares/VerifyToken");

const postController = require("../controllers/PostController");

router.post(
  "/create",
  verifyMidlleware.verifyAccessToken,
  postController.createPost
);
router.delete(
  "/delete/:slug",
  verifyMidlleware.verifyAccessToken,
  postController.deletePost
);
router.put(
  "/update/:slug",
  verifyMidlleware.verifyAccessToken,
  postController.updatePost
);
router.get("/:slug", verifyMidlleware.verifyAccessToken, postController.detail);
router.get("/", verifyMidlleware.verifyAccessToken, postController.getAllPosts);

module.exports = router;
