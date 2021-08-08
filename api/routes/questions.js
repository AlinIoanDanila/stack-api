const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Question = require("../models/question");

router.get("/", (req, res) => {
  Question.find()
    .populate("userID")
    .exec()
    .then((result) => res.status(200).json([result]))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Question.findById(id)
    .exec()
    .then((result) => res.status(200).json([result]))
    .catch((err) => res.status(404).json({ error: err }));
});

router.post("/", (req, res) => {
  const question = new Question({
    _id: mongoose.Types.ObjectId(),
    description: req.body.description,
    userID: req.body.userID,
    comments: req.body.comments,
  });

  question
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Question.remove({ _id: id })
    .exec()
    .then((result) =>
      res
        .status(200)
        .json(result)
        .catch((err) => res.status(500).json({ error: err }))
    );
});

router.patch("/:id", (req, res) => {
  const id = req.params.id;

  Question.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
