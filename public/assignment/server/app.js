var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var UserModel = require('./models/user.model.js')()
var FormModel = require('./models/form.model.js')()
var UserService = require('./services/user.service.js')(app, UserModel, null)
var FormService = require('./services/form.service.js')(app, FormModel, null)
var FieldService = require('./services/field.service.js')(app, FormModel, null)

module.exports = app
