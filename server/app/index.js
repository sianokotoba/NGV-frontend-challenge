'use strict';
var path = require('path');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
module.exports = app;

// Pass our express application pipeline into the configuration
// function located at server/app/configure/index.js
var npmPath = path.join(__dirname, '../../node_modules');
var publicPath = path.join(__dirname, '../../public');
var indexPath = path.join(__dirname, '../../index.html');

console.log("PATH???", indexPath)
console.log("Typeof", typeof indexPath)
console.log("NPM", npmPath)
console.log("PUBLIC", publicPath)

app
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(morgan('dev'))
  .use(express.static(npmPath))
  .use(express.static(publicPath))
  .use('/api', require('../routes'))


/*
 This middleware will catch any URLs resembling a file extension
 for example: .js, .html, .css
 This allows for proper 404s instead of the wildcard '/*' catching
 URLs that bypass express.static because the given file does not exist.
 */
app.use(function (req, res, next) {

    if (path.extname(req.path).length > 0) {
        res.status(404).end();
    } else {
        next(null);
    }

});

app.get('/*', function (req, res) {
    res.sendFile(indexPath);
});

// Error catching endware.
app.use(function (err, req, res, next) {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});
