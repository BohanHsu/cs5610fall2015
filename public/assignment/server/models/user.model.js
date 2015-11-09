module.exports = function() {
  var users = require('./user.mock.json')

  return {
    Create: function(user) {
      users.push(user)
    },

    FindAll: function() {
      return users
    },

    FindById: function foundById(id) {
      var foundUser = null
      users.forEach(function(ele, idx, arr) {
        if (ele['id'] == id) {
          foundUser = ele
        }
      })
      return foundUser
    },

    Update: function(id, attrs) {
      var user = foundById(id)
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
      var foundUser = null

      users.forEach(function(ele, idx, attr) {
        if (ele['username'] == username) {
          foundUser = ele
        }
      })

      return foundUser
    },

    findUserByCredentials: function(credentials) {
      var foundUser = null

      users.forEach(function(ele, idx, arr) {
        if (ele['password'] == credentials) {
          foundUser = ele
        }
      })

      return foundUser
    }

  }
}
