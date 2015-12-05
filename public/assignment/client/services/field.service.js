(function() {
  angular
    .module('FormBuilderApp')
    .factory('FieldService', FieldService)

    function FieldService($q, $http) {
      console.log('field service online')
      return {
        createFieldForForm: createFieldForForm,
        getFieldsForForm: getFieldsForForm,
        getFieldForForm: getFieldForForm,
        deleteFieldFromForm: deleteFieldFromForm,
        updateField: updateField,
        sortField: sortField
      }

      function createFieldForForm(formId, field) {
        var defer = $q.defer()

        $http({
          method: 'POST',
          url: '/api/assignment/form/' + formId + '/field',
          data: {
            field: field
          }
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function getFieldsForForm(formId) {
        var defer = $q.defer()

        $http({
          method: 'GET',
          url: '/api/assignment/form/' + formId + '/field'
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function getFieldForForm(formId, fieldId) {
        var defer = $q.defer()

        $http({
          method: 'GET',
          url: '/api/assignment/form/' + formId + '/field/' + fieldId
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function deleteFieldFromForm(formId, fieldId) {
        var defer = $q.defer()

        $http({
          method: 'DELETE',
          url: '/api/assignment/form/' + formId + '/field/' + fieldId
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function updateField(formId, fieldId, field) {
        var defer = $q.defer()

        $http({
          method: 'PUT',
          url: '/api/assignment/form/' + formId + '/field/' + fieldId,
          data: {
            field: field
          }
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function sortField(formId, oldIndex, newIndex) {
        var defer = $q.defer()

        $http({
          method: 'PUT',
          url: '/api/assignment/form/' + formId + '/sort',
          data: {
            oldIndex: oldIndex,
            newIndex: newIndex
          }
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }
    }
})()
