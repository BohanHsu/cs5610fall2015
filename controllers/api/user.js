var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
var User = require('../../models/user')
app.locals.pretty = true

app.post('/userDetails', function(req, res) {
  User.findById(req.body.id ,function(err, user) {
    Following.find({'follow_by': user._id}).populate('following').exec(function(err, followings) {
      Following.find({'following': user._id}).populate('follow_by').exec(function(err, followBys) {
        Post.find({user_id: user._id})
        .sort({updated: -1})
        .exec(function(err, posts) {
          var tweetIds = posts.filter(function(post) {
            return post.post_type == 'tweet'
          })
          .map(function(post) {
            return post.tweet_id
          })
          Tweet.find({'_id': {$in: tweetIds}}).exec(function(err, tweets) {
            res.json({success: true, user: user, followings: followings, followBys: followBys, posts: posts, tweets: tweets})
          })
        })
      })
    })
  })
})

app.post('/search', function(req, res) {
  if (req.body.type = 'id') {
    var searchText = req.body.searchText
    User.find({'local.username': {'$regex': searchText}}).exec(function(err, users) {
      res.json({success: true, users: users})
    })
  }
})

module.exports = app

