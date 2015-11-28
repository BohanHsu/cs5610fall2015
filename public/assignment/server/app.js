var express = require('express')
var bodyParser = require('body-parser')
var app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var mongoose = require('mongoose')
var db = mongoose
var UserModel = require('./models/user.schema.js')(mongoose)
var FormModel = require('./models/form.schema.js')(mongoose)

var UserService = require('./services/user.service.js')(app, UserModel, null)
var FormService = require('./services/form.service.js')(app, FormModel, null)
var FieldService = require('./services/field.service.js')(app, FormModel, null)
var MockService = require('./services/mock.service.js')(app, UserModel, FormModel)

module.exports = app
