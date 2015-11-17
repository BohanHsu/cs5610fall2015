module.exports = function(app, userModels, db) {
  app.post('/api/assignment/user', function(req, res) {
    var user = req.body.user
    var newUser = {}
    for (var k in user) {
      newUser[k] = user[k]
    }
    userModels.Create(newUser).then(function(user) {
      res.json(user)
    })
  })

  app.get('/api/assignment/user', function(req, res) {
    if (req.query.username) {
      if (req.query.password) {
        userModels.findUserByName(req.query.username).then(function(userByUserName) {
          userModels.findUserByCredentials(req.query.password).then(function(userByUserPassword) {
            if (userByUserName == null || userByUserPassword == null) {
              res.json(null)
            } else if (userByUserName.id == userByUserPassword.id) {
              res.json(userByUserName)
            } else {
              res.json(null)
            }
          })
        })
      } else {
        userModels.findUserByName(req.query.username).then(function(err, userByUserName) {
          res.json(userModels.findUserByName(userByUserName))
        })
      }
    } else {
      userModels.FindAll().then(function(users) {
        res.json(users)
      })
    }
  })

  app.get('/api/assignment/user/:id', function(req, res) {
    userModels.FindById(req.params.id).then(function(user) {
      res.json()
    })
  })

  app.put('/api/assignment/user/:id', function(req, res) {
    userModels.Update(req.params.id, req.body.user).then(function(user) {
      res.json(user)
    })
  })

  app.delete('/api/assignment/user/:id', function(req, res) {
    userModels.Delete(req.params.id).then(function() {
      userModels.FindAll().then(function(users) {
        res.json()
      })
    })
  })
}
