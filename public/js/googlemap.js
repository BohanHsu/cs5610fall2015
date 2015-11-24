function initializeMap() {
  var mapProp = {
    center:new google.maps.LatLng(51.508742,-0.120850),
    zoom:5,
    mapTypeId:google.maps.MapTypeId.ROADMAP
  }
  var map=new google.maps.Map(document.getElementById("map"), mapProp)
}


var geocoder, map
var addr

function setAddr(address) {
  addr = address
}

function initializeMap1() {
  console.log(addr)
  //var address = '10 Summer Street, Malden, MA, 02148'
  var address = addr
  geocoder = new google.maps.Geocoder()
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var myOptions = {
        zoom: 15,
        center: results[0].geometry.location,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      map = new google.maps.Map(document.getElementById("map"), myOptions)

      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location
      })
    }
  })
}
