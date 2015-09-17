var express = require('express')
var app = express()

module.exports = function (passport) {

  app.get('/', function (req, res) {
    res.render('login', {title: 'login', message: 'login'})
  })
  
  app.post('/', passport.authenticate('local-login', {
    successRedirect: '/login/profile',
    failureRedirect: '/login',
    failureFlash: true
  }))
  
  app.get('/signup', function (req, res) {
    res.render('signup', {title: 'sign up', message: 'sign up'})
  })
  
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login/profile',
    failureRedirect: '/login/signup',
    faliureFlash: true
  }))
  
  app.get('/profile', isLoggedIn, function (req, res) {
    res.render('profile', {title: 'profile', message: 'profile', user: req.user})
  })
  
  app.get('/logout', function (req, res) {
    req.logout()
    res.redirect('/')
  })
  
  function isLoggedIn (req, res, next) {
    if (req.isAuthenticated())
      return next()
  
    res.redirect('/')
  }

  return app
}
