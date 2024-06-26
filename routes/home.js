var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()

var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  let data = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  res.render('home', {array: JSON.parse(data)});
});

router.post('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  const newArray = array.concat([req.body.newText])
  fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(newArray));
  res.end();
});

//This is not correct. This is adding an element to the array not taking away an element
router.delete('/', jsonParser, function(req, res, next) {
  let rawdata = fs.readFileSync(path.resolve(__dirname, "../data/introductionArray.json"));
  let array = JSON.parse(rawdata);
  const newArray = array.pop([req.body.deleteText])
  fs.writeFileSync(path.resolve(__dirname, "../data/introductionArray.json"), JSON.stringify(newArray));
  res.end();
});


module.exports = router;
