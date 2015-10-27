(function() {
  angular
    .module('TasteOfApp')
    .factory('SignupService', function($http) {
      return {
        userSignUp: userSignUp
      }

      function userSignUp(data, callback) {
        $http({
          method: 'POST',
          url: '/login/signup',
          'data': data
        }).success(callback)
      }

    })
})()
