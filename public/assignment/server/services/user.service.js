module.exports = function(app, userModels, db) {
  app.post('/api/assignment/user', function(req, res) {
    var user = req.body.user
    var newUser = {}
    for (var k in user) {
      newUser[k] = user[k]
    }
    res.json(userModels.Create(newUser))
  })

  app.get('/api/assignment/user', function(req, res) {
    if (req.query.username) {
      if (req.query.password) {
        var userByUserName = userModels.findUserByName(req.query.username)
        var userByUserPassword = userModels.findUserByCredentials(req.query.password)
        if (userByUserName == null || userByUserPassword == null) {
          res.json(null)
        } else if (userByUserName.id == userByUserPassword.id) {
          res.json(userByUserName)
        } else {
          res.json(null)
        }
      } else {
        res.json(userModels.findUserByName(req.query.username))
      }
    } else {
      res.json(userModels.FindAll())
    }
  })

  app.get('/api/assignment/user/:id', function(req, res) {
    res.json(userModels.FindById(req.params.id))
  })

  app.put('/api/assignment/user/:id', function(req, res) {
    res.json(userModels.Update(req.params.id, req.body.user))
  })

  app.delete('/api/assignment/user/:id', function(req, res) {
    userModels.Delete(req.params.id)
    res.json(userModels.FindAll())
  })
}
