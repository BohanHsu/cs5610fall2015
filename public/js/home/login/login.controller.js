(function() {
  angular
    .module('TasteOfApp')
    .controller('LoginController', function($scope, $rootScope, $location, LoginService) {
      $scope.login = function() {
        console.log($scope.username)
        console.log($scope.password)
        
        LoginService.login($scope.username, $scope.password, function (response) {
          console.log(response)
        })
      }
    })
})()
