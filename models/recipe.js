var mongoose = require('mongoose')
var Schema = mongoose.Schema

var recipeSchema = mongoose.Schema({
  recipeName: {
    type: String
  },

  ingredients: {
    type: []
  },

  steps: {
    type: []
  },

  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
