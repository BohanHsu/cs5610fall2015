var express = require('express')
var app = express()
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Following = require('../../models/following')
var Recipe = require('../../models/recipe')
app.locals.pretty = true

app.post('/all', function(req, res) {
  if (req.session.user._id != req.body.user_id) {
    res.json({success: false, err: 'Credential issue!'})
  } else {
    Following.find({follow_by: req.session.user._id}).populate('following').exec(function(err, followings) {
      var following_ids = followings.map(function(follow) {
        return follow.following._id
      })
      following_ids.push(req.session.user._id)

      var skip = (parseInt(req.body.page) - 1) * 20
      Post.find({
        user_id: {$in: following_ids}
      })
      .populate('user_id')
      .sort({updated: '-1'})
      .limit(parseInt(req.body.amount))
      .skip(skip)
      .exec(function(err, posts) {

        var totalCnt = null
        Post.find({
          user_id: {$in: following_ids}
        }).count(function(err, cnt) {
          totalCnt = cnt
          console.log('cnt', cnt)
        })

        var tweet_ids = posts.filter(function(post) {
          return post.post_type == 'tweet'
        }).map(function(post) {
          return post.tweet_id
        })

        var recipe_ids = posts.filter(function(post) {
          return post.post_type == 'recipe'
        }).map(function(post) {
          return post.recipe_id
        })

        Tweet.find({
          _id: {$in: tweet_ids}
        }).exec(function(err, tweets) {
          Recipe.find({
            _id: {$in: recipe_ids}
          }).exec(function(err, recipes) {
            res.json({success: true, 'posts': posts, 'tweets': tweets, 'recipes': recipes, 'totalCnt': totalCnt})
          })
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
    } else {
      res.json({success: false, err: 'Wrong type!'})
    }
  }
})

app.post('/new/recipe', function (req, res) {
  if (req.session.user._id != req.body.user_id) {
    res.json({success: false, err: 'Credential issue!'})
  } else {

    if (req.body.type == 'recipe') {
      var recipe = new Recipe()
      console.log(req.body)
      req.body.ingredients.forEach(function(ingredient) {
        recipe.ingredients.push(ingredient)
        return
      })
      req.body.steps.forEach(function(step) {
        recipe.steps.push(step)
        return
      })
      recipe.recipeName = req.body.recipeName
      recipe.save(function(err) {
        if (err) {
          console.log('1', err)
          res.json({success: false, 'err': err})
        } else {
          var post = new Post()
          post.user_id = req.session.user._id
          post.post_type = 'recipe'
          post.recipe_id = recipe._id
          post.save(function(err) {
            if (err) {
              console.log('2', err)
              res.json({success: false, 'err': err})
            } else {
              res.json({
                success: true, 
                'post': post,
                'recipe': recipe
              })
            }
          })
        }

      })
    } else {
      res.json({success: false, err: 'Wrong type!'})
    }
  }
})

module.exports = app
