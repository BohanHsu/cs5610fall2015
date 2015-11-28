#!/bin/env node
var express = require('express');
var app = express();

var session = require('express-session')
var passport = require('passport')
var flash = require('connect-flash')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

// set static resource path
app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

// set up environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
env = {}

// set up view engine
app.set('view engine', 'jade')

// set mongoose connection
var mongoose = require('mongoose')
if (process.env.NODE_ENV === 'production') {
  env.MONGO_DB_URL = process.env.OPENSHIFT_MONGODB_DB_URL
  env.APP_NAME = process.env.OPENSHIFT_APP_NAME
} else {
  env.MONGO_DB_URL = 'mongodb://admin:1234@127.0.0.1:27017/'
  env.APP_NAME = 'cs5610fall2015'
}

env.MONGO_CONNECTION = env.MONGO_DB_URL + env.APP_NAME
mongoose.connect(env.MONGO_CONNECTION, {auth: {authdb: 'admin'}})

mongoose.connection.on('connected', function () {
  console.log('mongo db is online')
})

mongoose.connection.on('error', function (err) {
  console.log('mongo db connection error')
  console.log(err)
})

// login control
app.use(session({ secret: 'neucs5610fall2015bohanxu' }))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

// using controller
require('./config/passport')(passport)

require('./controllers')(app, passport)

// for assignment
//app.use(require('./public/assignment/server/app.js'))

app.listen(port, ipaddress);
