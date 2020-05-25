var express = require('express');
var app = express();
var tasks = require('./routes/tasks.js');


app.use((req, res, next) => {
  console.log("router: new connection from " + req.ip);
  next();
})

app.use('/tasks', tasks);

app.listen(3000, () => console.log("server started at port 3000"));
