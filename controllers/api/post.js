var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
app.locals.pretty = true

app.post('/all', function(req, res) {
  if (req.session.user._id != req.body.user_id) {
    res.json({success: false, err: 'Credential issue!'})
  } else {
    Following.find({follow_by: req.session.user._id}).populate('following').exec(function(err, followings) {
      var following_ids = followings.map(function(follow) {
        return follow.following._id
      })
      Post.find({
        user_id: {$in: following_ids}
      }).
      limit(20)
      .skip(0)
      .sort({date: -1})
      .exec(function(err, posts) {
        var tweet_ids = posts.filter(function(post) {
          return post.post_type == 'tweet'
        }).map(function(post) {
          return post.tweet_id
        })

        Tweet.find({
          _id: {$in: tweet_ids}
        }).exec(function(err, tweets) {
          res.json({success: true, 'posts': posts, 'tweets': tweets})
        })
      })
    })
  }
})

app.post('/new', function (req, res) {
  if (req.session.user._id != req.body.user_id) {
    res.json({success: false, err: 'Credential issue!'})
  } else {

    if (req.body.type == 'tweet') {
      var tweet = new Tweet()
      tweet.content = req.body.tweet
      tweet.save(function(err) {
        if (err) {
          res.json({success: false, 'err': err})
        } else {
          var post = new Post()
          post.user_id = req.session.user._id
          post.post_type = 'tweet'
          post.tweet_id = tweet._id
          post.save(function(err) {
            if (err) {
              res.json({success: false, 'err': err})
            } else {
              res.json({
                success: true, 
                'post': post,
                'tweet': tweet
              })
            }
          })
        }
      })
    }
  }
})

module.exports = app
