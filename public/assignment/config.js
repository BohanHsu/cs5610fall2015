(function() {
  angular
    .module('FormBuilderApp')
    .config(function($routeProvider) {
      $routeProvider
        .when('/home', 
              {
                templateUrl: './home/home.view.html'
              })
        .when('/login', 
              {
                templateUrl: './login/login.view.html',
                controller: 'LoginController'

              })
        .otherwise({
          redirectTo: 'home'
        })
    })
})()
