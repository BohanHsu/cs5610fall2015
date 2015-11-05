(function() {
  angular
    .module('TasteOfApp')
    .controller('RecipeController', function($scope, FileUploader) {
      $scope.recipeName = ''
      $scope.ingredientName = ''
      $scope.ingredientAmount = ''
      $scope.nextstep = ''
      //$scope.nextstepImage = ''
      $scope.nextstepUploadedImage = ''
      $scope.ingredients = []
      $scope.steps = []
      //setPath('img/default.jpeg')
      //setPreview()

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
         //ImageService.deleteImage({path: $scope.originalImageUrl, crop_path: $scope.croppedImageUrl}, function(response) {
         //  uploader.uploadAll()
         //})
         console.log(fileItem)
         uploader.uploadAll()
       }

      uploader.onCompleteItem = function(fileItem, response, status, headers) {
        //$scope.originalImageUrlHide = false
        //$scope.croppedImageUrlHide = true
        //$scope.originalImageUrl = response['imageUrl']
        //$scope.chooseImageBtnText = 'Change Image'
        //replaceUrl($scope.originalImageUrl)

        console.log(response)

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
      }

      $scope.deleteStep = function(idx) {
        $scope.steps.splice(idx, 1)
      }
    })
})()
