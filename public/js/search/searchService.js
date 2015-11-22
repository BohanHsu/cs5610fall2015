(function() {
  angular
    .module('TasteOfApp')
    .factory('SearchService', function($http) {
      return {
        search: search
      }

      function search(user, searchText, params, callback) {
        var data = params || {}
        data.searchText = searchText
        data.user_id = user._id
        $http({
          method: 'POST',
          url: '/api/search',
          'data': data
        }).success(function(response) {
          callback(response)
        })
      }
    })
})()
