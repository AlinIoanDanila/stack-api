const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const comment = require("../models/comment");
const Comment = require("../models/comment");

//Get methods
router.get("/", (req, res) => {
  Comment.find()
    .exec()
    .then((result) => res.status(200).json({ result }))
    .catch((err) => res.status(500).json({ error: err }));
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
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
router.post("/", (req, res, next) => {
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    description: req.body.description,
    user: req.body.user,
  });

  comment
    .save()
    .then((result) => res.status(201).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

//Delete methods
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  comment
    .remove({ _id: id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

//Update methods
router.patch("/:id", (req, res) => {
  const id = req.params.id;

  comment
    .updateOne({ _id: id, $set: req.body })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
