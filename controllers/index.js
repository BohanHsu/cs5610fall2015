//var express = require('express')
//var app = express()
//var bodyParser = require('body-parser')
//
//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
//
//app.use('/', require('./home'))
//app.use('/comments', require('./comment'))
//app.use('/login', require('./login'))
//
//module.exports = app

var bodyParser = require('body-parser')

module.exports = function (app, passport) {

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  app.use('/', require('./home'))
  app.use('/comments', require('./comment'))
  app.use('/login', require('./login')(passport))
}
