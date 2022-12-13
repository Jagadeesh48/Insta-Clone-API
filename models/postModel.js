const mongoose = require("mongoose");

//  Your code goes here

const Schema = mongoose.Schema;
const postSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  image: String,
  description: { type: String, required: true },
  likes: Number,
  date: String,
});

const postModel = mongoose.model("posts", postSchema);
module.exports = postModel;
