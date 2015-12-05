function scrollToTop() {
  var sh = $('#scrollPanel').scrollTop()
  var step = sh / 100.0

  function scrollUp() {
    if ($('#scrollPanel').scrollTop() - step > 0) {
      setTimeout(function() {
        $('#scrollPanel').scrollTop($('#scrollPanel').scrollTop() - step)
        scrollUp()
      }, 2)
    } else {
      $('#scrollPanel').scrollTop(0)
    }
  }

  scrollUp()

}
