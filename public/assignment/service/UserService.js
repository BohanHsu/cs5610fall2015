(function() {
  angular
    .module('FormBuilderApp')
    .factory('UserService', UserService)

    function UserService() {
      var currentUsers = []

      var service = {
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
      }
      return service

      function findUserByUsernameAndPassword(username, password, callback) {
        currentUsers.forEach(function (user, index, arr) {
          var matchUser = null
          if (user.username === username && user.password === password) {
            matchUser = user
          }
        })
        return callback(matchUser)
      }

      function findAllUsers(callback) {
        return callback(currentUsers)
      }

      function createUser(user, callback) {
        user.id = Guid.create(user).value
        currentUsers.push(user)
        return callback(user)
      }

      function deleteUserById(id, callback) {
        currentUsers.forEach(function (user, i, arr) {
          if (user.id === id) {
            currentUsers.slice(i, 1)
          }
        })
        return callback(currentUsers)
      }

      function updateUser(id, newUser, callback) {
        var updatedUser = null
        currentUsers.forEach(function (user, i, arr) {
          if (user.id === id) {
            for (var key in newUser) {
              user[key] = newUser[key]
            }
            updatedUser = user
          }
        })
        console.log('not found')
        return callback(updatedUser)
      }
    }
})()
