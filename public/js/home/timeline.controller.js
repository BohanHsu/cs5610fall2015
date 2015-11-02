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
      $scope.post = ''
      $scope.timelineViewMoreHide = false
      $scope.currentPage = 1

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
          return [cpg - 1, cpg, cpg + 1]
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
    })
})()
