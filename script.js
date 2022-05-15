//api tests

//keys

var apiKeyWeather = 'b6a631faf48ec36736fa91299da2f0a2';
var apiKeyNPS = 'UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q';
var apiGoogleMaps = 'AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0'
var parkCode = 'ARCH,AZRU,BAND,BRCA,CAGR,CANY,CARE,CAVE,CEBR,CHAM,CHCU,CHIR,CORO,CURE,DEPO,DEVA,ELMA,ELMO,FLFO,FOBO,GICL,GLCA,GRBA,GRCA,GRSA,GUMO,HOVE,JOTR,KICA,LAKE,MANZ,MEVE,MOJA,NABR,ORPI,PARA,PECO,PEFO,PETR,PIMA,PISP,SAGU,SAPU,SEQU,SUCR,TONT,TUMA,WACA,WHSA,WUPA,YOSE,YUHO,ZION,CALI,ELCA,JUBA,OLSP,POEX,SAFE,';

var stateCode = 'AL,AK,AZ,AR,CA,CZ,CO,CT,DE,DC,FL,GA,GU,HI,ID,IL,IN,IA,KS,KY,LA,ME,MD,MA,MI,MS,MO,MT,NE,NV,	NH,NJ,NM,NY,NC,ND,OH,OK,OR,PA,PR,RI,SC,SD,TN,TX,UT,VT,VI,VA,WA,WV,WI,WY';
let startBtn = document.getElementById('stateButton');

var obj = {};

// stateSearch and parkSearch have the same api. what for? 
// can remove the local variables in parkSearch since they are global 

// button that gets the value fromt the dropdown list 
startBtn.addEventListener('click', function(){
  let userInput = $('#myDropdown :selected').val();
  console.log(userInput);
})

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
            

          }
        });
      }


parkSearch();
function parkSearch () {

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
          url: `https://developer.nps.gov/api/v1/parks?parkCode=${parkCode}&api_key=UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q`,
          
          success: function(data) {
            console.log(data);

            var activityEl = data.data[0].activities[0].name;
            console.log(activityEl);
            

          }
        });
      }

      // var activityEl = data.data[0].activities[0].name;
      // console.log(activityEl);
}