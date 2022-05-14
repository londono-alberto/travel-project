//api tests

//keys
var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0'



parkSearch();
function parkSearch () {

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