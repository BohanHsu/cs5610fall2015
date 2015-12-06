var express = require('express')
var authenticate = require('../middleware/authenticate_admin')
var app = express()
var cookieParser = require('cookie-parser')
var User = require('../models/user')
var Post = require('../models/post')
app.locals.pretty = true
app.use(cookieParser())

var User = require('../models/user')
var Following = require('../models/following')
var Post = require('../models/post')
var Tweet = require('../models/tweet')
var Recipe = require('../models/recipe')
var Comment = require('../models/comment')
var Notification = require('../models/notification')

app.get('/', authenticate, function (req, res) {
  res.render('./admin/admin', {title: 'Admin', message: 'Welcome Bohan Xu', user: req.session.user})
})

app.get('/delete/all', authenticate, function (req, res) {
  User.find({}).remove(function(err) {
    if (err) {
      res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
    }
    Following.find({}).remove(function(err) {
      if (err) {
        res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
      }
      Post.find({}).remove(function(err) {
        if (err) {
          res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
        }
        Tweet.find({}).remove(function(err) {
          if (err) {
            res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
          }
          Recipe.find({}).remove(function(err) {
            if (err) {
              res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
            }
            Comment.find({}).remove(function(err) {
              if (err) {
                res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
              }

              Notification.find({}).remove(function(err) {
                if (err) {
                  res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
                }
                res.render('./admin/admin', {title: 'Admin', message: 'all record removed', user: req.session.user})
              })
            })
          })
        })
      })
    })
  })
})

function generateUsers(req, res, callback) {
  var users = []
  var user = new User()
  user.local.username = 'xbh'
  user.local.firstname = 'Bohan'
  user.local.lastname = 'Xu'
  user.local.password = user.generateHash('xbh')
  user.local.imageUrl = '/uploads/avatar/crd_c916f339-404f-984e-6c92-681bf75ff41b_samoyed.jpeg'
  users.push(user)

  user = new User()
  user.local.username = 'neymar'
  user.local.firstname = 'Neymar'
  user.local.lastname = 'da Silva Santos '
  user.local.password = user.generateHash('neymar')
  user.local.imageUrl = '/uploads/avatar/crd_fae40182-5777-fd87-c7b0-0063ea36d4e2_neymar.jpg'
  users.push(user)

  user = new User()
  user.local.username = 'test1'
  user.local.firstname = 'Individual'
  user.local.lastname = 'Tester'
  user.local.password = user.generateHash('test1')
  user.local.imageUrl = '/uploads/avatar/crd_9e77f3ba-49d1-763e-4550-662141c4ca87_neu.jpg'
  users.push(user)

  user = new User()
  user.user_type = 'enterprise'
  user.local.username = 'test2'
  user.local.imageUrl = '/uploads/avatar/crd_9e77f3ba-49d1-763e-4550-662141c4ca87_neu.jpg'
  user.local.password = user.generateHash('test2')
  user.enterprise.businessname = "Northeastern University"
  user.enterprise.address = "360 Huntington Ave, Boston, MA 02115"
  user.local.email = 'neu@husky.neu.edu'
  users.push(user)

  user = new User()
  user.user_type = 'enterprise'
  user.local.username = 'mcdonalds'
  user.local.imageUrl = '/uploads/avatar/crd_e46b2977-9d8f-7caf-00cd-754f9f3ff3ad_mdl.png'
  user.local.password = user.generateHash('mcdonalds')
  user.enterprise.businessname = "McDonald's"
  user.enterprise.address = "540 Commonwealth Avenue, Boston, MA 02215"
  user.local.email = 'm@gmail.com'
  users.push(user)

  user = new User()
  user.user_type = 'enterprise'
  user.local.username = 'subway'
  user.local.imageUrl = '/uploads/avatar/crd_671346b2-e082-8b00-4c16-347d6e0b6a20_sbw.jpg'
  user.local.password = user.generateHash('subway')
  user.enterprise.businessname = "SUBWAY"
  user.enterprise.address = "1122 Boylston St, Boston, MA 02115"
  user.local.email = 's@gmail.com'
  user.enterprise.openHours = [ 
    [ "Sun", "8:00 AM", "12:00 PM" ],  
    [ "Mon", "8:00 AM", "12:00 PM" ],  
    [ "Tu", "8:00 AM", "12:00 PM" ],  
    [ "Wed", "8:00 AM", "12:00 PM" ],  
    [ "Th", "8:00 AM", "12:00 PM" ],  
    [ "Fri", "8:00 AM", "12:00 PM" ],  
    [ "Sat", "8:00 AM", "12:00 PM" ],  
  ]
  user.enterprise.tags = ['Sandwich', 'Fast food']
  users.push(user)

  var userIds = []

  var followings = []

  function generateFollowings(callback) {
    // xbh, neymar, test1, test2, mdl, sbw

    var following = null

    for (var i = 0; i < 4; i++) {
      for (var j = 0; j < 6; j++) {
        if (i != j) {
          following = new Following()
          following.follow_by = userIds[i]
          following.following = userIds[j]
          followings.push(following)
        }
      }
    }

    following = new Following()
    following.follow_by = userIds[4]
    following.following = userIds[5]
    followings.push(following)

    following = new Following()
    following.follow_by = userIds[5]
    following.following = userIds[4]
    followings.push(following)


    function saveFollowingOneByOne(callback) {
      if (followings.length > 0) {
        followings[0].save(function(err) {
          if (err) {
            res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
          }

          followings.splice(0, 1)

          saveFollowingOneByOne(callback)
        })
      } else {
        if (callback) {
          callback(userIds)
        }
      }
    }

    saveFollowingOneByOne(callback)
  }

  function saveUserOneByOne(callback) {
    if (users.length > 0) {
      users[0].save(function(err) {
        if (err) {
          res.render('./admin/admin', {title: 'Admin', message: err, user: req.session.user})
        }

        userIds.push(users[0]._id)
        users.splice(0, 1)

        saveUserOneByOne(callback)
      })
    } else {
      generateFollowings(callback)
    }
  }

  saveUserOneByOne(callback)
}

