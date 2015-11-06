var express = require('express')
var app = express()
app.locals.pretty = true
var authenticate = require('../middleware/authenticate')
var multipart=require('connect-multiparty')
var multipartMiddleware = multipart()
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var express = require('express')
var cookieParser = require('cookie-parser')

app.use(cookieParser())

module.exports = function (passport) {

  app.get('/', function (req, res) {
    if (req.session.user)
      res.set(user, req.session.user)
    else
      res.set(user, null)

    res.render('login', {title: 'login', message: 'login'})
  })

  app.post('/', function (req, res) {
    passport.authenticate('local-login', function (err, user) {
      if (err) {
        res.json({success: false, err: err})
      } else {
        req.session['user'] = user
        if (req.body['rememberMe']) {
          res.cookie('uid', user._id, { maxAge: 900000, httpOnly: true })
        }
        res.json({success: true, user: user})
      }
    })(req, res, null)
  })
  
  app.get('/signup', function (req, res) {
    res.render('signup', {title: 'sign up', message: 'sign up'})
  })

  app.post('/signup', function(req, res) {
    passport.authenticate('local-signup', function(err, user) {
      if (err) {
        res.json({success: false, err: err})
      } else {
        req.session['user'] = user
        res.json({success: true})
      }
    })(req, res, null)
  })

  app.get('/profile', authenticate, function (req, res) {
    res.render('profile', {title: 'profile', message: 'profile', user: req.session.user})
  })
  
  app.get('/logout', function (req, res) {
    req.logout()
    req.session['user'] = null
    res.cookie('uid', "", { maxAge: 900000, httpOnly: true })
    res.redirect('/')
  })

  return app
}
