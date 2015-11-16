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
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
