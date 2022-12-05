const Post = require("../models/Post");

module.exports = {
  getIndex: async (req, res) => {
    try {
      const posts = await Post.find()
      res.render("index.ejs",{
        posts: posts,
        user: req.user
      })
    } catch (err) {
      console.log(err);
    }
  },
  getGallery: async (req, res) => {
    const posts = await Post.find({ user: req.user._id });
    res.render("gallery.ejs", {
      user: req.user,
      posts: posts
    });
  },
  getAbout: (req, res) => {
    res.render("about.ejs", { user: req.user });
  },
  getServices: (req, res) => {
    res.render("services.ejs", { user: req.user });
  },
  getUpload: (req, res) => {
    res.render("upload.ejs", { user: req.user });
  },
};
