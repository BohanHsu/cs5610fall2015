(function() {
  module.exports = function(req, res, next) {
    if (req.session.user._id != req.body.user_id) {
      res.json({success: false, err: 'Credential issue!'})
    } else {
      return next()
    }
  }
})()
