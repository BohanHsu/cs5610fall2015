function deleteImage(path) {
  $.ajax({
    method: 'POST',
    url: '/api/image/avatar/original/delete',
    data: {'path': path},
    success: function(response) {
      location.reload()
    }
  })
}
