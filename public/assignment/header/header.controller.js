(function() {
  angular
    .module('FormBuilderApp')
    .controller('HeaderController', HeaderController)

    function HeaderController($scope, $location) {
      console.log($location)
      console.log($location.path())
      $scope.$location = $location
    }
})()
