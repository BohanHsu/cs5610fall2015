var express = require('express')
var app = express()
var authenticate = require('../../middleware/authenticate_admin')
var fs = require('fs')
var path = require('path')
var Image = require('../../models/image')

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
        allPaths.push(path.join(__dirname, '../../public/uploads/post/', p))
      })

      avatarData.forEach(function(p) {
        allPaths.push(path.join(__dirname, '../../public/uploads/avatar/', p))
      })

      if (callback) {
        callback(allPaths)
      }
    })
  })
}

function saveAllImage(req, res, paths, callback) {
  function next() {
    paths.splice(0, 1)
    saveAllImage(req, res, paths, callback)
  }

  if (paths.length > 0) {
    var path = paths[0]
    //console.log('path:', path)
    var image = new Image()

    fs.readFile(path, function(err, imgData) {
      if (!err) {
        image.path = path
        image.data = imgData
        image.save(function(err) {
          if (err) {
            console.log(err)
            res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
          }
          fs.unlink(path, function(err) {
            if (err) {
              res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
            }
            next()
          })
        })
      } else {
        next()
      }
    })
  } else {
    if (callback) {
      callback()
    }
  }
}

app.get('/saveallimage', authenticate, function(req, res) {
  //Image.find({}).remove(function() {
  getAllPaths(req, res, function(allPaths) {
    var length = allPaths.length
    saveAllImage(req, res, allPaths, function() {
      res.render('./admin/admin', {
        title: 'Admin', 
        message: length + ' image saved', 
        user: req.session.user,
        images: allPaths
      })
    })
  })
  //})
})

function loadAllImage(req, res, callback) {
  Image.find({}).exec(function(err, images) {
    var length = images.length
    console.log(images)

    function loadImageOneByOne(callback) {
      if (images.length > 0) {
        console.log(images.length)
        var path = images[0].path
        var data = images[0].data
        fs.writeFile(path, data, function(err) {
          if (err) {
            res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
          }

          images.splice(0, 1)
          loadImageOneByOne(callback)
        })
      } else {
        Image.find({}).remove(function() {
          if (callback) {
            callback(length)
          }
        })
      }

    }

    loadImageOneByOne(callback)
  })
}

app.get('/loadallimage', authenticate, function(req, res) {
  loadAllImage(req, res, function(length) {

    res.render('./admin/admin', {
      title: 'Admin', 
      message: length + ' image loaded', 
      user: req.session.user,
    })
  })
})

module.exports = app
