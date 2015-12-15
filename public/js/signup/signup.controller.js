(function() {
  angular
    .module('TasteOfApp', ['angularFileUpload'])
    .controller('SignupController', function($scope, $http, $window, FileUploader, SignupService, ImageService) {

      $scope.type = 'individual'
      $scope.originalImageUrl = ''
      $scope.originalImageUrlHide = true
      $scope.croppedImageUrl = ''
      $scope.croppedImageUrlHide = true
      $scope.chooseImageBtnText = 'Choose Image'
      $scope.err = null

      var uploader = $scope.uploader = new FileUploader({
        url: '/api/image/avatar/original',
      })

      uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 1
        }
      })

      uploader.onAfterAddingFile = function(fileItem) {
        ImageService.deleteImage({path: $scope.originalImageUrl, crop_path: $scope.croppedImageUrl}, function(response) {
          uploader.uploadAll()
        })
      }

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          $scope.originalImageUrlHide = false
          $scope.croppedImageUrlHide = true
          $scope.originalImageUrl = response['imageUrl']
          $scope.chooseImageBtnText = 'Change Image'
          replaceUrl($scope.originalImageUrl)
          uploader.clearQueue()
      }

      $scope.crop = function() {
        ImageService.cropImage({
          'path': $scope.originalImageUrl + '',
          'x': x+'',
          'y': y+'',
          'width': width+'',
          'height': height+''
        }, function(response) {
          $scope.croppedImageUrl = response['cropedImagePath']
          $scope.originalImageUrlHide = true
          $scope.croppedImageUrlHide = false
        })
      }

      $scope.signup = function() {
        clearErr()
        if (isEmpty($scope.username)) {
          logErr('Username can\'t be empty')
          return
        }

        if (isEmpty($scope.password)) {
          logErr('Password can\'t be empty')
          return
        }

        if ($scope.password != $scope.confirm_password) {
          logErr('Password not match')
          return
        }

        if (typeof $scope.email == 'undefined') {
          logErr('Please enter a valid email address.')
          return
        }

        if ($scope.originalImageUrl != '' && $scope.croppedImageUrl == '') {
          logErr('Please crop your avatar!.')
          return
        }

        SignupService.userSignUp({
          username: $scope.username,
          password: $scope.password,
          email: $scope.email,
          firstname: $scope.firstname,
          lastname: $scope.lastname,
          imageUrl: $scope.croppedImageUrl
        }, function(response) {
          if (response['success']) {
            window.location = '/'
          } else {
            logErr(response['err'])
          }
        })
      }

      $scope.changeType = function(type) {
        $scope.type = type
        clearErr()
      }

      $scope.days = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat']
      $scope.daysDict = {}
      $scope.days.forEach(function(ele, idx, arr) {
        $scope.daysDict[ele] = null
      })

      $scope.addOpenHour = function() {
        $scope.daysDict[$scope.daySelection] = [$scope.openHour, $scope.closeHour]
      }

      $scope.removeFromDaysDict = function(key) {
        $scope.daysDict[key] = null
      }

      $scope.daysDictSizeHelper = function() {
        var size = 0
        $scope.days.forEach(function(ele, idx, arr) {
          if ($scope.daysDict[ele]) {
            size++
          }
        })
        return size
      }

      $scope.tag = ''
      $scope.tags = []

      $scope.addTag = function() {
        if ($scope.tags.length == 10) {
          $scope.tags.splice(0, 1)
        }
        $scope.tags.push($scope.tag)
        $scope.tag = ''
      }

      $scope.removeTag = function(index) {
        $scope.tags.splice(index, 1)
      }

      $scope.signupbusiness = function() {
        clearErr()
        //console.log($scope.username)
        //console.log($scope.password)
        //console.log($scope.confirm_password)
        //console.log($scope.business)
        //console.log($scope.email)
        //console.log($scope.address)
        //console.log($scope.daysDict)
        //console.log($scope.tags)

        if (isEmpty($scope.username)) {
          logErr('Username can\'t be empty')
          return
        }

        if (isEmpty($scope.password)) {
          logErr('Password can\'t be empty')
          return
        }

        if ($scope.password != $scope.confirm_password) {
          logErr('Password not match')
          return
        }

        if (isEmpty($scope.business)) {
          logErr('Please enter business name')
          return
        }

        if (typeof $scope.email == 'undefined') {
          logErr('For enterprise user, you need to enter a valid email address.')
          return
        }

        if ($scope.croppedImageUrl == null || $scope.croppedImageUrl == '') {
          logErr('For enterprise user, you need to upload a avatar image.')
          return
        }

        var openHoursArray = []

        $scope.days.forEach(function(ele, idx, arr) {
          if ($scope.daysDict[ele]) {
            openHoursArray.push([ele] + ',' + $scope.daysDict[ele])
          }
        })

        console.log(openHoursArray)

        SignupService.userSignUp({
          username: $scope.username,
          password: $scope.password,
          email: $scope.email,
          imageUrl: $scope.croppedImageUrl,
          userType: 'enterprise',
          businessname: $scope.business,
          address: $scope.address,
          openHours: openHoursArray,
          tags: $scope.tags
        }, function(response) {
          if (response['success']) {
            window.location = '/'
          } else {
            logErr(response['err'])
          }
        })
      }
      
      $window.onbeforeunload =  function() {
        ImageService.deleteImage({path: $scope.originalImageUrl, crop_path: ''}, function(response) {
        })
      }

      function isEmpty(str) {
        return (typeof str === 'undefined' || str.trim() == '')
      }

      function logErr(err) {
        $scope.err = err
      }

      function clearErr(err) {
        $scope.err = null
      }
    })
})()
