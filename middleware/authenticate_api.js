(function() {
  module.exports = function(req, res, next) {
    console.log(req.session.user._id)
    console.log(req.body.user_id)
    console.log(req.body)
    if (req.session.user._id != req.body.user_id) {
      res.json({success: false, err: 'Credential issue!'})
    } else {
      return next()
    }
  }
})()
