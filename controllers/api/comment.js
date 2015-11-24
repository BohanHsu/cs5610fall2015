var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
var Recipe = require('../../models/recipe')
var Comment = require('../../models/comment')
var authenticate = require('../../middleware/authenticate_api')
app.locals.pretty = true

app.post('/all/:type/:objectId', authenticate, function(req, res) {
  if (req.params.type == 'post') {
    var postId = req.params.objectId
    Comment.find({comment_type: 'post', post_id: postId})
    .populate('user_id')
    .populate('post_id')
    .populate({
      path: 'comment_id',
      populate: {
        path: 'user_id',
        model: 'User'
      }
    })
    .sort({'updated': '-1'})
    .exec(function(err, comments) {
      if (err) {
        res.json({success: false, err: err})
      } else {
        res.json({success: true, comments: comments})
      }
    })
  }

  if (req.params.type == 'user') {
    var commentonuserId = req.params.objectId
    Comment.find({comment_type: 'user', commentonuser_id: commentonuserId})
    .populate('user_id')
    .populate('commentonuser_id')
    .populate({
      path: 'comment_id',
      populate: {
        path: 'user_id',
        model: 'User'
      }
    })
    .sort({'updated': '-1'})
    .exec(function(err, comments) {
      if (err) {
        res.json({success: false, err: err})
      } else {
        res.json({success: true, comments: comments})
      }
    })
  }
})

app.post('/new/:type/:objectId', authenticate, function(req, res) {
  var newComment = new Comment()
  newComment.user_id = req.body.user_id
  newComment.content = req.body.content
  newComment.comment_type = req.params.type

  if (newComment.comment_type == 'post') {
    newComment.post_id = req.params.objectId
  }

  if (newComment.comment_type == 'user') {
    newComment.commentonuser_id = req.params.objectId
  }

  if (req.body.comment_id) {
    newComment.comment_id = req.body.comment_id
  }

  newComment.save(function(err) {
    if (err) {
      res.json({success: false, err: err})
    } else {
      res.json({success: true, comment: newComment})
    }
  })
})

module.exports = app
