(function() {
  angular
  .module('TasteOfApp')
  .directive('showTab', function() {
    return {
      link: function (scope, element, attrs) {
        element.click(function(e) {
          e.preventDefault()
          $(element).tab('show')
        })
      }
    }
  })
  .controller('DetailsController', function($scope, $routeParams, UserService) {
    console.log($routeParams['id'])
    //$scope.detailUser = UserService.findById($routeParams['id'], function(res))
    UserService.userDetails($routeParams['id'], function(response) {
      console.log(response)
      $scope.detailUser = response.user
      $scope.posts = response.posts
      $scope.followings = response.followings
      $scope.followers = response.followBys
    })
    //console.log($scope.detailUser)
  })
})()
