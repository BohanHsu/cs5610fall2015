var mongoose = require('mongoose')

var CommentSchema = new mongoose.Schema({
  content: 'string'
})

module.exports = mongoose.model('Comment', CommentSchema)
