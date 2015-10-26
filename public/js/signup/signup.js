var x = null
var y = null
var width = null
var height = null

$('document').ready(function() {
  setCropper()
})

function setCropper() {
  $('#avatarOriginalImg').cropper({
    aspectRatio: 1 / 1,
    autoCropArea: 1.0,
    strict: true,
    guides: true,
    highlight: false,
    dragCrop: false,
    cropBoxMovable: true,
    cropBoxResizable: true,
    crop: function(e) {
      x = e.x
      y = e.y
      width = e.width
      height = e.height
    }
  })
}

function replaceUrl(newUrl) {
  $('#avatarOriginalImg').cropper('replace', newUrl)
}
