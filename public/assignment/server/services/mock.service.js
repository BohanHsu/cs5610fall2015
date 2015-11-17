module.exports = function(app, UserModel, FormModel) {

  app.get('/api/assignment/generate/mock/data', function(req, res) {
    var userJson = require('../models/user.mock.json')
    var formJson = require('../models/form.mock.json')

    UserModel.removeAll().then(function() {
      FormModel.removeAll().then(function() {

        userJson.forEach(function(ele, idx, arr) {
          UserModel.Create(ele).then(function(user) {
            formJson.forEach(function(eleform, idx, arr) {
              if (eleform.userId == ele.id) {
                eleform.userId = user._id
                FormModel.Create(eleform).then(function(form) {
                  if (eleform.fields) {
                    eleform.fields.forEach(function(ele1, idx1, arr1) {
                      FormModel.addFieldToForm(form._id, ele1).then(function() {
                      })
                    })
                  }
                })
              }
            })

          })
        })

      })
    })

    res.json(null)
  })
}