app.get('/add/users', authenticate, function(req, res) {
  generateUsers(req, res, function() {
    res.render('./admin/admin', {title: 'Admin', message: 'all user added', user: req.session.user})
  })
})

function generatePosts(userIds, callback) {
  var posts = []
  // ['type', post, tweet]
  // xbh, neymar, test1, test2, mdl, sbw

  var post = null
  var tweet = null

  var tweetdict = {
    0: [
      'Hot chocolate contains so much calories!',
      'Starbucks have a new winter menu!',
      "Not your average joe's is a pretty good place"
    ],
    1: [
      'I love apple!',
      'Welcome to Brazil!',
      'Yummy',
      'Apple cider is non-alcoholic beverage'
    ],
    4: [
      'We have a new menu: BigMac!!!',
      "i'm lovin' it",
      'You deserve a break today'
    ],
    5: [
      'Play hard, Eat Fresh!',
      'We have a deal for early birds :)',
      'The way a sandwich should be.',
      'The place where fresh is the taste.'
    ]
  }

  while (Object.keys(tweetdict).length > 0) {
    for (var i = 0; i < 6; i++) {
      if (i in tweetdict) {
        if (tweetdict[i].length > 0) {
          var content = tweetdict[i][0]
          var userId = userIds[i]

          post = new Post()
          post.user_id = userId
          tweet = new Tweet()
          tweet.content = content
          posts.push(['tweet', post, tweet])
        } 
        if (tweetdict[i].length == 0) {
          delete tweetdict[i]
        }
      }
    }
  }



}

app.get('/add/all', authenticate, function(req, res) {
  generateUsers(req, res, function() {
  })
})

module.exports = app
