(function() {
  angular
    .module('FormBuilderApp')
    .factory('UserService', UserService)

    function UserService($http, $q) {

      var service = {
        findUserByUsernameAndPassword: findUserByUsernameAndPassword,
        findAllUsers: findAllUsers,
        createUser: createUser,
        deleteUserById: deleteUserById,
        updateUser: updateUser
      }
      return service

      function findUserByUsernameAndPassword(username, password) {
        var defer = $q.defer()
        $http({
          method: 'GET',
          url: '/api/assignment/user?username=' + username + '&password=' + password
        }).success(function(response) {
          defer.resolve(response)
        })
        return defer.promise
      }

      function findAllUsers() {
        var defer = $q.defer()
        $http({
          method: 'GET',
          url: '/api/assignment/user'
        }).success(function(response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function createUser(user) {
        var defer = $q.defer()

        user.id = Guid.create(user).value

        $http({
           method: 'POST',
           url: '/api/assignment/user',
           data: {
             user: user
           }
        }).success(function(response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function deleteUserById(id) {
        var defer = $q.defer()

        $http({
           method: 'DELETE',
           url: '/api/assignment/user/' + id
        }).success(function(response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function updateUser(id, newUser) {
        var defer = $q.defer()

        $http({
           method: 'PUT',
           url: '/api/assignment/user/' + id,
           data: {
             user: newUser
           }
        }).success(function(response) {
          defer.resolve(response)
        })

        return defer.promise
      }
    }
})()
