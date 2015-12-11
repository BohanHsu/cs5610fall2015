var mongoose = require('mongoose')
var Schema = mongoose.Schema

var imageSchema = mongoose.Schema({
  path: {
    type: String
  }, 

  data: {
    type: Buffer
  }
})

module.exports = mongoose.model('Image', imageSchema)
