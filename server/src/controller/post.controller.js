const Post = require("../models/post.model");

exports.createPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const userId = req.user.id;
    const image = req.file ? req.file.path : null;
    if (!caption && !image)
      return res.json({
        message: "Post must have either caption or image ",
      });
    const post = await Post.create({
      userId,
      caption: caption || null,
      image: image || null,
    });
    res.status(201).json({
      message: "Post successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
