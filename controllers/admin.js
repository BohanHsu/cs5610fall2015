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
          post.tweet_id = tweet._id
          post.post_type = 'tweet'
          posts.push(['tweet', post, tweet])

          tweetdict[i].splice(0, 1)
        } 
        if (tweetdict[i].length == 0) {
          delete tweetdict[i]
        }
      }
    }
  }

  var recipe = null

  post = new Post()
  post.user_id = userIds[0]
  post.post_type = 'recipe'

  recipe = new Recipe()
  recipe.post_id = post._id
  post.recipe_id = recipe._id

  recipe.recipeName = "Apple Crisp"
  recipe.ingredients = []
  recipe.ingredients.push(['cooking apples, sliced', '4 medium tart'])
  recipe.ingredients.push(['packed brown sugar', '3/4 cup'])
  recipe.ingredients.push(['Gold Medal all-purpose flour', '1/2 cup'])
  recipe.ingredients.push(['quick-cooking or old-fashioned oats', '1/2 cup'])
  recipe.ingredients.push(['butter or margarine, softened', '1/3 cup'])
  recipe.ingredients.push(['ground cinnamon', '3/4 teaspoon'])
  recipe.ingredients.push(['ground nutmeg', '3/4 teaspoon'])
 

  recipe.steps = []
  recipe.steps.push(['Heat oven to 375ºF. Grease bottom and sides of 8-inch square pan with shortening.', ''])
  recipe.steps.push(['Spread apples in pan. In medium bowl, stir remaining ingredients except cream until well mixed; sprinkle over apples.', ''])
  recipe.steps.push(['Bake about 30 minutes or until topping is golden brown and apples are tender when pierced with a fork. Serve warm with cream.', '/uploads/post/fafe01dc-e0d6-e39f-7db6-b05bc46155db_applecrisp.jpg'])
 
  posts.push(['recipe', post, recipe])

  post = new Post()
  post.user_id = userIds[1]
  post.post_type = 'recipe'

  recipe = new Recipe()
  recipe.post_id = post._id
  post.recipe_id = recipe._id

  recipe.recipeName = "banana bread"
  recipe.ingredients = []
  recipe.ingredients.push(['granulated sugar', '1 cup'])
  recipe.ingredients.push(['unsalted butter, room temperature', '8 tablespoons'])
  recipe.ingredients.push(['large eggs', '2'])
  recipe.ingredients.push(['ripe bananas', '3'])
  recipe.ingredients.push(['milk', '1 tablespoon'])
  recipe.ingredients.push(['ground cinnamon', '1 teaspoon'])
  recipe.ingredients.push(['all-purpose flour', '2 cups'])
  recipe.ingredients.push(['baking powder', '1 teaspoon'])
  recipe.ingredients.push(['baking soda', '1 teaspoon'])
  recipe.ingredients.push(['salt', '1 teaspoon'])

  recipe.steps = []
  recipe.steps.push(['Preheat the oven to 325 degrees F. Butter a 9 x 5 x 3 inch loaf pan.', ''])
  recipe.steps.push(['Cream the sugar and butter in a large mixing bowl until light and fluffy. Add the eggs one at a time, beating well after each addition.', ''])
  recipe.steps.push(['In a small bowl, mash the bananas with a fork. Mix in the milk and cinnamon. In another bowl, mix together the flour, baking powder, baking soda and salt.', ''])
  recipe.steps.push(['Add the banana mixture to the creamed mixture and stir until combined. Add dry ingredients, mixing just until flour disappears.', ''])
  recipe.steps.push(['Pour batter into prepared pan and bake 1 hour to 1 hour 10 minutes, until a toothpick inserted in the center comes out clean. Set aside to cool on a rack for 15 minutes. Remove bread from pan, invert onto rack and cool completely before slicing.', '/uploads/post/3bbdcc54-087d-8c94-c09c-be53a2a0dd91_banana-bread.jpeg'])
  
  posts.push(['recipe', post, recipe])

  var postIds = []

  post = new Post()
  post.user_id = userIds[2]
  tweet = new Tweet()
  tweet.content = 'test content1'
  post.tweet_id = tweet._id
  post.post_type = 'tweet'
  posts.push(['tweet', post, tweet])
  postIds.push(post._id)

  post = new Post()
  post.user_id = userIds[3]
  tweet = new Tweet()
  tweet.content = 'test content2'
  post.tweet_id = tweet._id
  post.post_type = 'tweet'
  posts.push(['tweet', post, tweet])
  postIds.push(post._id)

  console.log(postIds)

  var comment = null
  var notification = null

  var commentDicts = [
    {
      'user_id': userIds[0],
      'comment_type': 'post',
      'content': 'hello tester',
      'user_to': userIds[2],
      'post_id': postIds[0]
    },
    {
      'user_id': userIds[1],
      'comment_type': 'post',
      'content': 'hola, tester',
      'user_to': userIds[2],
      'post_id': postIds[0]
    },
    {
      'user_id': userIds[0],
      'comment_type': 'post',
      'content': 'hello northeastern',
      'user_to': userIds[3],
      'post_id': postIds[1]
    },
    {
      'user_id': userIds[1],
      'comment_type': 'post',
      'content': 'hello northeastern university',
      'user_to': userIds[3],
      'post_id': postIds[1]
    },
    {
      'user_id': userIds[0],
      'comment_type': 'user',
      'content': 'Welcome to tastof website',
      'user_to': userIds[3],
    }
  ]

  function saveCommentAndNotificationOneByOne(callback) {
    if (commentDicts.length > 0) {
      var commentDict = commentDicts[0]

      comment = new Comment()
      comment.user_id = commentDict['user_id']
      comment.comment_type = commentDict['comment_type']
      comment.content = commentDict['content']

      notification = new Notification()
      notification.user_from = commentDict['user_id']
      notification.user_to = commentDict['user_to']
      notification.comment_from = comment._id

      if (commentDict['comment_type'] == 'post') {
        comment.post_id = commentDict['post_id']
        notification.post_id = commentDict['post_id']
      }
      if (commentDict['comment_type'] == 'user') {
        comment.commentonuser_id = commentDict['user_to']
        //comment.user_id = commentDict['user_id']
      }

      comment.save(function(err) {
        notification.save(function(err) {
          commentDicts.splice(0, 1)

          saveCommentAndNotificationOneByOne(callback)
        })
      })
    } else {
      if (callback)
        callback()
    }
  }

  savePostOneByOne(callback)

  function savePostOneByOne(callback) {
    if (posts.length > 0) {
      console.log('posts.length', posts.length)
      posts[0][1].save(function(err) {
        posts[0][2].save(function(err) {

          posts.splice(0, 1)

          savePostOneByOne(callback)
        })
      })
    } else {
      //if (callback)
      //  callback()
      saveCommentAndNotificationOneByOne(callback)
    }
  }
}

app.get('/add/all', authenticate, function(req, res) {
  generateUsers(req, res, function(userIds) {
    console.log('userIds')
    generatePosts(userIds, function() {
      console.log('finished')
      res.render('./admin/admin', {title: 'Admin', message: 'all user/post added', user: req.session.user})
    })
  })
})

module.exports = app
