(function() {
  angular
    .module('FormBuilderApp')
    .factory('FormService', FormService)

    function FormService() {
      var forms = []

      var service = {
        createFormForUser: createFormForUser,
        deleteFormById: deleteFormById,
        updateFormById: updateFormById,
        findAllFormsForUser: findAllFormsForUser
      }

      return service

      function createFormForUser(userId, form, callback) {
        form.formId = Guid.create(form).value
        form.userId = userId
        forms.push(form)
        return callback(form)
      }

      function findAllFormsForUser(userId, callback) {
        var formsForUser = []
        forms.forEach(function (form, i, arr) {
          if (form.userId === userId) {
            formsForUser.push(form)
          }
        })
        return callback(formsForUser)
      }

      function deleteFormById(formId, callback) {
        forms.forEach(function (form, i, arr) {
          if (form.formId === formId) {
            forms.slice(i, 1)
            return callback(forms)
          }
        })
        return callback(forms)
      }

      function updateFormById(formId, newForm, callback) {
        var updatedForm = null
        forms.forEach(function (form, i, arr) {
          if (form.formId === formId) {
            for (var key in newForm) {
              form[key] = newForm[key]
            }
            updatedForm = form
          }
        })
        return callback(updatedForm)
      }
    }
})()
