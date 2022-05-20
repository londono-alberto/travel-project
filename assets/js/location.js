// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

//--------------------PARK-------------------------
function parkDisplay(e) {
  // prevents event bubbling 
  e.stopPropagation();

  

  var element = e.target;
  var parkSave = e.target.textContent;
  var park = $(element).val();
  console.log(element);
  

  // Pushes the text into the localstorage array
  searchArray.push(parkSave);

  storeTodos();
  renderTodos();

  $("#map").show();
  $("#weather-btn").show();
  $("#parkList").hide();
  $(".container").show();
  $(".park-choice").hide();
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
      let parkFullName = data.data[0].fullName;
      let infoDesc = data.data[0].description;
      let parkState = data.data[0].states;
      let picDesignation = data.data[0].designation;
      let parkHours = data.data[0].operatingHours[0].description;
      let parkDirections = data.data[0].directionsInfo;
      let parkDirectionsUrl = data.data[0].directionsUrl;
      let parkEntranceFeesCost = data.data[0].entranceFees[0].cost;
      let parkEntranceFeesDesc = data.data[0].entranceFees[0].description;

      $(".parkTitle").text(`${parkFullName}`);
      $(".picDesignation").text(`${picDesignation}`);
      $(".desc-box").html(`<strong>About:</strong> ${infoDesc}`);
      $(".hours").html(`<strong>Operating Hours:</strong> ${parkHours}`);
      $(".directions").html(
        `<strong>Directions:</strong> ${parkDirections} <br> <a href=${parkDirectionsUrl}>NPS Directions</a>`
      );
      $(".fees").html(
        `<strong>Cost of Entry:</strong> $ ${parkEntranceFeesCost} <br> ${parkEntranceFeesDesc}`
      );

      $(".search-header").show();
      $(".clearBtn").hide();

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
            // console.log(parkImages);
          }
        }
      }
      $(`.weather-dash`).empty();
      initMap(latitude, longitude, parkCity, parkName, parkState);
      weatherDisplay(parkCity, parkName);
    },
  });
}
//--------------------END PARK-------------------------

//--------------------MAP-------------------------
function initMap(lat, lon, city, park, state) {
  //map options
  console.log(lat, lon);
  var options = {
    zoom: 9,
    mapId: "2f72557b09a6245f",
    center: { lat: +lat, lng: +lon },
  };

  var map = new google.maps.Map(document.getElementById("map"), options);

  var marker = new google.maps.Marker({
    position: { lat: +lat, lng: +lon },
    map: map,
    icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
  });
  var infoWindow = new google.maps.InfoWindow({
    content: `<h3>${park} Park</h3> <p>${city}, ${state}</p>`,
  });

  marker.addListener("click", function () {
    infoWindow.open(map, marker);
  });
}
//--------------------END MAP------------------------------

//--------------------WEATHER----------------------
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
  $("#close-btn").show()
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
//-------------------END WEATHER----------------------
