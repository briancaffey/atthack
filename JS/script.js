var $response = document.getElementById("response");
var $getReposBtn = document.getElementById("get-repos");

var promise = new Promise(function(resolve, reject) {
  //function length(obj) {
  //return Object.keys(obj).length;
  //
  var xhr = new XMLHttpRequest();

  xhr.timeout = 2000;

  xhr.onreadystatechange = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {


        // debugger;
        // console.log(xhr.response);
        //alert(xhr.response);
        var j = JSON.parse(xhr.response);
        $response.innerHTML = j.results;
        resolve(j.results);


      } else {
        alert("err")
        console.error("XHR didn't work: ", xhr.status);
        reject("err");
      }
    }
  }
  xhr.ontimeout = function() {
    console.error("request timedout: ", xhr);
  }
  xhr.open("get", "https://api.parse.com/1/classes/Data", /*async*/ true);
  xhr.setRequestHeader("X-Parse-Application-Id", "KEznnlIov011D9zm2Bvvtwo2GATWKGBYzUyOOTNP");
  xhr.setRequestHeader("X-Parse-REST-API-Key", "D5fL2CK9xeMKZhxL9vVHyfMz8Uno59df96692FhA");
  xhr.send();
});

//"https://gist.githubusercontent.com/briancaffey/e5bd1b92137f1a058bd4baf946de9592/raw/7085eed766bd0fcf5eeac61d643fc372a4fefd60/test1.json"



promise.then(function(result) {
  window.eqfeed_callback = function(results) {

    var coords = result;

    alert(result);



    var count = coords.length;
    // for (var i = 0; i < count-1; i++) {




    alert(count);




    //  alert("count of points: " + count)
    for (var i = 0; i < count; i++) {
      var coord = coords[i].geo;
      //alert(coords);    [0].geometry.coordinates
      //alert(features);
      //alert(length(coords));
      var latLng = new google.maps.LatLng(coord.latitude, coord.longitude);
      var marker = new google.maps.Marker({
        position: latLng,
        map: map
      });
    }

  }
});



var map;

function initialize() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(38.921217, -77.020462),
    mapTypeId: 'terrain'
  });

  // Create a <script> tag and set the USGS URL as the source.
  var script = document.createElement('script');
  // (In this example we use a locally stored copy instead.)
  // script.src = 'http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.geojsonp';
  script.src = 'https://developers.google.com/maps/documentation/javascript/tutorials/js/earthquake_GeoJSONP.js';
  document.getElementsByTagName('head')[0].appendChild(script);
}

// Loop through the results array and place a marker for each
// set of coordinates.
