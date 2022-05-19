// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startButton = document.getElementById("stateButton");

// when the items from the search history is clicked, the following function performs
searchCard.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  let oldState = element.textContent;

  $.ajax({
    type: "GET",
    url:
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
      oldState +
      "&api_key=" +
      apiKeyNPS,

    success: function (data) {
      for (let i = 0; i < data.data.length; i++) {
        if (oldState === data.data[i].states) {
          // this variable will contain the coordinates for the google maps api
          let { latitude, longitude } = data.data[i];
          let { city } = data.data[i].addresses[0];
          let { name } = data.data[i];

          // these functions will be invoked with the following arguments
          mapApi(latitude, longitude);
          weatherDisplay(city, name);
        }
      }
    },
  });
});

let searchCard = document.getElementById("search-history");

startButton.addEventListener("click", function () {
  let state = $("#myDropdown :selected").val();

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
          let parkCity = data.data[i].addresses[0].city;
          let parkName = data.data[i].name;

          // these functions will be invoked with the following arguments
          mapApi(latitude, longitude);
          weatherDisplay(parkCity, parkName);
        }
      }
    },
  });
});

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
