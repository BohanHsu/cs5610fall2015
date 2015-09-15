#!/bin/env node
var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.set('view engine', 'jade')

app.get('/', function (req, res) {
  res.render('index', {title: 'Hello world', message: 'NEU CS5610'})
})

app.listen(port, ipaddress);
