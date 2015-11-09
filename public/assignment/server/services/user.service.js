module.exports = function(app, userModels, db) {
  app.post('/api/assignment/user', function(req, res) {
    var user = app.body.user
    var newUser = {}
    for (var k in user) {
      newUser[k] = user[k]
    }
    userModels.Create(newUser)
    res.json(userModels.FindAll())
  })

  app.get('/api/assignment/user', function(req, res) {
    if (req.params.username) {
      if (req.params.password) {
        var userByUserName = userModels.findUserByName(req.params.username)
        var userByUserPassword = userModels.findUserByCredentials(req.params.password)
        if (userByUserName.id == userByUserPassword.id) {
          res.json(userByUserName)
        } else {
          res.json(null)
        }
      } else {
        res.json(userModels.findUserByName(req.params.username))
      }
    } else {
      res.json(userModels.FindAll())
    }
  })

  app.get('/api/assignment/user/:id', function(req, res) {
    res.json(userModels.FindById(req.params.id))
  })

  app.put('/api/assignment/user/:id', function(req, res) {
    res.json(userModels.Update(req.params.body, req.body.user))
  })

  app.delete('/api/assignment/user/:id', function(req, res) {
    userModels.Delete(req.params.id)
    res.json(userModels.FindAll())
  })
}
