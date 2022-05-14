//api tests

//keys
var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0'



// testApiWeather();
function testApiWeather () {
  

  var cityInput = $('#cityInput').val();
  console.log(cityInput);

  $.ajax({

          type: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&APPID=${apiKeyWeather}`,
          id: "city",
          success: function(data) {
            
            
            console.log(data);

          }
        });
      }

//prescription trails- still need to get api to work
// testApiTrails();
// function testApiTrails () {

//   var trailInput = $('#trailInput').val();
//   console.log(trailInput);


//   $.ajax({

//           type: "GET",
//           url: 'https://prescriptiontrails.org/api/filter/?zip=87102&by=zip&offset=0&count=6',
          
//           success: function(data) {
            
            
//             console.log(data);

//           }
//         });
//       }


parkSearch();
function parkSearch () {

  // var nationalInput = $('#nationalInput').val();
  // console.log(nationalInput);
  var activityInput = document.querySelector('.activity-input')
  console.log(activityInput);

  $.ajax({
    

          type: "GET",
          url: 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q',
          
          success: function(data) {
            console.log(data);

            var activityEl = data.data[0].activities[0].name;
            console.log(activityEl);

          }
        });
      }


//google maps----------------------

/*
 * This demo demonstrates how to replace default map tiles with custom imagery.
 * In this case, the CoordMapType displays gray tiles annotated with the tile
 * coordinates.
 *
 * Try panning and zooming the map to see how the coordinates change.
 */
// class CoordMapType {
//   tileSize;
//   maxZoom = 19;
//   name = "Tile #s";
//   alt = "Tile Coordinate Map Type";
//   constructor(tileSize) {
//     this.tileSize = tileSize;
//   }
//   getTile(coord, zoom, ownerDocument) {
//     const div = ownerDocument.createElement("div");

//     div.innerHTML = String(coord);
//     div.style.width = this.tileSize.width + "px";
//     div.style.height = this.tileSize.height + "px";
//     div.style.fontSize = "10";
//     div.style.borderStyle = "solid";
//     div.style.borderWidth = "1px";
//     div.style.borderColor = "#AAAAAA";
//     div.style.backgroundColor = "#E5E3DF";
//     return div;
//   }
//   releaseTile(tile) {}
// }

// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 10,
//     center: { lat: 41.85, lng: -87.65 },
//     streetViewControl: false,
//     mapTypeId: "coordinate",
//     mapTypeControlOptions: {
//       mapTypeIds: ["coordinate", "roadmap"],
//       style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
//     },
//   });

//   map.addListener("maptypeid_changed", () => {
//     const showStreetViewControl = map.getMapTypeId() !== "coordinate";

//     map.setOptions({
//       streetViewControl: showStreetViewControl,
//     });
//   });
//   // Now attach the coordinate map type to the map's registry.
//   map.mapTypes.set(
//     "coordinate",
//     new CoordMapType(new google.maps.Size(256, 256))
//   );
// }

// window.initMap = initMap;



// $('#submitBtn').click(function(){
//     testApiWeather();

//   });

$('#submitBtn').click(function(){
    parkSearch();

});