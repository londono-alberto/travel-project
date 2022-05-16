// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById("stateButton");
let returnBtn = document.getElementById("returnButton");
let activityCard = document.getElementById("activity-card");

// button that gets the value fromt the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();
  console.log(userInput);

  // hides the dropdown list and the button
  $(".dropdown").hide();
  $(".returnButton").show();

  stateSearch(userInput);
});

returnBtn.addEventListener("click", function () {
  location.reload();
});

// this function will fetch the data for the google maps and display the activities
function stateSearch(state) {
  $("#map").show();

  $.ajax({
    type: "GET",
    url:
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
      state +
      "&api_key=" +
      apiKeyNPS,

    success: function (data) {
      console.log(data);

      // attempting to display hawaii on array 6 and create a p element to append the url text
      for (let i = 0; i < data.data.length; i++) {
        if (state === data.data[i].states) {
          // this variable will contain the coordinates for the google maps api
          let { latitude, longitude } = data.data[i];
          let { url } = data.data[i];

          // creates p elements
          let createP = document.createElement("p");
          let createP2 = document.createElement("p");
          $(createP2).html(
            $(`<a href="${url}">Link to ${data.data[i].name} Park</a>`)
          );

          // creates div elements to append other elements to
          let createDiv = document.createElement("div");
          let createDiv2 = document.createElement("div");

          // this div will append the url link -- needs to be here so it doesnt get created multiple times
          let createDiv3 = document.createElement("div");
          createDiv3.append(createP2);
          activityCard.append(createDiv3);

          // this creates an image tag with the src attribute for the image
          let createImg = document.createElement("img");
          createImg.setAttribute("src", "");
          createImg.src = data.data[i].images[0].url;
          createDiv2.append(createImg);
          activityCard.append(createDiv2);

          // this for loop specifies the array within the data array
          for (let j = 0; j < data.data[i].activities.length; j++) {
            // these elements get the specified data
            createP = data.data[i].activities[j].name;

            // these elements are getting appeneded to separate divs
            createDiv.append(createP);

            // these elements are getting appended to the card

            activityCard.append(createDiv);
          }

          // this invokes the apiGoogleMaps with the specified coords
          mapApi(latitude, longitude);
        }
      }
    },
  });
}

function mapApi(lat, lon) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    mapId: "2f72557b09a6245f",
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
$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
});
