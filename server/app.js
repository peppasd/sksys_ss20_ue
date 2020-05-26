var express = require('express');
var app = express();
var tasks = require('./routes/tasks.js');
var bodyParser = require('body-parser')

app.use((req, res, next) => {
  console.log("router: new connection from " + req.ip);
  next();
})

//npm install body-parser --save
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.use('/tasks', tasks);

app.listen(3000, () => console.log("server started at port 3000"));