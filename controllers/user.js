var express = require('express')
var authenticate = require('../middleware/authenticate')
var app = express()
var cookieParser = require('cookie-parser')
app.locals.pretty = true
app.use(cookieParser())

app.get('/', authenticate, function(req, res) {
  res.render('./user/user', {user: req.session.user})
})

app.get('/search.view', authenticate, function(req, res) {
  res.render('./user/search_view', {user: req.session.user})
})

app.get('/details.view', authenticate, function(req, res) {
  res.render('./user/details_view', {user: req.session.user})
})

module.exports = app
