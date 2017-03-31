'use strict';
/* eslint-disable new-cap */

const router = require('express').Router();
module.exports = router;

router.use('/loans', require('./loans'));

// Make sure this is after all of
// the registered routes!
router.use(function (req, res) {
  res.status(404).end();
});
