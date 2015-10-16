(function() {
  angular
    .module('FormBuilderApp')
    .factory('FormService', FormService)

    function FormService() {
      var forms = []

      function createFormForUser(userId, form, callback) {
        form.id = Guid.create(form).value
        form.userid = userId
        forms.push(form)
        return callback(form)
      }

      function deleteFormById(formId, callback) {
        forms.forEach(function (form, i, arr) {
          if (form.id === formId) {
            forms.slice(i, 1)
            return callback(forms)
          }
        })
        return callback(forms)
      }

      function updateFormById(formId, newForm, callback) {
        forms.forEach(function (form, i, arr) {
          if (form.id === formId) {
            for (var key in newForm) {
              form[key] = newForm[key]
            }
            return callback(form)
          }
        })
        return callback(form)
      }
    }
})()
