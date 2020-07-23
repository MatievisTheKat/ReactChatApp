require("dotenv").config();

const cb = require("cleverbot-free");
const cors = require("cors");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();

app.use([cors(), bodyParser.json(), bodyParser.urlencoded({ extended: true })]);

app.post("/response", async (req, res) => {
  const { message, conversation } = req.body;

  const response = await cb(
    message,
    conversation.map((m) => m.content)
  );
  res.json({ response });
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on ${port}`));
