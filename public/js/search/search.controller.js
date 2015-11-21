(function() {
  angular
    .module('TasteOfApp')
    .controller('SearchController', function($scope, $rootScope) {
      $scope.searchFromHeader = function() {
        console.log($scope.searchText)
      }
    })
})()
