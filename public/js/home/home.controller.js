(function() {
  angular
    .module('TasteOfApp')
    .controller('HomeController', function($scope, $rootScope, $location, LoginService) {
      function goVisitor() {
        $location.path('/visitor')
      }

      function goTimeline() {
        if ($rootScope.user) {
          $location.path('/timeline')
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