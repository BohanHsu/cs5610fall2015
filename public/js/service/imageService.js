(function() {
  angular
    .module('TasteOfApp')
    .factory('ImageService', function($http) {
      return {
        deleteImage: function(data, callback) {
          $http({
            method: 'POST',
            url: '/api/image/avatar/original/delete',
            'data': data
          }).success(callback)
        },

        cropImage: function(data, callback) {
          $http({
            method: 'POST',
            url: '/api/image/avatar/crop',
            'data': data,
          }).success(callback)
        }

      }

    })
})()
