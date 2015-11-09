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
        newForm = {}
        form.formId = Guid.create(form).value
        for (var key in form) {
          newForm[key] = form[key]
        }
        newForm.userId = userId
        forms.push(newForm)
        return callback(newForm)
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
        var index = -1
        forms.forEach(function (form, i, arr) {
          if (form.formId === formId) {
            index = i
          }
        })
        forms.splice(index, 1)
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
