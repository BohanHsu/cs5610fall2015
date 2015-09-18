var mongoose = require('mongoose')
var User = require('./user')
var ObjectId = mongoose.Schema.Types.ObjectId

var commentSchema = new mongoose.Schema({
  user: {
    type: ObjectId,
    ref: 'User'
  },

  content: {
    type: String
  },

  imageUrl: {
    type: String
  }
})

module.exports = mongoose.model('Comment', commentSchema)
