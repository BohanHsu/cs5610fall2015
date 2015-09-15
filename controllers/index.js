var express = require('express')
var app = express()

app.use('/', require('./home'))
module.exports = app
