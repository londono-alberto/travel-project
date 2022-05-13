//api tests

testApiWeather();
function testApiWeather () {
  const apiKey = 'b6a631faf48ec36736fa91299da2f0a2';

  var cityInput = $('#cityInput').val();
  console.log(cityInput);

  $.ajax({

          type: "GET",
          url: `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&units=imperial&APPID=${apiKey}`,
          id: "city",
          success: function(data) {
            
            
            console.log(data);

          }
        });
      }


testApiTrails();
function testApiTrails () {


  $.ajax({

          type: "GET",
          id: 2,
          url: 'https://prescriptiontrails.org/api/trail/?id=2',
          
          success: function(data) {
            
            
            console.log(data);

          }
        });
      }











$('#submitBtn').click(function(){
    testApiWeather();

  });
  //search with enter key
$('#cityInput').keypress(function(e){
  if(e.which === 13) {
    testApiWeather();
  }
});


$('#submitBtnTwo').click(function(){
    testApiTrails();

  });
  //search with enter key
$('#trailInput').keypress(function(e){
  if(e.which === 13) {
    testApiTrailsr();
  }
});