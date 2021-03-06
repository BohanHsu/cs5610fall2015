(function() {
  angular
    .module('FormBuilderApp')
    .factory('FormService', FormService)

    function FormService($q, $http) {

      var service = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findAllFormsForUser: findAllFormsForUser
      }

      return service

      function createFormForUser(userId, form) {
        var defer = $q.defer()

        $http({
          method: 'POST',
          url: '/api/assignment/user/' + userId + '/form',
          data: {
            'form': form
          }
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function findAllFormsForUser(userId) {
        var defer = $q.defer()

        $http({
          method: 'GET',
          url: '/api/assignment/user/' + userId + '/form'
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function deleteFormById(formId) {
        var defer = $q.defer()

        $http({
          method: 'DELETE',
          url: '/api/assignment/form/' + formId
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }

      function updateFormById(formId, newForm) {
        var defer = $q.defer()

        $http({
          method: 'PUT',
          url: '/api/assignment/form/' + formId,
          data: {
            form: newForm
          }
        }).success(function (response) {
          defer.resolve(response)
        })

        return defer.promise
      }
    }

})()
