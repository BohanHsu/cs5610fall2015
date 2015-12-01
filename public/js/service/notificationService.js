(function() {
  angular
    .module('TasteOfApp')
    .factory('NotificationService', function($http, $rootScope) {
      return {
        readNotification: function(userId, notificationId, callback) {
          $http({
            method: 'POST',
            url: '/api/notification/readnotification/' + notificationId,
            data: {
              user_id: userId
            }
          }).success(function(response) {
            callback(response)
          })
        },

        myNotifications: function(userId, callback) {
          $http({
            method: 'POST',
            url: '/api/notification/mynotification',
            data: {
              user_id: userId
            }
          }).success(function(response) {
            callback(response.notifications)
          })
        }
      }
    })
})()

