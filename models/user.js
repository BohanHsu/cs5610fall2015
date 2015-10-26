var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')

var userSchema = mongoose.Schema({
  local: {
    username: 'string',
    password: 'string',
    email: 'string',
    firstname: 'string',
    lastname: 'string',
    imageUrl: 'string'
  },

  facebook: {
    id: 'string',
    token: 'string',
    email: 'string',
    name: 'string'
  },
  twitter: {
    id: 'string',
    token: 'string',
    displayName: 'string',
    username: 'string'
  },
  google: {
    id: 'string',
    token: 'string',
    email: 'string',
    name: 'string'
  }

})

userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.local.password)
}

module.exports = mongoose.model('User', userSchema)
