const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const user = require("../models/user");

const User = require("../models/user");

//Get methods
router.get("/", (req, res) => {
  User.find()
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));
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

  user
    .remove({ _id: id })
    .exec()
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(500).json({ error: err }));

  res.status(200).json({ message: "patch" });
});

//Update methods
router.patch("/:id", (req, res) => {
  const id = req.params.id;

  user
    .updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((result) => res.status(200).json({ result }))
    .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router;
