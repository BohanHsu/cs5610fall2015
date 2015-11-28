module.exports = function(app, formModel, db) {
  app.get('/api/assignment/form/:formId/field', function(req, res) {
    formModel.FindById(req.params.formId).then(function(form) {
      if (form) {
        var fields = form['fields']
        idHelper(fields)
        res.json(fields)
      } else {
        res.json(null)
      }
    })
  })

  app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
    formModel.findFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId).then(function(field) {
      field['id'] = field['_id']
      res.json(field)
    })
  })

  app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
    formModel.deleteFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId).then(function() {
      res.json(null)
    })
  })

  app.post('/api/assignment/form/:formId/field', function(req, res) {
    formModel.addFieldToForm(req.params.formId, req.body.field).then(function(form) {
      res.json(null)
    })
  })

  app.put('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
    console.log(req.body.field)
    var newForm = {}
    newForm['type'] = req.body.field.fieldType
    newForm['label'] = req.body.field.label
    newForm['placeholder'] = req.body.field.placeholder
    newForm['options'] = req.body.field.options

    formModel.updateFieldInForm(req.params.formId, req.params.fieldId, newForm).then(function() {
      res.json(null)
    })
  })

  app.put('/api/assignment/form/:formId/sort', function(req, res) {
    formModel.sortFieldInForm(req.params.formId, req.body.oldIndex, req.body.newIndex).then(function() {
      res.json(null)
    })
  })

  function idHelper(array) {
    array.forEach(function(ele, idx, arr) {
      ele['id'] = ele['_id']
    })
  }
}
