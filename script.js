
// web api keys
=======
//api tests

//keys


var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0'
var parkCode = 'ARCH,AZRU,BAND,BRCA,CAGR,CANY,CARE,CAVE,CEBR,CHAM,CHCU,CHIR,CORO,CURE,DEPO,DEVA,ELMA,ELMO,FLFO,FOBO,GICL,GLCA,GRBA,GRCA,GRSA,GUMO,HOVE,JOTR,KICA,LAKE,MANZ,MEVE,MOJA,NABR,ORPI,PARA,PECO,PEFO,PETR,PIMA,PISP,SAGU,SAPU,SEQU,SUCR,TONT,TUMA,WACA,WHSA,WUPA,YOSE,YUHO,ZION,CALI,ELCA,JUBA,OLSP,POEX,SAFE,';

var stateCode = 'AL,AK,AZ,AR,CA,CZ,CO,CT,DE,DC,FL,GA,GU,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MS,MO,MT,NE,NV,	NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,PR,RI,SC,SD,TN,TX,UT,VT,VI,VA,WA,WV,WI,WY';


var obj = {};


stateSearch();
function stateSearch () {

  var activityInput = document.querySelector('.activity-input')
  console.log(activityInput);

  $.ajax({
    

          type: "GET",
          url: `https://developer.nps.gov/api/v1/parks?parkCode=${stateCode}&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q`,
          
          success: function(data) {
            console.log(data);

            var activityEl = data.data[0].activities[0].name;
            console.log(activityEl);
            

let startBtn = document.getElementById('stateButton');
let returnBtn = document.getElementById('returnButton');
let activityCard = document.getElementById('activity-card');


// button that gets the value fromt the dropdown list 
startBtn.addEventListener('click', function(){
  let userInput = $('#myDropdown :selected').val();
  console.log(userInput);

  // hides the dropdown list and the button 
  $('.dropdown').hide()
  $('.returnButton').show()
=======
          }
        });
      }


  stateSearch(userInput)
})

returnBtn.addEventListener('click', function(){
  location.reload();
})


// this function will fetch the data for the google maps and display the activities 
function stateSearch (state) {
  $('#map').show();

  var activityInput = document.querySelector('.activity-input')

var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

parkSearch();
function parkSearch() {
  var activityInput = document.querySelector(".activity-input");

  console.log(activityInput);


  $.ajax({
    type: "GET",
    url: "https://developer.nps.gov/api/v1/parks?parkCode=acad&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q",


          type: "GET",

          url: "https://developer.nps.gov/api/v1/parks?parkCode=" + state + "&api_key=" + apiKeyNPS, 
          

          url: `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q`,

          
          success: function(data) {
            console.log(data);
            

            // attempting to display hawaii on array 6 and create a p element to append the url text
            for (let i = 0; i < data.data.length; i++){
            if (state === data.data[i].states) {
              // this variable will contain the coordinates for the google maps api 
              let {latitude, longitude} = data.data[i];
              let {url} = data.data[i];
              
              // creates p elements 
              let createP = document.createElement('p');
              let createP2 = document.createElement('p');
              $(createP2).html($(`<a href="${url}">Link to ${data.data[i].name} Park</a>`));
              
              // creates div elements to append other elements to 
              let createDiv = document.createElement('div');
              let createDiv2 = document.createElement('div');

              // this div will append the url link -- needs to be here so it doesnt get created multiple times 
              let createDiv3 = document.createElement('div');
              createDiv3.append(createP2);
              activityCard.append(createDiv3);


              // this creates an image tag with the src attribute for the image 
              let createImg = document.createElement('img');
              createImg.setAttribute('src', "")
              createImg.src = data.data[i].images[0].url
              createDiv2.append(createImg);
              activityCard.append(createDiv2);
              
              // this for loop specifies the array within the data array 
              for (let j = 0; j < data.data[i].activities.length; j++){

            var activityEl = data.data[0].activities[0].name;
            console.log(activityEl);
            


                // these elements get the specified data 
                createP = data.data[i].activities[j].name
                

                // these elements are getting appeneded to separate divs 
                createDiv.append(createP);
                
              
                // these elements are getting appended to the card 
                
                activityCard.append(createDiv);
                

              }

              // this invokes the apiGoogleMaps with the specified coords 
              mapApi(latitude, longitude);
            }
          }
          }
        });
      }



    success: function (data) {
      console.log(data);

}

      var activityEl = data.data[0].activities[0].name;
      console.log(activityEl);
    },
  });
}



      function mapApi(lat, lon) {
        const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 8,
        mapId: "2f72557b09a6245f"
      });
      console.log(lat, lon);
      const geocoder = new google.maps.Geocoder();
    
      geocoder
        .geocode({ address: "US" })
        .then((response) => {
          const position = response.results[0].geometry.location;
    
          map.setCenter(new google.maps.LatLng(lat, lon));
          new google.maps.Marker({
            map,
            position,
          });
        })
        .catch((e) =>
          window.alert("Geocode was not successful for the following reason: " + e)
        );
    }
    
    // hides elements until function is called 
    $(document).ready(function(){
      $('#map').hide();
      $('.returnButton').hide()
    })