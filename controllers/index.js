var bodyParser = require('body-parser')

module.exports = function (app, passport) {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('/', require('./home'))
  app.use('/comments', require('./comment'))
  app.use('/login', require('./login')(passport))
}
