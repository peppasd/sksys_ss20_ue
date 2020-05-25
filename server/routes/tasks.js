var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
  res.send("get");
})

router.post("/", (req, res) => {
  res.send("post");
})

router.delete("/:id", (req, res) => {
  res.send("delete");
})

router.patch("/:id", (req, res) => {
  res.send("patch");
})

module.exports = router;