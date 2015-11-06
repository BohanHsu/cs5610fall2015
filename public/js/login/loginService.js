(function() {
  angular
    .module('TasteOfApp')
    .factory('LoginService', function($http) {
      return {
        login: login,
      }

      function login(username, password, rememberMe, callback) {
        $http({
          method: 'POST',
          url: '/login',
          data: $.param({
            username: username,
            password: password,
            rememberMe: rememberMe
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
