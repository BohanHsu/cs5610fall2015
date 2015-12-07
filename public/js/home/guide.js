var test1 = {
  username: 'test1',
  password: 'test1'
}

var test2 = {
  username: 'test2',
  password: 'test2'
}

function loginastest(i) {
  var users = [test1, test2]
  $.ajax({
    type: "POST",
    url: '/login',
    data: users[i],
    success: function(response) {
      console.log(response)
      if (response.success) {
        window.open(window.location.pathname, '_blank');
      }
    }
  })
}

function loginastest1() {
  loginastest(0)
}

function loginastest2() {
  loginastest(1)
}
