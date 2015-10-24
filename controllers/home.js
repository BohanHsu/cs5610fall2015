var express = require('express')
var app = express()
app.locals.pretty = true

app.get('/', function (req, res) {
  console.log(req.session.user)
  res.render('home', {title: 'Hello world', message: 'NEU CS5610 Bohan Xu', user: req.session.user})
})

module.exports = app
