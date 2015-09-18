var express = require('express')
var app = express()
var models = require('../models')
var multer = require('multer')
var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')

app.get('/', function (req, res) {
  models.Comment.find({}).exec().then(function (comments) {
    res.render('comment', {
      message: 'Comments',
      comments: comments
    })
  })
})

app.post('/', function (req, res) {
  var comment = new models.Comment({content: req.body.content})
  comment.save(function (err, comment) {
    if (err) {
      console.log(err)
    }

    models.Comment.find({}).exec().then(function (comments) {
      res.render('comment', {
        message: 'Comments',
        comments: comments
      })
    })
  })
})

app.use(multer({ dest: __dirname + '/../tmp' }).single('image'))
app.post('/image', function (req, res) {
  fs.readFile(req.file.path, function (err, data) {
    if (!err) {
      var userName = null
      if (req.user) {
        userName = req.user.local.username
      } else {
        userName = 'guest'
      }
      var newPath = path.join(__dirname, '../public/uploads', userName, req.file.filename)

      mkdirp(path.dirname(newPath), function (err) {
        if (err)
          console.log(err)

        fs.writeFile(newPath, data, function (err) {
          if (err)
            console.log(err)
          fs.unlink(req.file.path, function (err) {
            var comment = new models.Comment({
              user: (req.user ? req.user : null),
              content: req.body.content,
              imageUrl: path.join('uploads', userName, req.file.filename)
            })

            comment.save(function (err, comment) {
              if (err) {
                console.log(err)
              }
              res.redirect('/comments')
            })
          })
        })
      })
    }
  })
})

app.get('/delete/:comment_id', function (req, res) {
  console.log(req.param('comment_id'))
  var comment_id = req.param('comment_id')

  models.Comment.findOne({ _id: comment_id }, function (err, comment) {
    console.log(comment)
    var filePath = path.join(__dirname, '../public', comment.imageUrl)
    fs.unlink(filePath, function (err) {
      if (err)
        console.log(err)

      models.Comment.remove({ _id: comment_id }, function (err) {
        if (err)
          console.log(err)

        res.redirect('/comments')
      })
    })
  })
})

module.exports = app
