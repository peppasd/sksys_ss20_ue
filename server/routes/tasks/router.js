var express = require('express');
var router = express.Router();

var db = require('./db');
var val = require('./validate')

//Get all tasks
router.get("/", (req, res) => {
  db.getTasks().then(function(tasks) {
    res.send(tasks);
  });
})

//Create a new tasks
router.post("/", (req, res) => {
  let text = req.body.text;
  let deadline = req.body.deadline;
  let progress = parseInt(req.body.progress);

  if (!val.validate(text, deadline, progress)){
    res.status(400).send("Invalid content");
    return;
  } 
  
  //TODO error handling
  db.createTask(text, deadline, progress);
  res.send("OK");
})

//Delete existing task with ID
router.delete("/:id", (req, res) => {
  db.deleteTask(req.params.id);
  //TODO error handling
  res.send("OK");
})

//Edit existing task with ID
router.patch("/:id", (req, res) => {
  let id = req.params.id;
  let text = req.body.text;
  let deadline = req.body.deadline;
  let progress = parseInt(req.body.progress);

  if (!val.validate(text, deadline, progress)){
    res.status(400).send("Invalid content");
    return;
  } 

  //TODO error handling
  db.editTask(id, text, deadline, progress);
  res.send("OK");
})

module.exports = router;