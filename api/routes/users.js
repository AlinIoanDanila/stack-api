const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

//Get methods
router.get("/", (req, res) => {
  if (req.query) {
    User.find({ name: req.query.username })
      .exec()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ error: err }));
  } else {
    User.find()
      .exec()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(500).json({ error: err }));
  }
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ error: err });
    });
});

router.get("/", (req, res) => {
  const username = req.query.username;
  console.log(username);
  User.find({ name: username })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json({ result: result });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json({ error: err });
    });
});

//Post methods
router.post("/", (req, res) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
  });

  user
    .save()
    .then((result) => {
      res.status(201).json({
        message: "send",
        result: result,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

//Delete methods
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  User.remove({ _id: id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

//Update methods
router.patch("/:id", (req, res) => {
  const id = req.params.id;

  User.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => res.status(200).json({ result }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
