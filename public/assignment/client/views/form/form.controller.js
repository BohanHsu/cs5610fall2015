(function() {
  angular
    .module('FormBuilderApp')
    .controller('FormController', FormController)

    function FormController($scope, $rootScope, FormService) {
      $scope.form = {}

      function loadAllFormsForUser() {
        var userId = null
        if ($rootScope.user) {
          userId = $rootScope.user.id
        }
        console.log(userId)
        FormService.findAllFormsForUser(userId).then(function(forms) {
          console.log(forms)
          $scope.forms = forms
        })
      }

      loadAllFormsForUser()

      function addForm() {
        var userId = null
        if ($rootScope.user) {
          userId = $rootScope.user.id
        }
        var newForm = $scope.form
        FormService.createFormForUser(userId, newForm).then(function(form) {
          //console.log(form)
          loadAllFormsForUser()
        })
      }
      $scope.addForm = addForm

      function updateForm() {
        var newForm = {}
        for (var key in $scope.form) {
          newForm[key] = $scope.form[key]
        }
        console.log(newForm)
        FormService.updateFormById($scope.form.id, newForm).then(function(form) {
          $scope.form = form
          loadAllFormsForUser()
        })
      }
      $scope.updateForm = updateForm

      function deleteForm(formIndex) {
        FormService.deleteFormById($scope.forms[formIndex].id).then(function (forms) {
          loadAllFormsForUser()
        })
      }
      $scope.deleteForm = deleteForm

      function selectForm(formIndex) {
        $scope.form = {}
        for (var key in $scope.forms[formIndex]) {
          $scope.form[key] = $scope.forms[formIndex][key]
        }
      }
      $scope.selectForm = selectForm
    }
})()
