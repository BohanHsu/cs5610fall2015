var bodyParser = require('body-parser')
var express = require('express')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/openshiftimage', require('./openshiftimage'))

module.exports = app
