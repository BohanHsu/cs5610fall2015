(function() {

  function idHelper(array) {
    if (array) {
      array.forEach(function(ele, idx, arr) {
        ele['id'] = ele['_id']
      })
    }
  }

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
        FormService.findAllFormsForUser(userId).then(function(forms) {
          idHelper(forms)
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
          loadAllFormsForUser()
        })
      }
      $scope.addForm = addForm

      function updateForm() {
        var newForm = {}
        for (var key in $scope.form) {
          newForm[key] = $scope.form[key]
        }
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
