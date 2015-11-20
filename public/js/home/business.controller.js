(function() {
  angular
  .module('TasteOfApp')
  .controller('BusinessController', function($scope, $rootScope, PostService, CommentService) {
    $scope.user = $rootScope.user
    console.log($scope.user)
  })
})()
