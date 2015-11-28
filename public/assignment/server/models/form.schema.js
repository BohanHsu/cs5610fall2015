var Q = require('q')

module.exports = function(db) {
  var mongoose = db
  var ObjectId = mongoose.Types.ObjectId
  var fieldModel = require('./field.schema.js')(db)
  var formModelSchema = mongoose.Schema({
    userId: {
      type: mongoose.Schema.ObjectId
    }, 

    title: {
      type: String
    }, 

    fields: {
      type: []
    }
  }, {collection: 'cs5610.assignment.form'})

  var formModel = mongoose.model('fromModel', formModelSchema)

  function create(form) {
    var newForm = new formModel()
    var deferred = Q.defer()
    newForm.userId = form.userId
    newForm.title = form.title
    newForm.save(function(err) {
      if (err)
        console.log(err)

      deferred.resolve(newForm)
    })
    return deferred.promise
  }

  function findAll() {
    var deferred = Q.defer()
    formModel.find({}).exec(function(err, forms) {
      deferred.resolve(forms)
    })
    return deferred.promise
  }

  function findById(id) {
    var deferred = Q.defer()
    formModel.findById(id, function(err, form) {
      deferred.resolve(form)
    })
    return deferred.promise
  }

  function update(id, attrs) {
    var deferred = Q.defer()
    findById(id).then(function(form) {
      for (var k in attrs) {
        form[k] = attrs[k]
      }
      form.save(function(err) {
        deferred.resolve(form)
      })
    })
    return deferred.promise
  }

  function deletef(id) {
    var deferred = Q.defer()
    formModel.find({'_id': id}).remove().exec(function() {
      deferred.resolve()
    })
    return deferred.promise
  }

  function findFormByTitle(title) {
    var deferred = Q.defer()
    formModel.find({'title': title}).exec(function(err, forms) {
      deferred.resolve(forms)
    })
    return deferred.promise
  }

  function findByUserId(userId) {
    var deferred = Q.defer()
    formModel.find({'userId': userId}).exec(function(err, forms) {
      deferred.resolve(forms)
    })
    return deferred.promise
  }

  function findFieldByFormIdAndFieldId(formId, fieldId){
    var deferred = Q.defer()
    findById(formId).then(function(form) {
      var foundField = null
      form.fields.forEach(function(ele, idx, arr) {
        if (ele._id == fieldId) {
          foundField = ele
        }
      })
      deferred.resolve(foundField)
    })
    return deferred.promise
  }

  function addFieldToForm(formId, field) {
    var deferred = Q.defer()
    findById(formId).then(function(form) {
      var newField = new fieldModel()

      newField.label = field.label
      newField.fieldType = field.type
      if (['RADIO', 'CHECKBOX', 'SELECT'].indexOf(newField.fieldType) != -1) {
        newField.options = field.options
      }

      newField.placeholder = field.placeholder
      form.fields.push(newField)
      form.save(function(err) {
        deferred.resolve(form)
      })
    })
    return deferred.promise
  }

  function updateFieldInForm(formId, fieldId, attrs) {
    var deferred = Q.defer()
    findById(formId).then(function(form) {
      var foundField = null
      var fieldIndex = null
      var fields = form.fields
      form.fields.forEach(function(ele, idx, arr) {
        if (ele._id == fieldId) {
          foundField = ele
          fieldIndex = idx
        }
      })

      for (var k in attrs) {
        foundField[k] = attrs[k]
      }

      var newField = new fieldModel()
      newField.label = foundField.label
      newField.fieldType = foundField.fieldType
      newField.options = foundField.options
      newField.placeholder = foundField.placeholder

      form.fields[fieldIndex] = newField
      form.fields = []
      fields.forEach(function(ele, idx, arr) {
        if (idx == fieldIndex) {
          form.fields.push(newField)
        } else {
          form.fields.push(ele)
        }
      })

      form.save(function(err) {
        findById(formId).then(function(form) {
        })
        deferred.resolve(form)
      })
    })
    return deferred.promise
  }

  function deleteFieldByFormIdAndFieldId(formId, fieldId) {
    var deferred = Q.defer()
    findById(formId).then(function(form) {
      var index = null
      if (form.fields) {
        form.fields.forEach(function(ele, idx, arr) {
          if (ele._id == fieldId) {
            index = idx
          }
        })
        form.fields.splice(index, 1)
        form.save(function() {
          deferred.resolve()
        })
      }
    })
    return deferred.promise
  }

  function sortFieldInForm(formId, oldIndex, newIndex) {
    var deferred = Q.defer()
    findById(formId).then(function(form) {
      var fields = form.fields
      var newFields = []
      fields.forEach(function(ele, idx, arr) {
        newFields.push(ele)
      })
      var field = newFields[oldIndex]
      newFields.splice(oldIndex, 1)
      newFields.splice(newIndex, 0, field)
      form.fields = newFields
      form.save(function(err) {
        findById(formId).then(function(form) {
        })
        deferred.resolve(form)
      })
    })
    return deferred.promise
  }

  function removeAll() {
    var deferred = Q.defer()
    formModel.find({}).remove(function() {
      deferred.resolve()
    })
    return deferred.promise
  }

  return {
    Create: create,
    FindAll: findAll,
    FindById: findById,
    Update: update,
    Delete: deletef,
    findFormByTitle: findFormByTitle,
    findByUserId: findByUserId,
    findFieldByFormIdAndFieldId: findFieldByFormIdAndFieldId,
    addFieldToForm: addFieldToForm,
    updateFieldInForm: updateFieldInForm,
    sortFieldInForm: sortFieldInForm,
    deleteFieldByFormIdAndFieldId: deleteFieldByFormIdAndFieldId,
    removeAll: removeAll
  }
}
