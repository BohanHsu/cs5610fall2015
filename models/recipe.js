var mongoose = require('mongoose')
var Schema = mongoose.Schema

var recipeSchema = mongoose.Schema({
  ingredients: {
    type: []
  },

  steps: {
    type: []
  }
})

module.exports = mongoose.model('Recipe', recipeSchema)
