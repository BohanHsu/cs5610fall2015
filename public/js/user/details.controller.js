(function() {
  angular
  .module('TasteOfApp')
  .directive('showTab', function() {
    return {
      link: function (scope, element, attrs) {
        element.click(function(e) {
          e.preventDefault()
          $(element).tab('show')
        })
      }
    }
  })
  .controller('DetailsController', function($scope, $rootScope, $routeParams, $window, UserService, FileUploader, ImageService, PostService, CommentService) {

    if ($routeParams.commentId) {
      $scope.highlightCommentId = $routeParams.commentId
    } else {
      $scope.highlightCommentId = null
    }

    var copiedDetailUser = null
    setCropper()

    $scope.user = $rootScope.user
    clearErr()

    function loadDetailUser() {
      UserService.userDetails($routeParams['id'], function(response) {
        $scope.detailUser = response.user
        $scope.posts = response.posts
        $scope.followings = response.followings
        $scope.followers = response.followBys

        if ($scope.detailUser.user_type == 'enterprise') {
          loadReplyOfPostAccoringToIndex()
          setAddr($scope.detailUser.enterprise.address)
          initializeMap1()
        }

        if ($scope.detailUser._id != $scope.user._id) {
          var ids = [$scope.detailUser._id]
          UserService.queryFollowing($scope.user._id, ids, function(response) {
            $scope.isFollowing = response.result[$scope.detailUser._id]


          })
        }
      })
    }

    loadDetailUser()

    $scope.isChangeingProfile = false
    $scope.isChangeingPassword = false

    $scope.changingPassword = function() {
      $scope.isChangeingPassword = true
    }

    $scope.setChangeProfile = function(value) {
      clearErr()

      if (!value) {
        $scope.discardUpdateImage()
        resetPasswords()
        $scope.isChangeingPassword = false
      }
      if (value) {
        copiedDetailUser = JSON.parse(JSON.stringify($scope.detailUser))
      }

      if ($scope.detailUser._id == $scope.user._id) {
        if ($scope.isChangeingProfile && !value) {
          $scope.detailUser = copiedDetailUser
        }
        $scope.isChangeingProfile = value
      }
    }
    
    $scope.followUser = function(userId) {
      $scope.isFollowing = null
      UserService.followingUser($scope.user._id, userId, function(response) {
        if (response.success) {
          $scope.isFollowing = true
        }
      })
    }

    $scope.unFollowUser = function(userId) {
      $scope.isFollowing = null
      UserService.unFollowingUser($scope.user._id, userId, function(response) {
        if (response.success) {
          $scope.isFollowing = false
        }
      })
    }


    var uploader = $scope.uploader = new FileUploader({
      url: '/api/image/avatar/original',
    })

    $scope.originalImageUrl = ''
    $scope.originalImageUrlHide = true
    $scope.croppedImageUrl = ''
    $scope.croppedImageUrlHide = true
    $scope.chooseImageBtnText = 'Choose Image'

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

    $scope.discardUpdateImage = function() {
      ImageService.deleteImage({path: $scope.originalImageUrl, crop_path: $scope.croppedImageUrl}, function(response) {
        $scope.originalImageUrl = ''
        $scope.originalImageUrlHide = true
        $scope.croppedImageUrl = ''
        $scope.croppedImageUrlHide = true
        uploader.clearQueue()
      })
    }

    function resetPasswords() {
      $scope.passwords = {}
      $scope.passwords['newPassword'] = null
      $scope.passwords['confirmNewPassword'] = null
    }

    resetPasswords()

    $scope.updateUser = function() {
      if (!$scope.isChangeingProfile) {
        return
      }

      clearErr()

      var firstname = $scope.detailUser.local.firstname
      var lastname = $scope.detailUser.local.lastname
      var email = $scope.detailUser.local.email
      var newPassword = $scope.passwords.newPassword
      var confirmNewPassword = $scope.passwords.confirmNewPassword
      var businessname = $scope.detailUser.enterprise.businessname
      var address = $scope.detailUser.enterprise.address

      if (isEmpty($scope.croppedImageUrl) && !isEmpty($scope.originalImageUrl)) {
        logErr('Please cut your uploaded image.')
        return
      }

      if ($scope.isChangeingPassword && newPassword && newPassword != confirmNewPassword) {
        logErr('Password not match.')
        return
      }

      var updateAttrs = {}

      if (!isEmpty(firstname) && firstname != copiedDetailUser.local.firstname) {
        updateAttrs.firstname = firstname
      }

      if (!isEmpty(lastname) && lastname != copiedDetailUser.local.lastname) {
        updateAttrs.lastname = lastname
      }

      if (!isEmpty(email) && email != copiedDetailUser.local.email) {
        updateAttrs.email = email
      }

      if (!isEmpty(newPassword)) {
        updateAttrs.newPassword = newPassword
      }

      if (!isEmpty($scope.croppedImageUrl)) {
        updateAttrs.imageUrl = $scope.croppedImageUrl
      }

      if (!isEmpty(businessname)) {
        updateAttrs.businessname = businessname
      }

      if (!isEmpty(address)) {
        updateAttrs.address = address
      }

      UserService.updateUser($scope.user._id, updateAttrs, function(response) {
        $scope.detailUser = response.user
        $scope.user = response.user
        $rootScope.user = response.user
        clearErr()
        $scope.croppedImageUrl = ''
        $scope.discardUpdateImage()
        resetPasswords()
        $scope.isChangeingPassword = false
        $scope.isChangeingProfile = false
      })
    }

    $scope.deletePost = function(postId) {
      PostService.deletePost($scope.user._id, postId, function(response) {
        loadDetailUser()
      })

    }

    $window.onbeforeunload =  function() {
      ImageService.deleteImage({path: $scope.originalImageUrl, crop_path: $scope.croppedImageUrl}, function(response) {
      })
    }

    $scope.avatarUrlHelper = function(url) {
      if (url == '') {
        return 'img/default.jpeg'
      }
      return url
    }

    $scope.replyContents = {'content': '', 'commentId': null, 'commentObj': null}

    $scope.calculateCommentRemainLength = function() {
      return 280 - $scope.replyContents['content'].length
    }

    $scope.sendComment = function(index){
      if (!($scope.replyContents['content'].length > 0 && $scope.replyContents['content'].length <= 280)) {
        return
      }
      var type = 'user'
      var objectId = $scope.detailUser._id
      var content = $scope.replyContents['content']
      var commentId = $scope.replyContents['commentId']
      CommentService.addNewCommentForType(type, objectId, content, commentId, function(response) {
        // clean up
        $scope.replyContents['content'] = ''
        $scope.replyContents['commentId'] = null
        $scope.replyContents['commentObj'] = null

        loadReplyOfPostAccoringToIndex(function() {
        })
      })
    }

    $scope.selectReplyComment = function(commentIndex) {
      $scope.replyContents['commentId'] = $scope.comments[commentIndex]._id
      $scope.replyContents['commentObj'] = $scope.comments[commentIndex]
    }

    function loadReplyOfPostAccoringToIndex(callback) {
      $scope.comments = []
      CommentService.getCommentForType('user', $scope.detailUser._id, function(response) {
        $scope.comments = response['comments']
        if (callback)
          callback()
      })
    }

    function isEmpty(str) {
      return (!str || typeof str === 'undefined' || str.trim() == '')
    }

    function logErr(err) {
      $scope.err = err
    }

    function clearErr(err) {
      $scope.err = null
    }
  })
})()
