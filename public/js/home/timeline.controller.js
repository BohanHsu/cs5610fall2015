(function() {
  angular
  .module('TasteOfApp')
  .directive('adjustTextarea', function() {    

    function adjustingTextArea(scope, element, attrs, event) {
      if (event.keyCode == 8) {
        while (true) {
          element.css('height', (parseInt(element.css('height')) - 2) + 'px')
          if (element.context.scrollHeight + 4 > parseInt(element.css('height')) || parseInt(element.css('height')) <= parseInt(element.css('minHeight'))) {
            element.css('height', (parseInt(element.css('height')) + 2) + 'px')
            break
          }
        }
      }

      var realHeight = parseInt(element.css('height'))
      var scrollHeight = element.context.scrollHeight
      if (scrollHeight + 4 > realHeight) {
        element.css('height', (scrollHeight + 4) + 'px')
      }
    }

    return {
      restrict: 'A',
      scope:{'adjustTextarea':'=' },
      link: function(scope, element, attrs) {            

        element.on('keydown', function(event) {
          adjustingTextArea(scope, element, attrs, event)
        })

        element.on('keyup', function(event) {
          adjustingTextArea(scope, element, attrs, event)
        })
      }
    }})

    .controller('TimelineController', function($scope, $rootScope, PostService, CommentService) {
      var postInPage = 20
      $scope.user = $rootScope.user
      $scope.post = ''
      $scope.timelineViewMoreHide = true
      $scope.currentPage = 1

      $rootScope.$on('rootScope:emit', function (event, data) {
        console.log(data); // 'Emit!'
        console.log(event)
        $scope.timelineViewMoreHide = false
      })

      function updatePostRemainLength() {
        $scope.postRemainLength = 280 - $scope.post.length
      }

      $scope.$watch('post', function(newValue, oldValue) {
        updatePostRemainLength()
      })

      $scope.clickViewMore = function() {
        $scope.loadPost()
        $scope.timelineViewMoreHide = true
      }

      $scope.getPageScope = function() {
        var cpg = $scope.currentPage
        if (cpg == 1) {
          return [1, 2]
        } else {
          if ($scope.currentPage * postInPage < $scope.totalPost) {
            return [cpg - 1, cpg, cpg + 1]
          } else {
            return [cpg - 1, cpg]
          }
        }
      }

      $scope.changePage = function(pageindex) {
        if ($scope.currentPage != pageindex) {
          $scope.currentPage = pageindex
          console.log(pageindex)
        }
      }

      $scope.nextPage = function() {
        $scope.currentPage = $scope.currentPage + 1
      }

      $scope.prevPage = function() {
        if ($scope.currentPage > 1) {
          $scope.currentPage = $scope.currentPage - 1
        }
      }

      $scope.nextPageDisable = function() {
          if ($scope.currentPage * postInPage < $scope.totalPost) {
            return false
          }
          return true
      }

      $scope.sendPost = function() {
        var user = $rootScope.user
        if (user && $scope.post != '') {
          PostService.sendPost(user, $scope.post, function(response) {
            $scope.post = ''
            $rootScope.$emit('rootScope:emit', 'postTweet')
          })
        }
      }

      $scope.loadPost = function() {
        var user = $rootScope.user
        if (user) {
          PostService.loadPost(user, $scope.currentPage, postInPage, function(response) {
            console.log(response)

            if (response.success) {
              tweet_dict = {}
              response.tweets.forEach(function(element) {
                tweet_dict[element._id] = element
              })
              response['tweet_dict'] = tweet_dict

              recipe_dict = {}
              response.recipes.forEach(function(element) {
                recipe_dict[element._id] = element
              })
              response['recipe_dict'] = recipe_dict
            }

            response.posts.forEach(function(post) {
              if (post.post_type == 'tweet') {
                post['tweet'] = tweet_dict[post.tweet_id]
              }
            })

            response.posts.forEach(function(post) {
              if (post.post_type == 'recipe') {
                post['recipe'] = recipe_dict[post.recipe_id]
              }
            })

            $scope.response = response
            $scope.posts = response.posts
            $scope.replys = {}
            $scope.replyContents = {}
            $scope.posts.forEach(function(ele, idx, arr) {
              $scope.replys[ele._id] = null
              $scope.replyContents[ele._id] = {'content': '', 'commentId': null}
            })
            $scope.totalPost = response.totalCnt
          })
        }
      }

      $scope.viewRecipe = function(index) {
        $scope.recipeIndex = index
        loadReplyOfPostAccoringToIndex(index, function() {
          $scope.recipeIndex = index
          $scope.viewingRecipe = $scope.posts[index].recipe_id
        })
      }

      $scope.$watch('currentPage', function(newValue, oldValue) {
        scrollToTop()
        $scope.loadPost()
      })

      $scope.avatarUrlHelper = function(url) {
        if (url == '') {
          return 'img/default.jpeg'
        }
        return url
      }

      $scope.replyHide = function(index) {
        return $scope.replys[$scope.posts[index]._id] == null
      }

      $scope.openReplyPanel = function(index) {
        loadReplyOfPostAccoringToIndex(index)
      }

      function loadReplyOfPostAccoringToIndex(index, callback) {
        $scope.replys[$scope.posts[index]._id] = []
        CommentService.getCommentForType('post', $scope.posts[index]._id, function(response) {
          console.log(response)
          $scope.replys[$scope.posts[index]._id] = response['comments']
          if (callback)
            callback()
        })
      }

      $scope.closeReplyPanel = function(index) {
        $scope.replys[$scope.posts[index]._id] = null
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

      $scope.selectReplyComment = function(postIndex, commentIndex) {
        $scope.replyContents[$scope.posts[postIndex]._id]['commentId'] = $scope.replys[$scope.posts[postIndex]._id][commentIndex]._id
        $scope.replyContents[$scope.posts[postIndex]._id]['commentObj'] = $scope.replys[$scope.posts[postIndex]._id][commentIndex]
        console.log($scope.replyContents[$scope.posts[postIndex]._id]['commentId'])
      }
    })
})()
