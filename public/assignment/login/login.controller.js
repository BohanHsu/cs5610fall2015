(function() {
  angular
    .module('FormBuilderApp')
    .controller('LoginController', LoginController)

    function LoginController($scope, $rootScope, $location, UserService) {
      function login() {
        UserService.findUserByUsernameAndPassword($scope.username, $scope.password, function (user) {
          if (user) {
            $rootScope.user = user
            console.log(user)
            $location.path('/profile')
          } else {
            console.log(user)
          }
        })
      }
      $scope.login = login
    }
})()
