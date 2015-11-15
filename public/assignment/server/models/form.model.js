var uuid = require('node-uuid')
module.exports = function() {
  var forms = require('./form.mock.json')

  function findFieldByFormIdAndFieldId(formId, fieldId) {
    var fields = findById(formId)['fields']
    var foundField = null

    fields.forEach(function(ele, idx, arr) {
      if (ele['id'] == fieldId) {
        foundField = ele
      }
    })

    return foundField
  }

  function findById(id) {
    var foundForm = null
    forms.forEach(function(ele, idx, arr) {
      if (ele['id'] == id) {
        foundForm = ele
      }
    })
    return foundForm
  }

  return {
    Create: function(form) {
      form['id'] = uuid.v1()
      forms.push(form)
    },

    FindAll: function() {
      return forms
    },

    FindById: findById,

    Update: function(id, attrs) {
      var form = findById(id)
      for (var k in attrs) {
        form[k] = attrs[k]
      }
    },

    Delete: function(id) {
      var index = null
      forms.forEach(function(ele, idx, arr) {
        if (ele['id'] == id) {
          index = idx
        }
      })


      forms.splice(index, 1)
    },

    findFormByTitle: function(title) {
      var foundForm = null

      forms.forEach(function(ele, idx, arr) {
        if (ele['title'] == title) {
          foundForm = ele
        }
      })

      return foundForm
    }, 
    
    findByUserId: function(userId) {
      var foundForms = []

      forms.forEach(function(ele, idx, arr) {
        if (ele['userId'] == userId) {
          foundForms.push(ele)
        }
      })

      return foundForms
    },

    findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,

    deleteFieldByFormIdAndFieldId: function(formId, fieldId) {
      var fields = findById(formId)['fields']
      var index = 0

      fields.forEach(function(ele, idx, arr) {
        if (ele['id'] == fieldId) {
          index = idx
        }
      })

      fields.splice(index, 1)
    },

    addFieldToForm: function(formId, field) {
      var fields = findById(formId)['fields']
      field['id'] = uuid.v1()
      fields.push(field)
    },

    updateFieldInForm: function(formId, fieldId, attrs) {
      var field = findFieldByFormIdAndFieldId(formId, fieldId)
      for (var k in attrs) {
        field[k] = attrs[k]
      }
    },

    sortFieldInForm: function(formId, oldIndex, newIndex) {
      var fields = findById(formId)['fields']
      var field = fields[oldIndex]
      fields.splice(oldIndex, 1)
      fields.splice(newIndex, 0, field)
    }
  }
}
