(function() {
  angular
  .module('TasteOfApp')
  .controller('PostController', function($scope, $rootScope, $routeParams, PostService, CommentService) {
    if ($routeParams.commentId) {
      $scope.highlightCommentId = $routeParams.commentId
    } else {
      $scope.highlightCommentId = null
    }

    var postId = $routeParams['id']
    $scope.user = $rootScope.user

    $scope.replys = {}
    $scope.replyContents = {}

    PostService.loadPostById($scope.user._id, postId, function(response) {
      var post = response.post
      $scope.post = response.post
      $scope.posts = [response.post]
      $scope.replyContents[post._id] = {'content': '', 'commentId': null}

      $scope.recipeIndex = 0
      $scope.viewingRecipe = post.recipe_id

      loadReplyOfPostAccoringToIndex(0)
    })

    function loadReplyOfPostAccoringToIndex(index, callback) {
      $scope.replys[$scope.posts[index]._id] = []
      CommentService.getCommentForType('post', $scope.posts[index]._id, function(response) {
        console.log(response)
        $scope.replys[$scope.posts[index]._id] = response['comments']
        if (callback)
          callback()
      })
    }

    $scope.selectReplyComment = function(postIndex, commentIndex) {
      $scope.replyContents[$scope.posts[postIndex]._id]['commentId'] = $scope.replys[$scope.posts[postIndex]._id][commentIndex]._id
      $scope.replyContents[$scope.posts[postIndex]._id]['commentObj'] = $scope.replys[$scope.posts[postIndex]._id][commentIndex]
      console.log($scope.replyContents[$scope.posts[postIndex]._id]['commentId'])
    }

    $scope.calculateCommentRemainLength = function(index) {
      return 280 - $scope.replyContents[$scope.posts[index]._id]['content'].length
    }

    $scope.sendComment = function(index){
      if (!($scope.replyContents[$scope.posts[index]._id]['content'].length > 0 && $scope.replyContents[$scope.posts[index]._id]['content'].length <= 280)) {
        return
      }
      var type = 'post'
      var objectId = $scope.posts[index]._id
      var content = $scope.replyContents[$scope.posts[index]._id]['content']
      var commentId = $scope.replyContents[$scope.posts[index]._id]['commentId']
      console.log('ojId', objectId, 'content', content, 'commentId', commentId)
      CommentService.addNewCommentForType(type, objectId, content, commentId, function(response) {
        console.log(response)
        // clean up
        $scope.replyContents[$scope.posts[index]._id]['content'] = ''
        $scope.replyContents[$scope.posts[index]._id]['commentId'] = null
        $scope.replyContents[$scope.posts[index]._id]['commentObj'] = null
        loadReplyOfPostAccoringToIndex(index)
      })
    }

    $scope.avatarUrlHelper = function(url) {
      if (url == '') {
        return 'img/default-avatar.png'
      }
      return url
    }
  })
})()
