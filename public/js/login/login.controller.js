(function() {
  angular
    .module('TasteOfApp')
    .controller('LoginController', function($scope, $rootScope, LoginService) {

      $scope.init = function(user) {
        $scope.err = null
        setUser(user)
      }

      $scope.login = function() {
        
        console.log($scope.rememberMe)
        LoginService.login($scope.username, $scope.password, $scope.rememberMe, function (response) {
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
