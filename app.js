const express = require("express");
const app = express();
const mangoose = require("mongoose");
const bodyParser = require("body-parser");
const postModel = require("./models/postModel");
const cors = require("cors");
const multer = require("multer");

// Middlewares
// app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// your code goes here
app.use(cors());
app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

//Image storage
const Storage = multer.diskStorage({
  destination: "uploads",
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: Storage });

//Get all posts
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await postModel.find();
    res.status(200).json({
      status: "Success",
      Posts: posts,
    });
  } catch (e) {}
});

//Create new post
app.post("/api/v1/posts", upload.single("image"), async (req, res) => {
  try {
    let pathImage = req.file.path.replace("\\", "/");
    let dt = new Date();
    const postData = {
      name: req.body.name,
      location: req.body.location,
      image: pathImage,
      description: req.body.description,
      likes: req.body.likes,
      date: dt.toLocaleDateString(),
    };
    const post = await postModel.create(req.body);
    res.status(200).json({
      status: "Success",
      Post: post,
    });
  } catch (e) {
    res.status(400).json({
      message: "Invalid data",
    });
  }
});

app.get("*", (req, res) => {
  res.send("API Not Found");
});

module.exports = app;
