(function() {
  angular
    .module('TasteOfApp')
    .config(function($routeProvider){
      $routeProvider
        .when('/visitor',
              {
                templateUrl: 'home/visitor.view'
              })
        .when('/timeline',
              {
                templateUrl: 'home/timeline.view',
              })
        .otherwise('/timeline')
    })
})()
