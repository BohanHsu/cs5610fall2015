(function() {
  angular
    .module('FormBuilderApp')
    .config(function($routeProvider) {
      $routeProvider
        .when('/home', 
              {
                templateUrl: './home/home.view.html'
              })
        .otherwise({
          redirectTo: 'home'
        })
    })
})()
