var mongoose = require('mongoose')
var Schema = mongoose.Schema

var postSchema = mongoose.Schema({
  post_type: {
    type: String,
    validate: {
      validator: function(val) {
      
        var index = ['tweet', 'forward', 'recipe'].indexOf(val)
        console.log(index)
        return index != -1
      },
      message: 'Wrong type!'
    }
  },

  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  tweet_id: {
    type: Schema.Types.ObjectId,
    ref: 'Tweet',
    required: false
  },

  //recipe_id: {
  //  type: Number,
  //  ref: 'Recipe',
  //  required: false
  //},

  post_id: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
    required: false
  },

  updated: {
    type: Date, 
    default: Date.now
  }

})

postSchema.methods.create = function(user_id, type, callback) {
  console.log('not implemented')
}

module.exports = mongoose.model('Post', postSchema)
