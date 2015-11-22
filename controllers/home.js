var express = require('express')
var authenticate = require('../middleware/authenticate_home')
var app = express()
var cookieParser = require('cookie-parser')
app.locals.pretty = true
app.use(cookieParser())

app.get('/', authenticate, function (req, res) {
  res.render('./home/home', {title: 'Hello world', message: 'NEU CS5610 Bohan Xu', user: req.session.user})
})

app.get('/home/visitor.view', function(req, res) {
  res.render('./home/visitor_view', {user: req.session.user})
})

app.get('/home/timeline.view', function(req, res) {
  res.render('./home/timeline_view', {user: req.session.user})
})

app.get('/home/business.view', function(req, res) {
  res.render('./home/business_view', {user: req.session.user})
})

app.get('/home/search.view', function(req, res) {
  res.render('./home/search_view', {user: req.session.user})
})

module.exports = app
