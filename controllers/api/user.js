var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
var User = require('../../models/user')
var authenticate = require('../../middleware/authenticate_api')
app.locals.pretty = true

app.post('/userDetails', function(req, res) {
  User.findById(req.body.id ,function(err, user) {
    Following.find({'follow_by': user._id}).populate('following').exec(function(err, followings) {
      Following.find({'following': user._id}).populate('follow_by').exec(function(err, followBys) {
        Post.find({user_id: user._id})
        .sort({updated: -1})
        .populate('tweet_id')
        .populate('recipe_id')
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

app.post('/update/:id', authenticate, function(req, res) {
  var userId = req.params.id
  var updateAttrs = req.body.updateAttrs
  User.findById(userId, function(err, user) {
    if (updateAttrs.firstname) {
      user.local.firstname = updateAttrs.firstname
    }

    if (updateAttrs.lastname) {
      user.local.lastname = updateAttrs.lastname
    }

    if (updateAttrs.email) {
      user.local.email = updateAttrs.email
    }

    if (updateAttrs.newPassword) {
      user.local.password = user.generateHash(updateAttrs.newPassword)
    }

    if (updateAttrs.imageUrl) {
      user.local.imageUrl = updateAttrs.imageUrl
    }

    user.save(function(err) {
      if (err) {
        res.json({success: false, 'err': err})
      } else {
        res.json({success: true, user: user})
      }
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

app.post('/following/query', authenticate, function(req, res) {
  var userIds = req.body.userIds
  var curUserId = req.body.user_id

  function queryOne(results) {
    if (userIds.length > 0) {
      var userId = userIds[0]
      Following.find({'follow_by': curUserId, 'following': userId}).exec(function(err, following) {
        if (err) {
          res.json({success: false, 'err': err})
        }

        results[userId] = following.length != 0
        userIds.splice(0, 1)
        queryOne(results)
      })
    } else {
      res.json({success: true, 'result': results})
    }
  }

  queryOne({})
})

app.post('/following/new', authenticate, function(req, res) {
  var curUserId = req.body.user_id
  var followingUserId = req.body.followingUserId
  Following.find({'follow_by': curUserId, 'following': followingUserId}).exec(function(err, followings) {
    if (err) {
      res.json({success: false, 'err': err})
    }
    if (followings.length != 0) {
      res.json({success: false, 'err': 'Already following'})
    }

    var newFollowing = new Following()
    newFollowing.follow_by = curUserId
    newFollowing.following = followingUserId
    newFollowing.save(function(err) {
      if (err) {
        res.json({success: false, 'err': err})
      }
      res.json({success: true, 'following': newFollowing})
    })
  })
})

app.post('/following/delete', authenticate, function(req, res) {
  var curUserId = req.body.user_id
  var followingUserId = req.body.followingUserId
  Following.find({'follow_by': curUserId, 'following': followingUserId}).remove(function(err, followings) {
    if (err) {
      res.json({success: false, 'err': err})
    }

    res.json({success: true, 'followings': followings})
  })
})

module.exports = app
