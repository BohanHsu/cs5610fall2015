var express = require('express')
var app = express()
var models = require('../models')

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

module.exports = app
