(function() {
  angular
    .module('TasteOfApp')
    .controller('RecipeController', function($scope, $rootScope, $window, FileUploader, ImageService, PostService) {
      $scope.user = $rootScope.user
      $scope.recipeName = ''
      $scope.ingredientName = ''
      $scope.ingredientAmount = ''
      $scope.nextstep = ''
      $scope.nextstepUploadedImage = ''
      $scope.ingredients = []
      $scope.steps = []

      var uploader = $scope.uploader = new FileUploader({
        url: '/api/image/post/addphoto',
      })

      uploader.filters.push({
        name: 'customFilter',
        fn: function(item /*{File|FileLikeObject}*/, options) {
            return this.queue.length < 1
        }
      })

      uploader.onAfterAddingFile = function(fileItem) {
        if ($scope.nextstepUploadedImage != '') {
          ImageService.deleteImage({path: $scope.nextstepUploadedImage}, function(response) {
            uploader.uploadAll()
          })
        } else {
          uploader.uploadAll()
        }
      }

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        if ($scope.nextstepUploadedImage == '') {
          setPreview()
        }

        $scope.nextstepUploadedImage = response.imageUrl

        setPath($scope.nextstepUploadedImage)
        uploader.clearQueue()
      }

      $scope.addIngredient = function() {
        $scope.ingredients.push([$scope.ingredientName, $scope.ingredientAmount])
        console.log($scope.ingredients)
        $scope.ingredientName = ''
        $scope.ingredientAmount = ''
      }

      $scope.deleteIngredient = function(idx) {
        console.log(idx)
        $scope.ingredients.splice(idx, 1)
      }

      $scope.addImage = function() {
        console.log('hehe')
      }

      $scope.addStep = function() {
        $scope.steps.push([
          $scope.nextstep,
          $scope.nextstepUploadedImage
        ])
        console.log($scope.steps)
        $scope.nextstep = ''
        $scope.nextstepUploadedImage = ''
        resetPreview()
      }

      $scope.deleteStep = function(idx) {
        var imgUrl = $scope.steps[idx][1]
        $scope.steps.splice(idx, 1)
        if (imgUrl != '') {
          ImageService.deleteImage({path: imgUrl}, function(response) {})
        }
      }

      $scope.postRecipe = function() {
        if (recipeName != '') {
          PostService.sendRecipe($scope.user, $scope.recipeName, $scope.ingredients, $scope.steps, function(response) {
            console.log(response)

            $scope.recipeName = ''
            $scope.ingredientName = ''
            $scope.ingredientAmount = ''
            $scope.nextstep = ''
            $scope.nextstepUploadedImage = ''
            $scope.ingredients = []
            $scope.steps = []

            console.log('before toggle')
            $('#recipeModal').modal('toggle')
            $rootScope.$emit('rootScope:emit', 'postRecipe')
            if ($scope.nextstepUploadedImage && $scope.nextstepUploadedImage != '') {
              ImageService.deleteImage({path: $scope.nextstepUploadedImage}, function(response) {
                return
              })
            }
          })
        }
      }

      $window.onbeforeunload =  function() {
        $scope.steps.forEach(function(ele, idx, arr) {
          ImageService.deleteImage({path: ele[1]}, function(response) {
            return
          })
          return
        })
        ImageService.deleteImage({path: $scope.nextstepUploadedImage}, function(response) {
          return
        })
      }
    })
})()
