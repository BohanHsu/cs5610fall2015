(function() {
  module.exports = function(req, res, next) {
    console.log(req.session.user.local.username)
    if (req.session.user == null || req.session.user.local.username != 'xbh') {
      res.json({success: false, err: 'Credential issue!'})
    } else {
      return next()
    }
  }
})()
