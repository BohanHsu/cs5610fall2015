(function() {
  angular
    .module('TasteOfApp')
    .factory('PostService', function($http) {

      return {
        loadPost: function(user) {
        },

        sendPost: function(user, post, callback) {
          $http({
            method: 'POST',
            url: '/api/post/new',
            data: {
              'user_id': user._id,
              'type': 'tweet',
              'tweet': post
            }
          }).success(callback)
        }
      }
    })
})()
