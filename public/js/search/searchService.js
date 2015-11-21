(function() {
  angular
    .module
    .factory('SearchService', function($http) {
      return {
        search: function(user, searchText, params) {
          $http({
            method: 'POST',
            url: '/'
          })
        }
      }
    })
})()
