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
  .controller('DetailsController', function($scope, $rootScope, $routeParams, UserService) {
    var copiedDetailUser = null

    $scope.user = $rootScope.user

    UserService.userDetails($routeParams['id'], function(response) {
      console.log(response)
      $scope.detailUser = response.user
      $scope.posts = response.posts
      $scope.followings = response.followings
      $scope.followers = response.followBys

      if ($scope.detailUser._id != $scope.user._id) {
        var ids = [$scope.detailUser._id]
        UserService.queryFollowing($scope.user._id, ids, function(response) {
          console.log(response)
          $scope.isFollowing = response.result[$scope.detailUser._id]
        })
      }
    })

    $scope.isChangeingProfile = false

    $scope.setChangeProfile = function(value) {
      if (value) {
        copiedDetailUser = JSON.parse(JSON.stringify($scope.detailUser))
      }

      if ($scope.detailUser._id == $scope.user._id) {
        if ($scope.isChangeingProfile && !value) {
          $scope.detailUser = copiedDetailUser
        }
        $scope.isChangeingProfile = value
      }
    }
    
    $scope.followUser = function(userId) {
      $scope.isFollowing = null
      UserService.followingUser($scope.user._id, userId, function(response) {
        if (response.success) {
          $scope.isFollowing = true
        }
      })
    }

    $scope.unFollowUser = function(userId) {
      $scope.isFollowing = null
      UserService.unFollowingUser($scope.user._id, userId, function(response) {
        if (response.success) {
          $scope.isFollowing = false
        }
      })
    }

  })
})()
