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

function createTask(text, deadline, progress) {
  var task = new Task({
    text: text,
    deadline: deadline,
    progress: progress
  });
  task.save(function(err) {
    if (err) console.error(err);
  });
}

async function getTasks() {
  var tasks = await Task.find()
  return tasks;
}

function editTask(id, text, deadline, progress) {
  Task.findById(id, function(err, task) {
    if (err) console.log(err);

    task.overwrite({
      text: text,
      deadline: deadline,
      progress: progress
    });

    task.save(function(err){
      if (err) console.log(err);
    });
  });
}

function deleteTask(id){
  Task.findByIdAndDelete(id, function(err) {
    if (err) console.error(err);
  });
}

module.exports = {
  deleteTask: deleteTask, 
  getTasks: getTasks, 
  editTask: editTask, 
  createTask: createTask
}; 