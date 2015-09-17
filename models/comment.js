var mongoose = require('mongoose')

var commentSchema = new mongoose.Schema({
  content: 'string'
})

module.exports = mongoose.model('Comment', commentSchema)
