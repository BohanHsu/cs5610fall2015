var Q = require('q')

module.exports = function(db) {
  var mongoose = db
  var ObjectId = mongoose.Types.ObjectId

  var userModelSchema = mongoose.Schema({
    username: {
      type: String
    },

    password: {
      type: String
    },

    firstName: {
      type: String
    },

    lastName: {
      type: String
    }

  }, {
    collection: 'cs5610.assignment.user'
  })

  var UserModel = db.model('UserModel', userModelSchema)
  
  function create(user) {
    var newUser = new UserModel()
    var deferred = Q.defer()
    newUser.username = user.username
    newUser.password = user.password
    newUser.firstName = user.firstName
    newUser.lastName = user.lastName
    newUser.save(function(err) {
      if (err)
        console.log(err)
      deferred.resolve(newUser)
    })
    return deferred.promise
  }

  function findAll() {
    var deferred = Q.defer()
    UserModel.find({}).exec(function(err, users) {
      deferred.resolve(users)
    })
    return deferred.promise
  }

  function findById(id) {
    var deferred = Q.defer()
    UserModel.find({'_id': (id)}).exec(function(err, users) {
      console.log(err)
      deferred.resolve(users[0])
    })
    return deferred.promise
  }

  function update(id, attrs) {
    var deferred = Q.defer()
    UserModel.findById(id, function(err, user) {
      for (var k in attrs) {
        user[k] = attrs[k]
      }
      user.save(function(user) {
        deferred.resolve(user)
      })
    })
    return deferred.promise
  }

  function deletef(id) {
    var deferred = Q.defer()
    UserModel.findById(id).remove().exec(function(user) {
      deferred.resolve(user)
    })
    return deferred.promise
  }

  function findUserByName(username) {
    var deferred = Q.defer()
    UserModel.find({'username': username}).exec(function(err, users) {
      if (!err) {
        deferred.resolve(users[0])
      }
    })
    return deferred.promise
  }

  function findUserByCredentials(password) {
    var deferred = Q.defer()
    var foundUser = null
    UserModel.find({'password': password}).exec(function(err, users) {
      if (!err) {
        deferred.resolve(users[0])
      }
    })
    return deferred.promise
  }

  function removeAll() {
    var deferred = Q.defer()
    UserModel.find({}).remove(function() {
      deferred.resolve()
    })
    return deferred.promise
  }

  return {
    Create: create,
    FindAll: findAll,
    FindById: findById,
    Update: update,
    Delete: deletef,
    findUserByName: findUserByName,
    findUserByCredentials: findUserByCredentials,
    removeAll: removeAll
  }
}
