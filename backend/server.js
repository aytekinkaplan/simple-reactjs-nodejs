// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // CORS sorunlarını önlemek için
app.use(express.json()); // JSON verisi işlemek için

// MongoDB bağlantısı
mongoose
  .connect("mongodb://localhost:27017/blog", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Basit bir Post modeli
const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: String,
    content: String,
  })
);

// API endpoint'leri
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

app.post("/api/posts", async (req, res) => {
  const newPost = new Post(req.body);
  await newPost.save();
  res.json(newPost);
});

// Sunucu çalıştırma
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
