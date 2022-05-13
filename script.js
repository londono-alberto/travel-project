//api tests

//keys
var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyANs7_bUSQwJLstuc8C2Z8YXADY8zJEm5c'



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


testNationalPark();
function testNationalPark () {

  // var nationalInput = $('#nationalInput').val();
  // console.log(nationalInput);


  $.ajax({

          type: "GET",
          url: 'https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q',
          
          success: function(data) {
            
            
            console.log(data);

          }
        });
      }







$('#submitBtn').click(function(){
    testApiWeather();

  });