var express = require('express')
var authenticate = require('../middleware/authenticate_home')
var app = express()
var cookieParser = require('cookie-parser')
var User = require('../models/user')
var Post = require('../models/post')
app.locals.pretty = true
app.use(cookieParser())

app.get('/', authenticate, function (req, res) {
  res.render('./home/home', {title: 'TasteOf', message: 'NEU CS5610 Bohan Xu', user: req.session.user})
})

app.get('/home/visitor.view', function(req, res) {
  //res.render('./home/visitor_view', {user: req.session.user})
  var pastDays = 7
  var now = new Date()
  var start = new Date(now)
  start.setDate(start.getDate() - pastDays)

  User.find({
    updated: {
      $gt: start
    }
  })
  .sort({updated: '-1'})
  .exec(function(err, users) {
    Post.find({
      updated: {
        $gt: start
      }
    })
    .sort({updated: '-1'})
    .populate('user_id')
    .populate('tweet_id')
    .populate('recipe_id')
    .exec(function(err, posts) {

      var newTweets = []
      var newRecipes = []

      posts.forEach(function(ele, idx, arr) {
        if (ele.post_type == 'tweet') {
          newTweets.push(ele)
        }
        if (ele.post_type == 'recipe') {
          newRecipes.push(ele)
        }
      })

      res.render('./home/visitor_view', {
        user: req.session.user, 
        pastDays: pastDays, 
        newUsers: users,
        newTweets: newTweets,
        newRecipes: newRecipes,

        firstnelements: function(n, arr) {
          var i = 0
          var newArr = []
          arr.forEach(function(ele, idx, arr) {
            if (idx < n) {
              newArr.push(ele)
            }
          })
          return newArr
        }
      })
    })
  })
})

app.get('/home/timeline.view', function(req, res) {
  res.render('./home/timeline_view', {user: req.session.user})
})

app.get('/home/business.view', function(req, res) {
  res.render('./home/business_view', {user: req.session.user})
})

app.get('/home/search.view', function(req, res) {
  res.render('./home/search_view', {user: req.session.user})
})

app.get('/home/user.view', function(req, res) {
  res.render('./home/user_view', {user: req.session.user})
})

app.get('/home/post.view', function(req, res) {
  res.render('./home/post_view', {user: req.session.user})
})

module.exports = app
