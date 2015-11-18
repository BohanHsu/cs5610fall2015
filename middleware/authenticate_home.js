(function() {
  var User = require('../models/user')

  module.exports = function(req, res, next) {
    if (req.session.user) {
      return next()
    } else {
      if (req.cookies['uid']) {
        User.findById(req.cookies['uid'], function(err, user) {
          req.session['user'] = user
          return next()
        })
      } else {
        return next()
      }
    }
  }
})()
