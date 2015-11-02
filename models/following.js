var mongoose = require('mongoose')
var Schema = mongoose.Schema

var followingSchema = mongoose.Schema({
  follow_by: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  following: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Following', followingSchema)
