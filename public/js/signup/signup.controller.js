(function() {
  angular
    .module('TasteOfApp', ['angularFileUpload'])
    .controller('SignupController', ['$scope', '$http', '$window', 'FileUploader', function($scope, $http, $window, FileUploader) {

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

      //uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
      //}

      uploader.onAfterAddingFile = function(fileItem) {
        console.log($scope.croppedImageUrl)
        $http({
          method: 'POST',
          url: '/api/image/avatar/original/delete',
          data: {path: $scope.originalImageUrl, crop_path: $scope.croppedImageUrl}
        }).success(function(response) {
          console.log(response)
          uploader.uploadAll()
        })
      }

      //uploader.onAfterAddingAll = function(addedFileItems) {
      //}

      //uploader.onBeforeUploadItem = function(item) {
      //}

      //uploader.onProgressItem = function(fileItem, progress) {
      //}

      //uploader.onProgressAll = function(progress) {
      //}

      //uploader.onSuccessItem = function(fileItem, response, status, headers) {
      //}

      //uploader.onErrorItem = function(fileItem, response, status, headers) {
      //}

      //uploader.onCancelItem = function(fileItem, response, status, headers) {
      //}

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
          $scope.originalImageUrlHide = false
          $scope.croppedImageUrlHide = true
          $scope.originalImageUrl = response['imageUrl']
          $scope.chooseImageBtnText = 'Change Image'
          replaceUrl($scope.originalImageUrl)
          uploader.clearQueue()
      }

      //uploader.onCompleteAll = function() {
      //}
      
      $scope.crop = function() {
        $http({
          method: 'POST',
          url: '/api/image/avatar/crop',
          data: {
            'path': $scope.originalImageUrl + '',
            'x': x+'',
            'y': y+'',
            'width': width+'',
            'height': height+''
          },
        }).success(function(response) {
          console.log(response)
          console.log(response['cropedImagePath'])
          $scope.croppedImageUrl = response['cropedImagePath']
          $scope.originalImageUrlHide = true
          $scope.croppedImageUrlHide = false
        })
      }

      $scope.signup = function() {
        console.log('signup')
        console.log($scope.password)
        console.log($scope.confirm_password)

        if (isEmpty($scope.username)) {
          logErr('Username can\'t be empty')
        }

        if (isEmpty($scope.password)) {
          logErr('Password can\'t be empty')
        }

        if ($scope.password != $scope.confirm_password) {
          console.log('pnm')
          logErr('Password not match')
        }

        $http({
          method: 'POST',
          url: '/login/signup',
          data: {
            username: $scope.username,
            password: $scope.password,
            email: $scope.email,
            firstname: $scope.firstname,
            lastname: $scope.lastname,
            imageUrl: $scope.croppedImageUrl
          }
        }).success(function(response) {
          if (response['success']) {
            window.location = '/'
          } else {
            logErr(response['err'])
          }
        })
      }
      
      $window.onbeforeunload =  function() {
        console.log('cao ni ma')
        $http({
          method: 'POST',
          url: '/api/image/avatar/original/delete',
          data: {path: $scope.originalImageUrl, crop_path: ''}
        }).success(function(response) {
          console.log(response)
          uploader.uploadAll()
        })
      }

      function isEmpty(str) {
        return (typeof str === 'undefined' || str.trim() == '')
      }

      function logErr(err) {
        $scope.err = err
      }
    }])
})()
