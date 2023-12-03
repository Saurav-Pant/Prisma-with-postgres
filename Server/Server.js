const express = require("express");
const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.json({
    message: "All Good",
    status: 200,
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
