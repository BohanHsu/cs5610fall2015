(function() {
  angular
    .module('TasteOfApp')
    .factory('PostService', function($http) {

      return {
        loadPost: function(user, callback) {
          $http({
            method: 'POST',
            url: '/api/post/all',
            data: {
              'user_id': user._id
            }
          }).success(callback)
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
          //}).success(function(response) {
          //  if (response.success) {
          //    tweet_dict = {}
          //    response.tweets.forEach(function(element) {
          //      tweet_dict[element._id] = element
          //    })
          //    response['tweet_dict'] = tweet_dict
          //    callback(response)
          //  } else {
          //    callback(response)
          //  }
          //})
        }
      }
    })
})()
