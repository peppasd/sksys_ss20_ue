var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', {useNewUrlParser: true, useUnifiedTopology: true});

const taskSchema = mongoose.Schema({
  text: String,
  deadline: Date,
  progress: Number
});

const Task = mongoose.model("Task", taskSchema);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'db: connection error:'));
db.once('open', function() {
  console.log("db: connecetd");
});

async function createTask(text, deadline, progress) {
  var task = new Task({
    text: text,
    deadline: deadline,
    progress: progress
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

function editTask() {
  Task.findById(req.params.tasks_id, function(err, task) {
    if (err)
        res.send(err);

    task.text = req.body.text;
    task.save(function(err){
      if (err)
        res.send(err);

        res.json({message: "Task updated!" });
    });
  });
}

function deleteTask(){
  Task.remove({
    _id: req.params.task_id
  }, function (err, task){
    if (err)
      res.send(err);

    res.json({message: "Successfully deleted!"});
  });
}


exports.getTasks = getTasks;
exports.editTask = editTask;
exports.createTask = createTask;
exports.deleteTask = deleteTask;
module.exports = Task;