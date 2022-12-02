const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  eventtitle: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  phonenumber: {
    type: String,
    required: false,
  },
  location: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    required: false,
  },
  capacity: {
    type: String,
    required: false,
  },
  cloudinaryId: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
  requests: {
    type: [String],
    required: false,
  },
  attendees: {
    type: [String],
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", PostSchema);
