var express = require('express')
var app = express()
var authenticate = require('../../middleware/authenticate_admin')
var fs = require('fs')
var path = require('path')
var Image = require('../../models/image')
var User = require('../../models/user')
var Recipe = require('../../models/recipe')

function getAllPaths(req, res, callback) {
  var postPath = path.join(__dirname, '../../public/uploads/post/')
  var avatarPath = path.join(__dirname, '../../public/uploads/avatar/')
  fs.readdir(postPath, function(err, postData) {
    if (err) {
      console.log(err)
    }
    fs.readdir(avatarPath, function(err, avatarData) {
      if (err) {
        console.log(err)
      }

      var allPaths = []

      postData.forEach(function(p) {
        allPaths.push(path.join('/uploads/post/', p))
      })

      avatarData.forEach(function(p) {
        allPaths.push(path.join('/uploads/avatar/', p))
      })

      if (callback) {
        callback(allPaths)
      }
    })
  })
}

app.get('/all', authenticate, function(req, res) {
  getAllPaths(req, res, function(paths) {
    var pathHash = {}
    paths.forEach(function(ele) {
      pathHash[ele] = null
    })

    User.find({}).exec(function(err, users) {
      users.forEach(function(user) {
        if (user.local.imageUrl) {
          pathHash[user.local.imageUrl] = user
        }
      })

      Recipe.find({}).exec(function(err, recipes) {
        recipes.forEach(function(recipe) {
          recipe.steps.forEach(function(step) {
            if (step[1] != '') {
              pathHash[step[1]] = recipe
            }
          })

        })
        res.render('./admin/admin_image', {title: 'Admin Image', message: 'Welcome Bohan Xu', user: req.session.user, 'paths': pathHash})
      })
    })
  })
})

module.exports = app
