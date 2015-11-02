#!/bin/env node

var express = require('express');
var app = express();
var mongoose = require('mongoose')

// set up environment
process.env.NODE_ENV = process.env.NODE_ENV || 'development'
env = {}
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

var User = require('../models/user')
var Following = require('../models/following')
var Post = require('../models/following')
var Tweet = require('../models/following')

User.find({}).remove()
console.log('all user gone :)')

Following.find({}).remove()
console.log('all following gone :)')

Post.find({}).remove()
console.log('post gone')

Tweet.find({}).remove()
console.log('tweet gone')

var user1 = new User()
user1.local.username = 'xbh'
user1.local.password = user1.generateHash('xbh')
user1.save()

var user2 = new User()
user1.local.username = 'x'
user1.local.password = user1.generateHash('x')
user2.save()

var following1 = new Following()
following1.follow_by = user1._id
following1.following = user1._id
following1.save()

var following2 = new Following()
following2.follow_by = user1._id
following2.following = user2._id
following2.save()

var following3 = new Following()
following3.follow_by = user2._id
following3.following = user1._id
following3.save()

var following4 = new Following()
following4.follow_by = user2._id
following4.following = user2._id
following4.save()
