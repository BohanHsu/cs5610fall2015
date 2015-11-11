(function() {
  angular
    .module('FormBuilderApp')
    .controller('LoginController', LoginController)

    function LoginController($scope, $rootScope, $location, UserService) {
      function login() {
        UserService.findUserByUsernameAndPassword($scope.username, $scope.password).then(function (user) {
          if (user) {
            console.log(user)
            $rootScope.user = user
            $location.path('/profile')
          } else {
          }
        })
      }
      $scope.login = login
    }
})()
