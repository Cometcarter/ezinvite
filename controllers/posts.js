const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const User = require("../models/User");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const post = await Post.find({ user: req.user.id });
      //we're inside the controller, here on line 7 the controller is using the model
      //its saying only find the post with the id that is equal to the logged in user's id
      res.render("gallery.ejs", { 
        post: post, 
        user: req.user, 
      })
    } catch (err) {
      console.log(err);
    }
  },
  getEventInfo: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean();
      let status = 'notattend'
      if (post.attendees.includes(String(req.user._id))) {
        status = 'attend'
      } else if (post.requests.includes(String(req.user._id))) {
        status = 'pend'
      }
      res.render("event-info.ejs", {
        post: post,
        user: req.user,
        status: status
      })
    } catch (err) {
      console.log(err);
    }
  },
  getPersonalEvent: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.find()
      // grab all users
      let requests = post.requests
      let attendees = post.attendees
      let requestors = []
      let listOfAttendees = []
      requests.forEach(request => {
        // we're making a '2D'/nested array (requestor) to hold username and _ID of the user requesting to be invited to the event this way the host will be able to see the name and the id will be there so the response can reach the right attendee

        const userName = user.filter(x => String(x._id) == request)
        //find all the user in the array that has the matching id of this request,
        console.log(userName)
        if (userName[0]) {
          requestors.push([userName[0].userName, request])
        }
      })
      attendees.forEach(attendee => {
        // we're making a '2D'/nested array (requestor) to hold username and _ID of the user requesting to be invited to the event this way the host will be able to see the name and the id will be there so the response can reach the right attendee

        const userName = user.filter(x => String(x._id) == attendee)
        //find all the user in the array that has the matching id of this request,
        console.log(userName)
        if (userName[0]) {
          listOfAttendees.push([userName[0].userName, attendee])
        }
      })

      res.render("gallery-single.ejs", {
        post: post,
        user: req.user,
        requestors: requestors,
        attendees: listOfAttendees
      })
    } catch (err) {
      console.log(err);
    }
  },
  getEdit: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      res.render("edit-gallery-single.ejs", {
        post: post,
        user: req.user
      })
    } catch (err) {
      console.log(err);
    }
  },
  createPost: async (req, res) => {
    try {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      await Post.create({
        eventtitle: req.body.eventtitle,
        phonenumber: req.body.phonenumber,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        cloudinaryId: result.public_id,
        image: result.secure_url,
        date: req.body.date,
        description: req.body.description,
        capacity: req.body.capacity,
        requests: [],
        attendees: [],
        user: req.user.id,
      });
      console.log("Post has been added!");
      res.redirect("/gallery");
    } catch (err) {
      console.log(err);
    }
  },
  editEvent: async (req, res) => {
    console.log(req.body._id)
    try {
            // try says try to do this, if it works cool, if not then do the catch then continue c:
      await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
          eventtitle: req.body.eventtitle,
          address: req.body.address,
          phonenumber: req.body.phonenumber,
          city: req.body.eventcity,
          state: req.body.eventstate,
          date: req.body.eventdate,
          description: req.body.eventdescription,
          capacity: req.body.eventcapacity,
        }
      );
      console.log("Lookin' Shiny");
      res.send({ cake: 'the cake a lie' })
    } catch (err) {
      console.log(err);
    }
  },
  sendRequest: async (req, res) => {
    console.log(req.body._id)
    //req.params._id is hold the id the post;; id variable must match route
    try {
      const post = await Post.findById(req.body._id).lean();
      let requests = post.requests
      if (!requests.includes(`${req.user._id}`)) {
        // if statement only add it if it's inside
        requests.push(req.user._id)
        // pushing the guest's id into the array
      }
      await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
          requests: requests
        }
      );
      console.log("Lookin' Shiny");
      res.redirect(`/eventinfo/${req.body._id}`)
    } catch (err) {
      console.log(err);
    }
  },
  accept: async (req, res) => {
    try {
      const post = await Post.findById(req.body._id).lean();
      let requests = post.requests
      let attendees = post.attendees
      if (!attendees.includes(`${req.body.userid}`) && requests.includes(`${req.body.userid}`)) {
        attendees.push(req.body.userid)
        requests = requests.filter(request => !(request == req.body.userid))
      }
      await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
          attendees: attendees,
          requests: requests
        },
      );
      console.log("Back to Post Page");
      // res.redirect(`/post/${req.body._id}`)
      res.send({ title: 'test' })
    } catch (err) {
      console.log(err);
    }
  },
  deny: async (req, res) => {
    console.log(req.body._id)
    try {
      const post = await Post.findById(req.body._id).lean()
      let requests = post.requests
      requests = requests.filter(request => !(request == req.body.userid))

      await Post.findOneAndUpdate(
        { _id: req.body._id },
        {
          requests: requests
        },
      );
      console.log("Back to Post Page");
      // res.redirect(`/post/${req.body._id}`)
      res.send({ title: 'test' })
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.body._id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.body._id });
      console.log("Deleted Post");
      res.redirect("/gallery");
    } catch (err) {
      res.redirect("/gallery");
    }
  },
}
