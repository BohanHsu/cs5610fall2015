var bodyParser = require('body-parser')

module.exports = function (app, passport) {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('/', require('./home'))
  app.use('/users', require('./user'))
  app.use('/login', require('./login')(passport))
  app.use('/api/image', require('./image'))
  app.use('/api', require('./api'))
  app.use('/adminapi', require('./adminapi'))
  app.use('/admin', require('./admin'))
}
