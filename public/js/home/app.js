(function () {
  angular
    .module('TasteOfApp', ['ngRoute', 'angularFileUpload'])

    Util = {}
    Util.leftMostNChars = function(n, str) {
      if (str.length < n) {
        return str
      } else {
        return str.substring(0, n) + '...'
      }
    }
})()
