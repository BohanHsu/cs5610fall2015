(function() {
  angular
    .module('TasteOfApp')
    .config(function($routeProvider){
      $routeProvider
        .when('/search',
              {
                templateUrl: '/users/search.view'
              })
        .when('/:id',
              {
                templateUrl: '/users/details.view'
                //controller: 'DetailsController'
              })
        .otherwise('/search')
    })

})()
