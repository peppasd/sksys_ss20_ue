var express = require('express');
var app = express();
var tasks = require('./routes/tasks/router.js');

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log("router: new connection from " + req.ip);
  next();
})

app.use('/tasks', tasks);

app.listen(3000, () => console.log("server started at port 3000"));