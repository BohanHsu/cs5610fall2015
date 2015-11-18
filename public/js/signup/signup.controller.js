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
        if (isEmpty($scope.username)) {
          logErr('Username can\'t be empty')
        }

        if (isEmpty($scope.password)) {
          logErr('Password can\'t be empty')
        }

        if ($scope.password != $scope.confirm_password) {
          logErr('Password not match')
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
      }

      $scope.days = ['Sun', 'Mon', 'Tu', 'Wed', 'Th', 'Fri', 'Sat']
      
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
    })
})()
