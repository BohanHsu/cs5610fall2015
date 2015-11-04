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
var Post = require('../models/post')
var Tweet = require('../models/tweet')

User.find({}).remove(function() {})
console.log('all user gone :)')

Following.find({}).remove(function() {})
console.log('all following gone :)')

Post.find({}).remove(function() {})
console.log('post gone')

Tweet.find({}).remove(function() {})
console.log('tweet gone')

var user1 = new User()
user1.local.username = 'xbh'
user1.local.password = user1.generateHash('xbh')
user1.local.imageUrl = '/uploads/avatar/crd_c9f2eb63-6b60-8cb9-68e6-3ad986a0f30b_download.jpeg'
user1.save()

var user2 = new User()
user2.local.username = 'x'
user2.local.password = user1.generateHash('x')
user2.local.imageUrl = '/uploads/avatar/crd_b392e107-9b0d-c071-895d-fe2454b9abaa_hi-res-e96e2dc827900905d33d96f102d08f41_crop_north.jpg'
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

var tweet1 = new Tweet()
tweet1.content = 'user1 tweet1 post1 hehe'
tweet1.save()


var tweet3 = new Tweet()
tweet3.content = 'user2 tweet3 post3 hehe'
tweet3.save()

var post1 = new Post()
post1.post_type = 'tweet'
post1.user_id = user1._id
post1.tweet_id = tweet1._id
post1.save()


for (var i = 0; i < 100; i++) {
  var tweet2 = new Tweet()
  tweet2.content = 'user1 tweet2 post1 hehe, this is a random post, with id=' + i
  tweet2.save()

  var post2 = new Post()
  post2.post_type = 'tweet'
  post2.user_id = user1._id
  post2.tweet_id = tweet2._id
  post2.save()
}

var post3 = new Post()
post3.post_type = 'tweet'
post3.user_id = user2._id
post3.tweet_id = tweet3._id
post3.save()
