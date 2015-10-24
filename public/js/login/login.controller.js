(function() {
  angular
    .module('TasteOfApp')
    .controller('LoginController', function($scope, $rootScope, LoginService) {

      $scope.init = function(user) {
        $scope.err = null
        $scope.user = user
      }

      $scope.login = function() {
        
        LoginService.login($scope.username, $scope.password, function (response) {
          if (response.success) {
            setUser(response.user)
            // stupid hack, angular can't close the damn modal???
            $('#loginModal').modal('toggle')
          } else {
            $scope.err = response['err'] + '!'
          }
        })
      }

      var setUser = function(user) {
        $scope.user = user
        $rootScope.user = user
      }
      $scope.setUser = setUser

      $scope.isLoggedIn = function() {
        return $rootScope.user != null
      }
    })
})()
