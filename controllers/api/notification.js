var express = require('express')
var app = express()
var Notification = require('../../models/notification')
var authenticate = require('../../middleware/authenticate_api')

app.post('/readnotification/:id', authenticate, function(req, res) {
  Notification.findById(req.params.id, function(err, notification) {
    notification.viewed = true
    notification.save(function(err) {
      if (err) {
        res.json({success: false})
      } else {
        res.json({success: true})
      }
    })
  })
})

app.post('/mynotification', authenticate, function(req, res) {
  var userId = req.body.user_id
  Notification.find({user_to: userId, viewed: false, user_from: {$ne: userId}})
  .populate('comment_from')
  .populate('comment_to')
  .populate('user_from')
  .populate({
    path: 'post_id',
    model: 'Post',
    populate: [
      {
        path: 'tweet_id',
        model: 'Tweet'
      },
      {
        path: 'recipe_id',
        model: 'Recipe'
      }
    ]
  })
  .sort({updated: '-1'})
  .exec(function(err, notifications) {
    if (err) {
      res.json({success: false, err: err})
    }

    res.json({success: true, notifications: notifications})
  })

})

module.exports = app
