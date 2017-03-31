'use strict';

const express = require('express');
const router = new express.Router();
module.exports = router;

router.get('/', function (req, res, next) {
  console.log("this should hit the backend")
  res.json("HELLO THERE")
});
