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

    .controller('TimelineController', function($scope, $rootScope, PostService) {
      var postInPage = 20
      $scope.user = $rootScope.user
      $scope.post = ''
      $scope.timelineViewMoreHide = false
      $scope.currentPage = 1
      $posts = []

      function updatePostRemainLength() {
        $scope.postRemainLength = 280 - $scope.post.length
      }

      $scope.$watch('post', function(newValue, oldValue) {
        updatePostRemainLength()
      })

      $scope.clickViewMore = function() {
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
        console.log(user)
        console.log($scope.post)
        if (user && $scope.post != '') {
          PostService.sendPost(user, $scope.post, function(response) {
            console.log('response', response)
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
            }
            console.log(tweet_dict)

            response.posts.forEach(function(post) {
              if (post.post_type == 'tweet') {
                post['tweet'] = tweet_dict[post.tweet_id]
              }
            })

            console.log(response)
            $scope.response = response
            $scope.posts = response.posts
            $scope.totalPost = response.totalCnt
          })
        }
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
    })
})()
