const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// GET all users with their posts
app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json(users);
});

// GET a user by ID with their posts
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      posts: true,
    },
  });
  res.json(user);
});

// POST a new user
app.post("/users", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await prisma.user.create({
    data: {
      name,
      email,
    },
  });
  res.json(newUser);
});

// GET all posts with their author details
app.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });
  res.json(posts);
});

// GET a post by ID with its author details
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      author: true,
    },
  });
  res.json(post);
});

// POST a new post
app.post("/posts", async (req, res) => {
  const { authorId } = req.body;
  const newPost = await prisma.post.create({
    data: {
      authorId,
    },
  });
  res.json(newPost);
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
