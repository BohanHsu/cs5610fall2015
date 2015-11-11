(function() {
  angular
    .module('FormBuilderApp')
    .controller('FieldController', FieldController)

    function FieldController($scope, $rootScope, $routeParams, FormService) {
      console.log('hehe')
      $scope.model = {}
      $scope.model.fieldType = null
      $scope.model.selections = [
        'Single Line Text Field',
        'Multi Line Text Field',
        'Date Field',
        'Dropdown Field',
        'Checkboxes Field',
        'Radio Buttons Field'
      ]
      $scope.formId = $routeParams.formId

      FormService.getFieldsForForm($scope.formId).then(function(response) {
        console.log(response)
        $scope.fields = response
      })

      $scope.fields = [{type: 'TEXT'}]

      $scope.addField = function() {
      }
  
      $scope.items = ['settings', 'home', 'other']
        

      $scope.filedTypeHelper = function(type) {
        if (type == 'TEXT') {
          return 1
        }
        return 1
      }
      
    }
})()
