(function() {
  angular
    .module('FormBuilderApp')
    .controller('ProfileController', ProfileController)

    function ProfileController($scope, $rootScope, $location, UserService) {
      var user = $rootScope.user
      console.log(user)
      if (user) {
        if (user.username) {
          $scope.username = user.username
        }
        if (user.password) {
          $scope.password = user.password
        }
        if (user.firstName) {
          $scope.firstName = user.firstName
        }
        if (user.lastName) {
          $scope.lastName = user.lastName
        }
        if (user.email) {
          $scope.email = user.email
        }
      }

      function update() {
        console.log('call update')
        var newUser = {
          username: $scope.username,
          password: $scope.password,
          firstName: $scope.firstName,
          lastName: $scope.lastName,
          email: $scope.email
        }

        UserService.updateUser(user.id, newUser, function(user) {
          console.log(user)
          $rootScope.user = user
          //$location.path('/profile')
        })
      }

      $scope.update = update
    }
})()
