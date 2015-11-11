module.exports = function(app, formModel, db) {
  console.log('form online')
  app.get('/api/assignment/user/:userId/form', function(req, res) {
    res.json(formModel.findByUserId(req.params.userId))
  })

  app.get('/api/assignment/form/:formId', function(req, res) {
    res.json(formModel.FindById(req.params.formId))
  })

  app.delete('/api/assignment/form/:formId', function(req, res) {
    console.log('formId', req.params.formId)
    formModel.Delete(req.params.formId)
    res.json(null)
  })


  app.post('/api/assignment/user/:userId/form', function(req, res) {
    var form = req.body.form
    form['userId'] = req.params.userId
    formModel.Create(form)
    res.json(null)
  })
  
  app.put('/api/assignment/form/:formId', function(req, res) {
    res.json(formModel.Update(req.params.formId, req.body.form))
  })
}
