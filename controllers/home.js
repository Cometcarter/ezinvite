const Post = require("../models/Post");

module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs",{ user: req.user});
  },
  getGallery: async (req, res) => {
    const posts = await Post.find().sort({ createdAt: "desc" }).lean();
    res.render("gallery.ejs",{ 
      user: req.user,
      posts: posts
    });
  },
  getAbout: (req, res) => {
    res.render("about.ejs",{ user: req.user});
  },
  getServices: (req, res) => {
    res.render("services.ejs",{ user: req.user});
  },
  getUpload: (req, res) => {
    res.render("upload.ejs",{ user: req.user});
  },
};
