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

        search: function(searchText, callback) {
          $http({
            method: 'POST',
            url: '/api/user/search',
            data: {
              searchText: searchText
            }
          }).success(callback)
        }
      }
    })
})()
