//api tests

//keys

var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0'

let startBtn = document.getElementById('stateButton');
let activityCard = document.getElementById('activity-card');

// button that gets the value fromt the dropdown list 
startBtn.addEventListener('click', function(){
  let userInput = $('#myDropdown :selected').val();
  console.log(userInput);

  // hides the dropdown list and the button 
  // $('.dropdown').hide()

  stateSearch(userInput)
})

// this function will fetch the data for the google maps and display the activities 
function stateSearch (state) {

  $.ajax({
    

          type: "GET",
          url: "https://developer.nps.gov/api/v1/parks?parkCode=" + state + "&api_key=" + apiKeyNPS, 
          
          
          success: function(data) {
            console.log(data);
            
// data.data[i].url 
            // attempting to display hawaii on array 6 and create a p element to append the url text
            for (let i = 0; i < data.data.length; i++){
            if (state === data.data[i].states) {
              // this variable will contain the coordinates for the google maps api 
              let {latitude, longitude} = data.data[i];
        
              let createP = document.createElement('p');
      
              let createDiv = document.createElement('div');
              let createDiv2 = document.createElement('div');

              let createImg = document.createElement('img');
              createImg.setAttribute('src', "")
        
// data.data[i].activities[i].name 
              for (let j = 0; j < data.data[i].activities.length; j++){
                createP = data.data[i].activities[j].name
                createImg.src = data.data[i].images[j].url

                createDiv.append(createP);
                createDiv2.append(createImg);
                activityCard.append(createDiv);
                activityCard.append(createDiv2);

              }

              // this invokes the apiGoogleMaps with the specified coords 
              // mapApi(latitude, longitude);
            }
          }
          }
        });
      }