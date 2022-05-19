// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startButton = document.getElementById("stateButton");
let parkButton = document.getElementById("parkList");
let searchCard = document.getElementById("search-history");

function parkDisplay(park) {
  $.ajax({
    type: "GET",
    url:
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
      park +
      "&api_key=" +
      apiKeyNPS,

    success: function (data) {
      console.log(data);
      // attempting to display hawaii on array 6 and create a p element to append the url text

      let latitude = data.data[0].latitude;
      let longitude = data.data[0].longitude;
      let parkCity = data.data[0].addresses[0].city;
      let parkName = data.data[0].name;

      for (let i = 0; i < data.data.length; i++) {
        // if statement to specify the state being selected within the array
        if (park === data.data[0].parkCode) {
          // get the url data
          let { urlPark } = data.data[0];

          // this div will append the url link -- needs to be here so it doesnt get created multiple times
          let createDiv = document.createElement("div");

          let createP = document.createElement("p");
          $(createP).html(
            $(`<a href="${urlPark}">Link to ${data.data[0].name} Park</a>`)
          );
          createDiv.append(createP);
          activityCard.append(createDiv);

          // this for loop specifies the array within the data array
          for (let j = 0; j < data.data[i].activities.length; j++) {
            // creates div elements to append other elements to
            let createDiv2 = document.createElement("div");

            // creates p elements
            let createP2 = document.createElement("p");

            // this p element is getting the specified data
            createP2.textContent = data.data[i].activities[j].name;

            // this element is getting appeneded to the div
            createDiv2.append(createP2);

            // this element is getting appended to the card
            activityCard.append(createDiv2);
          }

          for (let k = 0; k < data.data[i].images.length; k++) {
            // this variable stores the image urls
            let { url } = data.data[i].images[k];

            // this pushes the data into an empty array
            parkImages.push(url);
            console.log(parkImages);
          }
        }
      }
      $(`.weather-dash`).empty();
      mapApi(latitude, longitude);
      weatherDisplay(parkCity, parkName);
    },
  });
}

function mapApi(lat, lon) {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    mapId: "2f72557b09a6245f",
  });

  const geocoder = new google.maps.Geocoder();

  geocoder.geocode({ address: "US" }).then((response) => {
    const position = response.results[0].geometry.location;

    map.setCenter(new google.maps.LatLng(lat, lon));
    new google.maps.Marker({
      map,
      position,
    });

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
        window.alert(
          "Geocode was not successful for the following reason: " + e
        )
      );
  });
}

//weather display----------------------
function weatherDisplay(city, park) {
  var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";

  $.ajax({
    type: "GET",
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&APPID=${apiKeyWeather}`,
    id: "city",
  }).then(function (data) {
    $(".weatherTitle").text(`${park} Park Five Day Forecast`);

    for (i = 5; i < 45; i += 8) {
      var forecastCard = $('<div class = "card col">');
      var forecastTitle = $('<p class = "castDate">');
      var forecastTemp = $('<p class = "temp">');
      var forecastWind = $('<p class = "wind">');
      var forecastHumidity = $('<p class = "humid">');

      var date = new Date(data.list[i].dt * 1000).toLocaleDateString("en-US");
      iconData = `<img src="https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}.png"/>`;
      forecastTitle.html(`${date} ${iconData}`);
      forecastTemp.text(`Temperature: ${data.list[i].main.temp}`);
      forecastWind.text(`Wind: ${data.list[i].wind.speed}`);
      forecastHumidity.text(`Humidity: ${data.list[i].main.humidity}`);

      $(`.weather-dash`).append(forecastCard);
      forecastCard.append(forecastTitle);
      forecastCard.append(forecastTemp);
      forecastCard.append(forecastWind);
      forecastCard.append(forecastHumidity);
    }
  });
}

// variables to link the html to js
const weatherBtn = document.getElementById("weather-btn");
const closeBtn = document.getElementById("close-btn");
const weatherDash = document.getElementById("weather-dash");

// button to show the weather
weatherBtn.addEventListener("click", () =>
  weatherDash.classList.toggle("show")
);

// button to hide the weather
closeBtn.addEventListener("click", () => weatherDash.classList.remove("show"));
//weather display-----------------------

