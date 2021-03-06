var express = require('express')
var app = express()

var User = require('../../models/user')
var Post = require('../../models/post')
var Tweet = require('../../models/tweet')
var Recipe = require('../../models/recipe')

var authenticate = require('../../middleware/authenticate_api')
app.locals.pretty = true

app.post('/', authenticate, function(req, res) {
  var searchText = req.body.searchText

  var searchUser = function(results, callback) {
    User.find({
      $or: [
        {'local.username': {'$regex': searchText}},
        {'local.firstname': {'$regex': searchText}},
        {'local.lastname': {'$regex': searchText}},
        {'local.email': {'$regex': searchText}},
        {'enterprise.businessname': {'$regex': searchText}}
      ]
    }).exec(function(err, users) {
      if (err) {
        res.json({success: false, 'err': err})
      }
      results['users'] = users
      callback(results, callback)
    })
  }

  var searchTweet = function(results, callback) {
    Tweet.find({'content': {'$regex':searchText}}).populate({
      'path': 'post_id',
      'populate': {
        'path': 'user_id',
        'model': 'User'
      }
    }).exec(function(err, tweets) {
      if (err) {
        res.json({success: false, 'err': err})
      }
      results['tweets'] = tweets
      callback(results)
    })
  }

  var searchRecipe = function(results, callback) {
    Recipe.find({'recipeName': {'$regex': searchText}}).populate({
      'path': 'post_id',
      'populate': {
        'path': 'user_id',
        'model': 'User'
      }
    }).exec(function(err, recipes) {
      if (err) {
        res.json({success: false, 'err': err})
      }
      results['recipes'] = recipes
      callback(results)
    })
  }

  var searchResult = {}
  searchUser(searchResult, function(result1) {
    searchTweet(result1, function(result2) {
      searchRecipe(result2, function(result3) {
        res.json({success: true, 'result': result3})
      })
    })
  })
})

module.exports = app
