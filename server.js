#!/bin/env node
var express = require('express');
var app = express();

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

app.use(require('./controllers'))

app.listen(port, ipaddress);
