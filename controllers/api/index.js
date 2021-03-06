var bodyParser = require('body-parser')
var express = require('express')
var app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/post', require('./post'))
app.use('/user', require('./user'))
app.use('/comment', require('./comment'))
app.use('/search', require('./search'))
app.use('/notification', require('./notification'))

module.exports = app
