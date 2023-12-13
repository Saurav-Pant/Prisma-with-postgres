// index.js
const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());

app.post("/users", async (req, res) => {
  try {
    const { email, profile } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        profile: {
          create: {
            name: profile.name,
            gender: profile.gender,
            age: profile.age,
          },
        },
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error - " + error.message);
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        profile: true,
      },
    });

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
