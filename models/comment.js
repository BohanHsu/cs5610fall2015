var mongoose = require('mongoose')
var User = require('./user')
var ObjectId = mongoose.Schema.Types.ObjectId

var commentSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User'
  },

  content: {
    type: String
  },

  comment_type: {
    type: String,
    validate: {
      validator: function(val) {
        var index = ['post'].indexOf(val)
        return index != -1
      },
      message: 'Wrong type!'
    }
  },

  post_id: {
    type: ObjectId,
    ref: 'Post'
  },

  comment_id: {
    type: ObjectId,
    ref: 'Comment'
  },

  updated: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)
