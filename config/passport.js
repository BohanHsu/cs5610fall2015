var LocalStrategy = require('passport-local').Strategy

var User = require('../models/user')

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
          newUser.local.firstname = req.body['firstname']
          newUser.local.lastname = req.body['lastname']
          newUser.local.imageUrl = req.body['imageUrl']

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
        return done('User not exist', null, req.flash('loginMessage', 'No user found.'))
      }

      if (!user.validPassword(password)) {
        return done('Wrong password', null, req.flash('loginMessage', 'Wrong password.'))
      }

      return done(null, user)
    })
  }))

  return passport
}
