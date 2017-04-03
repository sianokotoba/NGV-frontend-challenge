'use strict';

const express = require('express');
const router = new express.Router();
const DirectLoans = require('../models/loans');

module.exports = router;

// GET /api/loans
router.get('/', function (req, res, next) {
  console.log("IN APi/loans", DirectLoans)
  res.json("HELLO THERE")
});
