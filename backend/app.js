const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const cors = require("cors");

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// importing Routes
const post = require("./routes/Post.js");
const user = require("./routes/User.js");

// Test Route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Defining route  path
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
