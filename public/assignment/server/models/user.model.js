module.exports = function() {
  var users = require('./user.mock.json')

  function findById(id) {
    var findUser = null
    users.forEach(function(ele, idx, arr) {
      if (ele['id'] == id) {
        findUser = ele
      }
    })
    return findUser
  }

  return {
    Create: function(user) {
      users.push(user)
      return user
    },

    FindAll: function() {
      return users
    },

    FindById: findById,

    Update: function(id, attrs) {
      var user = findById(id)
      console.log(user)
      console.log(attrs)
      for (var k in attrs) {
        user[k] = attrs[k]
      }
      return user
    },

    Delete: function(id) {
      var index = null
      users.forEach(function(ele, idx, arr) {
        if (ele['id'] == id) {
          index = idx
        }
      })

      users.splice(index, 1)
    },

    findUserByName: function(username) {
      var findUser = null

      users.forEach(function(ele, idx, attr) {
        if (ele['username'] == username) {
          findUser = ele
        }
      })

      return findUser
    },

    findUserByCredentials: function(credentials) {
      var findUser = null

      users.forEach(function(ele, idx, arr) {
        if (ele['password'] == credentials) {
          findUser = ele
        }
      })

      return findUser
    }

  }
}
