(function() {
  angular
    .module('TasteOfApp')
    .controller('NotificationController', function($scope, $rootScope, $location, NotificationService) {
      $scope.user = $rootScope.user
      $scope.myNotifications = []

      function loadMyNotification(callback) {
        NotificationService.myNotifications($scope.user._id, function(notifications) {
          notifications.forEach(function(ele, idx, arr) {
            setNotificationType(ele)
          })
          $scope.myNotifications = notifications
          if (callback) {
            callback()
          }
        })
      }

      loadMyNotification()

      $scope.trimStr = function(str) {
        return Util.leftMostNChars(10, str)
      }

      $scope.viewNotification = function(notification) {
        NotificationService.readNotification($scope.user._id, notification._id, function(response) {
          loadMyNotification(function() {
            if (notification.type == 'user') {
              var userId = notification.user_to
              $location.path('/user/' + userId + '/comment/' + notification.comment_from._id)
            } else {
              var postId = notification.post_id._id
              $location.path('/post/' + postId + '/comment/' + notification.comment_from._id)
            }
          })
        })

      }

      function setNotificationType(notification) {
        if (notification.post_id == null) {
          notification.type = 'user'
          return
        }
        if (notification.comment_to == null) {
          notification.type = 'comment'
          return
        }
        notification.type = 'reply'
      }

    })
})()
