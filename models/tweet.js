var mongoose = require('mongoose')

var tweetSchema = mongoose.Schema({
  content: {
    type: String,
    validate: {
      validator: function(val) {
        return val.length > 0 && val.length <= 280
      },
      message: 'Wrong length'
    }
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = mongoose.model('Tweet', tweetSchema)
