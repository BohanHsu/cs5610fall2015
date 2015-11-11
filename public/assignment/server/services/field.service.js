module.exports = function(app, formModel, db) {
  app.get('/api/assignment/form/:formId/field', function(req, res) {
    var form = formModel.FindById(req.params.formId)
    console.log(form)
    if (form) {
      res.json(form['fields'])
    } else {
      res.json(null)
    }
  })

  app.get('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
    res.json(formModel.findFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId))
  })

  app.delete('/api/assignment/form/:formId/field/:fieldId', function(req, res) {
    formModel.deleteFieldByFormIdAndFieldId(req.params.formId, req.params.fieldId)
    res.json(null)
  })

  app.post('/api/assignment/form/:formId/field', function(req, res) {
    formModel.addFieldToForm(req.params.formId, req.body.field)
    res.json(null)
  })

  app.put('/api/assignment/form/:formId/field/:fieldId', function() {
    updateFieldInForm(req.params.formId, req.params.fieldId, req.body.field)
    res.json(null)
  })
}
