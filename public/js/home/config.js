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
        .when('/business',
              {
                templateUrl: 'home/business.view',
              })
        .when('/search',
              {
                templateUrl: 'home/search.view',
              })
        .when('/user/:id',
              {
                templateUrl: 'home/user.view',
              })
        .when('/post/:id',
              {
                templateUrl: 'home/user.view',
              })
        .otherwise('/visitor')
    })

})()
