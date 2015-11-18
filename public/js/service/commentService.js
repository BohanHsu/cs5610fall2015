(function() {
  angular
    .module('TasteOfApp')
    .factory('CommentService', function($http, $rootScope) {

      return {
        getCommentForType: function(type, objectId, callback) {
          $http({
            method: 'POST',
            url: '/api/comment/all/' + type + '/' + objectId,
            data: {
              user_id: $rootScope.user._id
            }
          }).success(function(response) {
            callback(response)
          })
        },

        addNewCommentForType: function(type, objectId, content, commentId, callback) {
          $http({
            method: 'POST',
            url: '/api/comment/new/' + type + '/' + objectId,
            data: {
              user_id: $rootScope.user._id,
              content: content,
              comment_id: commentId
            }
          }).success(function(response) {
            callback(response)
          })
        }
      }
    })
})()
