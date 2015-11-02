var express = require('express')
var app = express()
app.locals.pretty = true

app.get('/', function (req, res) {
  res.render('./home/home', {title: 'Hello world', message: 'NEU CS5610 Bohan Xu', user: req.session.user})
})

app.get('/home/visitor.view', function(req, res) {
  res.render('./home/visitor_view', {user: req.session.user})
})

app.get('/home/timeline.view', function(req, res) {
  res.render('./home/timeline_view', {user: req.session.user})
})

module.exports = app
