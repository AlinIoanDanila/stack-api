const express = require("express");
const app = express();
const mongoose = require("mongoose");

const url = "mongodb://127.0.0.1:27017/test";

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

const usersRoute = require("./api/routes/users");
const questionsRoute = require("./api/routes/questions");
const commentsRoute = require("./api/routes/comments");

//Handle CORS Errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/users", usersRoute);
app.use("/questions", questionsRoute);
app.use("/comments", commentsRoute);

app.use((req, res, next) => {
  const error = new Error("Unable to do action");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      msg: error.message,
    },
  });
});

module.exports = app;
