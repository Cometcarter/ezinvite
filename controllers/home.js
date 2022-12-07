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
   const allevents = await Post.find();
   //find all events^^
    let acceptedevents = allevents.filter(event => event.attendees.includes(req.user.id))
    let requestedevents = allevents.filter(event => event.requests.includes(req.user.id))
    // check if the current logged in user's id is in the attendees array
    res.render("gallery.ejs", {
      user: req.user,
      posts: posts,
      acceptedevents: acceptedevents,
      requestedevents:requestedevents
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
