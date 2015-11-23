(function() {
  angular
    .module('TasteOfApp')
    .factory('PostService', function($http) {

      return {
        loadPost: function(user, page, amount, callback) {
          $http({
            method: 'POST',
            url: '/api/post/all',
            data: {
              'user_id': user._id,
              'page': page,
              'amount': amount
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
        },

        sendRecipe: function(user, recipeName, ingredients, steps, callback) {
          $http({
            method: 'POST',
            url: '/api/post/new/recipe',
            data: {
              'user_id': user._id,
              'type': 'recipe',
              'recipeName': recipeName,
              'ingredients': ingredients,
              'steps': steps
            }
          }).success(callback)
        },

        loadPostById: function(userId, postId, callback) {
          $http({
            method: 'POST',
            url: '/api/post/find/' + postId,
            data: {
              user_id: userId
            }
          }).success(function(response) {
            callback(response)
          })
        }
      }
    })
})()
