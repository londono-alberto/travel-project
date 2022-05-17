// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById("stateButton");
let returnBtn = document.getElementById("returnButton");
let activityCard = document.getElementById("activity-card");
let searchBoard = document.getElementById("search-history");

// button that gets the value fromt the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();
  console.log(userInput);

  // hides the dropdown list and the button
  $(".dropdown").hide();
  $(".returnButton").show();

  // Pushes the text into the array
  searchArray.push(userInput);

  stateSearch(userInput);
  storeTodos();
  renderTodos();
});

returnBtn.addEventListener("click", function () {
  location.reload();

  $("#activity-card").empty();
  $("#map").empty();

  $(".dropdown").show();
  $(".returnButton").hide();
});

$(".stateDropdown").on("change", function () {
  alert(this.value);
  parkList(this.value);
});

function parkList(state) {
  var parkListArray = [];
  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);

      $(".parkList").empty();
      console.log(data.data.length);
      for (i = 0; i < data.data.length; i++)
        if (state === data.data[i].states) {
          var parkListName = data.data[i].fullName;
          // parkListArray.push(parkListName);
          // console.log(parkListArray);

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action">${parkListName}</button>`
          );
        }
    },
  });
}

// this function will fetch the data for the google maps and display the activities
function stateSearch(state) {
  $("#map").show();
  $("#weather-btn").show();

  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);

      // attempting to display hawaii on array 6 and create a p element to append the url text
      for (let i = 0; i < data.data.length; i++) {
        if (state === data.data[i].states) {
          // this variable will contain the coordinates for the google maps api
          let { latitude, longitude } = data.data[i];
          // let latitude = data.data[i].latitude;
          // let longitude = data.data[i].longitude;
          let { url } = data.data[i];
          let parkCity = data.data[i].addresses[0].city;
          let parkName = data.data[i].name;
          console.log(data.data.length);

          // console.log(parkCity);

          // creates p elements
          let createP = document.createElement("p");
          let createP2 = document.createElement("p");
          $(createP2).html($(`<a href="${url}">Link to ${parkName} Park</a>`));

          // creates div elements to append other elements to
          let createDiv = document.createElement("div");
          let createDiv2 = document.createElement("div");

          // this div will append the url link -- needs to be here so it doesn't get created multiple times
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

            // these elements are getting appended to separate divs
            createDiv.append(createP);

            // these elements are getting appended to the card

            activityCard.append(createDiv);
          }

          // this invokes the apiGoogleMaps with the specified coords
          mapApi(latitude, longitude);
          weatherDisplay(parkCity, parkName);
        }
      }
    },
  });
}

function mapApi(lat, lon) {
  let map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    mapId: "2f72557b09a6245f",
  });
  console.log(lat, lon);
  const geocoder = new google.maps.Geocoder();

  geocoder
    .geocode({ address: "US" })
    .then((response) => {
      var position = response.results[0].geometry.location;

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

//weather display----------------------
function weatherDisplay(city, park) {
  var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
  console.log(city);
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
      forecastCard.append(
        forecastTitle,
        forecastTemp,
        forecastWind,
        forecastHumidity
      );
    }
  });
}

const weatherBtn = document.getElementById("weather-btn");
const closeBtn = document.getElementById("close-btn");
const weatherDash = document.getElementById("weather-dash");
weatherBtn.addEventListener("click", () =>
  weatherDash.classList.toggle("show")
);
closeBtn.addEventListener("click", () => weatherDash.classList.remove("show"));
//weather display-----------------------

// hides elements until function is called
$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
});

// empty array to push the userInput
let searchArray = [];

function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // sets the array to get the parsed stored items
  if (storedTodos !== null) {
    searchArray = storedTodos;
  }
  // invokes the following function
  renderTodos();
}

function renderTodos() {
  // This clears the search history log
  searchBoard.innerHTML = "";

  // this for loop will dynamically create li's
  for (var i = 0; i < searchArray.length; i++) {
    var todo = searchArray[i];

    // creates a li
    var li = document.createElement("li");

    // creates attributes to append to the li
    li.setAttribute("data-index", i);
    li.setAttribute("id", "cityLi");

    // creates buttons
    var button = document.createElement("button");

    // set the text of the button to be equal to the setItem
    button.textContent = todo;
    button.setAttribute("id", "cityBtn");

    // appends the following elements to each other
    li.appendChild(button);
    searchBoard.appendChild(li);
  }
}

// sets the array into a string in localstorage
function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(searchArray));
}

// when the items from the search history is clicked, the following function performs
searchBoard.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;
  // $('#myDropdown :selected').val()
  let oldCity = document.getElementById("cityBtn").textContent;
  console.log(oldCity);

  // when the condition is met, it removes the search history appended
  if (element.matches("button") === true) {
    event.preventDefault();
    var index = element.parentElement.getAttribute("data-index");
    searchArray.splice(index, 1);

    // invokes the following functions when this condition is met
    // storeTodos and renderTodos clears the text in the userinput field
    storeTodos();
    renderTodos();

    stateSearch(element.textContent);
  }
});
