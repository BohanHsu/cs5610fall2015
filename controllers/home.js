var express = require('express')
var app = express()

app.get('/', function (req, res) {
  res.render('home', {title: 'Hello world', message: 'NEU CS5610 Bohan Xu'})
})

module.exports = app
