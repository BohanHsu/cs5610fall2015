var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
app.locals.pretty = true

app.get('/all', function(req, res) {
  if (req.session.user._id != req.body.user_id) {
    res.json({success: false, err: 'Credential issue!'})
  } else {
    Following.find({follow_by: req.session.user._id}).populate('following').exec(function(err, followings) {
      console.log(following)
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
          console.log(post)
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
