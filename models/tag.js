var mongoose = require('mongoose')

var tagSchema = mongoose.Schema({
  tag: String
})

module.exports = mongoose.model('Tag', tagSchema)
