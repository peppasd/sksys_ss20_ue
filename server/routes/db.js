var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

var Schema = mongoose.Schema;

const taskSchema = new Schema({
  text: String,
  deadline: Date,
  progress: {type: Number, min: 0, max: 100}
});

const Task = mongoose.model("Task", taskSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db: connection error:'));
db.once('open', function() {
  console.log("db: connecetd");
});

async function createTask(ttext, tdeadline, tprogress) {
  var task = new Task({
    text: ttext,
    deadline: tdeadline,
    progress: tprogress
  });
  await task.save(function(err) {
    if (err)
        res.send(err);

    res.json({ message: 'Task created!' });
  });
}

async function getTasks() {
  var result = await Task.find(function(err, tasks) {
    if (err)
        res.send(err);

    console.log("Getting all tasks...");
    res.json(tasks);
});
}

function editTask(tid, ttext, tdeadline, tpercent) {
  Task.findById(tid, function(err, task) {
    if (err)
        res.send(err);

    task.text = ttext;
    task.deadline = tdeadline;
    task.percent = tpercent;

    task.save(function(err){
      if (err)
        res.send(err);

        res.json({message: "Task updated!" });
    });
  });
}

function deleteTask(id){
  // Task.findByIdAndRemove();

  Task.remove({
    _id: id
  }, function (err, task){
    if (err)
      res.send(err);

    res.json({message: "Successfully deleted!"});
  });
}

module.exports = {deleteTask:deleteTask, getTasks:getTasks, editTask:editTask, createTask:createTask}; 
module.exports = {Task: Task};