var express = require('express');
var router = express.Router();

var task = require('./db');

//Get all tasks
router.get("/", task.getTasks);
  // res.json({ message: 'hooray! welcome to our api!' });   

//Add a new tasks
router.post("/", (req, res) => {
  res.send("post");
})

//Delete existing task with ID
router.delete("/:id", (req, res) => {
  res.send("delete");
})

//Edit existing task with ID
router.patch("/:id", (req, res) => {
  res.send("patch");
})

module.exports = router;