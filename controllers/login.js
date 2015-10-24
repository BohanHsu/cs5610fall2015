var express = require('express')
var app = express()
var authenticate = require('../middleware/authenticate')

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
        res.json({success: true, user: user})
      }
    })(req, res, null)
  })
  
  app.get('/signup', function (req, res) {
    res.render('signup', {title: 'sign up', message: 'sign up'})
  })
  
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login/profile',
    failureRedirect: '/login/signup',
    faliureFlash: true
  }))
  
  app.get('/profile', authenticate, function (req, res) {
    res.render('profile', {title: 'profile', message: 'profile', user: req.session.user})
  })
  
  app.get('/logout', function (req, res) {
    req.logout()
    req.session['user'] = null
    res.redirect('/')
  })

  return app
}
