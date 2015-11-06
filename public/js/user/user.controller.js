(function() {
  angular
    .module('TasteOfApp')
    .controller('UserController', function($scope, UserService) {
      $scope.searchResult = []

      $scope.search = function() {
        UserService.search($scope.searchText, function(response) {
          if (response.success) {
            $scope.searchResult = response.users
          }
        })
      }
    })
})()
