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
          if (user.username === username && user.password === password) {
            return callback(user)
          }
        })
        return callback(null)
      }

      function findAllUsers(callback) {
        return callback(currentUsers)
      }

      function createUser(user, callback) {
        user.id = Guid.create(user).value
        return callback(currentUsers.push(user))
      }

      function deleteUserById(id, callback) {
        currentUsers.forEach(function (user, i, arr) {
          if (user.id === id) {
            currentUsers.slice(i, 1)
            return callback(currentUsers)
          }
        })
        return callback(currentUsers)
      }

      function updateUser(id, newUser, callback) {
        currentUsers.forEach(function (user, i, arr) {
          if (user.id === id) {
            for (var key in newUser) {
              user[key] = newUser[key]
            }
            return callback(user)
          }
        })
        return callback(null)
      }
    }

})()
