module.exports = function(app, formModel, db) {
  app.get('/api/assignment/user/:userId/form', function(req, res) {
    formModel.findByUserId(req.params.userId).then(function(forms) {
      res.json(forms)
    })
  })

  app.get('/api/assignment/form/:formId', function(req, res) {
    formModel.FindById(req.params.formId).then(function(form) {
      form['id'] = form['_id']
      res.json(form)
    })
  })

  app.delete('/api/assignment/form/:formId', function(req, res) {
    formModel.Delete(req.params.formId).then(function() {
      res.json(null)
    })
  })


  app.post('/api/assignment/user/:userId/form', function(req, res) {
    var form = req.body.form
    form['userId'] = req.params.userId
    formModel.Create(form).then(function(form) {
      res.json(form)
    })
  })
  
  app.put('/api/assignment/form/:formId', function(req, res) {
    formModel.Update(req.params.formId, req.body.form).then(function(form) {
      res.json()
    })
  })

}
