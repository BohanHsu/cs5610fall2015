(function() {
  angular
    .module('FormBuilderApp')
    .controller('RegisterController', RegisterController)

    function RegisterController($scope, $rootScope, $location, UserService) {
      function login() {
        var user = {
          username: $scope.username,
          password: $scope.password,
          email: $scope.email
        }
        console.log(user)
        UserService.createUser(user, function (user) {
          if (user) {
            $rootScope.user = user
            $location.path('/profile')
          }
        })
      }

      $scope.login = login
      $scope.register = login
    }
})()
