var express = require('express');
var router = express.Router();

var task = require('./db');
// import * as task from "./db";

//Get all tasks
router.get("/", (req, res) => {
  task.getTasks();
  res.json({ message: 'hooray! welcome to our api!' });   
})

//Create a new tasks
router.post("/", (req, res) => {
  task.createTask(req.body.text, req.body.deadline, req.body.percent);
  res.send("post");
  
})

//Delete existing task with ID
router.delete("/:id", (req, res) => {
  task.deleteTask(req.params.task_id);
  res.send("delete");
})

//Edit existing task with ID
router.patch("/:id", (req, res) => {
  task.editTask(req.params.tasks_id, req.body.text, req.body.deadline, req.body.percent);
  res.send("patch");
})

module.exports = router;