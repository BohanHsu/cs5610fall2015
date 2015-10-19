(function() {
  angular
    .module('FormBuilderApp')
    .controller('FormController', FormController)

    function FormController($scope, $rootScope, FormService) {
      $scope.form = {}
      $scope.form.name = 'hehe;'

      function loadAllFormsForUser() {
        var userId = null
        if ($rootScope.user) {
          userId = $rootScope.user
        }
        FormService.findAllFormsForUser(userId, function(forms) {
          console.log('found forms:', forms)
          $scope.forms = forms
        })
      }
      loadAllFormsForUser()

      function addForm() {
        console.log('add form')
        var userId = null
        if ($rootScope.user) {
          userId = $rootScope.user
        }
        var newForm = {name: $scope.name}
        FormService.createFormForUser(userId, newForm, function(form) {
          loadAllFormsForUser()
          $scope.form = form
          console.log($scope.form)
        })
      }
      $scope.addForm = addForm

      function updateForm() {
        var newForm = {name: $scope.form.name, formId: $scope.form.formId, userId: $scope.form.userId}
        //var newForm = $scope.form
        console.log(newForm)
        FormService.updateFormById($scope.form.formId, newForm, function(form) {
          $scope.form = form
          loadAllFormsForUser()
        })
      }
      $scope.updateForm = updateForm

      function deleteForm(formId) {
        FormService.deleteFormById(formId, function (forms) {
          loadAllFormsForUser()
        })
      }
      $scope.deleteForm = deleteForm

      function selectForm(formId) {
        //currentSelectedFormId = formId
        $scope.forms.forEach(function (form, i, arr) {
          if (form.formId === formId) {
            $scope.form = form
          }
        })
      }
    }
})()
