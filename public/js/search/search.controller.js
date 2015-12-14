(function() {
  angular
    .module('TasteOfApp')
    .controller('SearchController', function($scope, $rootScope, $location, SearchService, UserService) {
      $scope.followingRelationship = null
      $scope.currentUser = $rootScope.user
      $scope.followingRelationship = {}

      $scope.searchFromHeader = function() {
        SearchService.search($rootScope.user, $scope.searchText, {}, function(response) {
          $rootScope.searchResult = response.result
          $rootScope.lastSearchText = $scope.searchText
          $location.path('/search')
        })
      }

      $scope.searchResult = $rootScope.searchResult
      $scope.searchText = $rootScope.lastSearchText

      $scope.searchFromSearchPage = function() {
        SearchService.search($rootScope.user, $scope.searchText, {}, function(response) {
          $scope.searchResult = response.result
          console.log(response.result)
        })
      }

      $scope.$watch('searchResult', function(newValue, oldValue) {
        queryFollowing()
      })

      $rootScope.$watch('lastSearchText', function(newValue, oldValue) {
        $scope.searchText = newValue
        $scope.searchResult = $rootScope.searchResult
      })

      function queryFollowing() {
        if (!($scope.searchResult && $scope.searchResult.users)) {
          return
        }

        var curUserId = $rootScope.user._id
        var userIds = $scope.searchResult.users.map(function(user) {
          return user._id
        })

        if (userIds.length == 0) {
          return
        }

        UserService.queryFollowing(curUserId, userIds, function(response) {
          console.log(response)
          $scope.followingRelationship = response.result
        })
      }

      $scope.followUser = function(userId) {
        $scope.followingRelationship[userId] = null
        UserService.followingUser($scope.currentUser._id, userId, function(response) {
          if (response.success) {
            $scope.followingRelationship[userId] = true
          }
        })
      }

      $scope.unFollowUser = function(userId) {
        $scope.followingRelationship[userId] = null
        console.log('unfollowl', userId)
        UserService.unFollowingUser($scope.currentUser._id, userId, function(response) {
          if (response.success) {
            $scope.followingRelationship[userId] = false
          }
        })
      }

      $scope.keyEventHandler = function(caller, event) {
        if (caller == 'search.header' && event.keyCode == 13) {
          $scope.searchFromHeader()
        }
        if (caller == 'search.page') {
          $scope.searchFromSearchPage()
        }
      }
    })
})()
