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
  await task.save();
}

async function getTasks() {
  var result = await Task.find();
  console.log(result.toString());
}
