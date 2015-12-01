var mongoose = require('mongoose')
var ObjectId = mongoose.Schema.Types.ObjectId

var notificationSchema = new mongoose.Schema({
  viewed: {
    type: Boolean,
    default: false
  },

  user_from: {
    type: ObjectId,
    ref: 'User'
  },

  user_to: {
    type: ObjectId,
    ref: 'User'
  },

  comment_from: {
    type: ObjectId,
    ref: 'Comment'
  },

  comment_to: {
    type: ObjectId,
    ref: 'Comment'
  },

  post_id: {
    type: ObjectId,
    ref: 'Post'
  },

  updated: {
    type: Date, 
    default: Date.now
  }
})

notificationSchema.methods.getType = function() {
  if (this.post_id == null) {
    return 'user'
  }
  if (this.comment_to == null) {
    return 'comment'
  }
  return 'reply'
}

module.exports = mongoose.model('Notification', notificationSchema)
