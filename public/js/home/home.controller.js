(function() {
  angular
    .module('TasteOfApp')
    .controller('HomeController', function($scope, $rootScope, $location, LoginService) {
      function goVisitor() {
        $location.path('/visitor')
      }

      function goTimeline() {
        if ($rootScope.user) {
          if ($rootScope.user.user_type == 'individual') {
            $location.path('/timeline')
          } else if ($rootScope.user.user_type == 'enterprise') {
            $location.path('/business')
          }
        } else {
          $location.path('/visitor')
        }
      }

      $rootScope.$watch('user', function(newValue, oldValue) {
        if (newValue != null && oldValue != newValue) {
          goTimeline()
        }
      })

      if (!$rootScope.user) {
        goVisitor()
      } else {
        goTimeline()
      }
    })
})()
