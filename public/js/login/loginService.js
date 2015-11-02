(function() {
  angular
    .module('TasteOfApp')
    .factory('LoginService', function($http) {
      return {
        login: login,
      }

      function login(username, password, callback) {
        $http({
          method: 'POST',
          url: '/login',
          data: $.param({
            username: username,
            password: password
          }),
          dataType: 'json',
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).success(function(response){
          return callback(response)
        })
        return null
      }
    })
})()
