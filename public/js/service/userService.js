(function() {
  angular
    .module('TasteOfApp')
    .factory('UserService', function($http) {
      return {
        userDetails: function(id, callback) {
          $http({
            method: 'POST',
            url: '/api/user/userDetails',
            data: {
              id: id
            }
          }).success(callback)
        },

        updateUser: function(userId, updateAttrs, callback) {
          $http({
            method: 'POST',
            url: '/api/user/update/' + userId,
            data: {
              user_id: userId,
              updateAttrs: updateAttrs
            }
          }).success(function(response) {
            callback(response)
          })
        },

        search: function(searchText, callback) {
          $http({
            method: 'POST',
            url: '/api/user/search',
            data: {
              searchText: searchText
            }
          }).success(callback)
        },

        queryFollowing: function(curUserId, userIds, callback) {
          $http({
            method: 'POST',
            url: '/api/user/following/query',
            data: {
              user_id: curUserId,
              userIds: userIds
            }
          }).success(function(response) {
            callback(response)
          })
        },

        followingUser: function(curUserId, userId, callback) {
          $http({
            method: 'POST',
            url: '/api/user/following/new',
            data: {
              user_id: curUserId,
              followingUserId: userId
            }
          }).success(function(response) {
            callback(response)
          })
        },

        unFollowingUser: function(curUserId, userId, callback) {
          $http({
            method: 'POST',
            url: '/api/user/following/delete',
            data: {
              user_id: curUserId,
              followingUserId: userId
            }
          }).success(function(response) {
            callback(response)
          })
        }
      }
    })
})()
