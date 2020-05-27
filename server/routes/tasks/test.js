var db = require('./db.js');

//test1();

async function test1() {
  var tasks = await db.getTasks();
  console.log(tasks);
  db.createTask("this is test1", Date.now(), 70);
  console.log("new task added");
}

async function test2() {
  db.deleteTask("5ec93854809f2636e404b73f");
  var tasks = await db.getTasks();
  console.log(tasks);
}

async function test3() {
  db.editTask("5ece8d613bb8f92adc0a6b8b", "this is EDITED part 2", Date.now(), 70);
  var tasks = await db.getTasks();
  console.log(tasks);
}

