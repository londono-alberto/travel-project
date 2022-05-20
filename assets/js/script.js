// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById("stateButton");
let returnBtn = document.getElementById("returnButton");
let activityCard = document.getElementById("activity-card");
let searchBoard = document.getElementById("search-history");
let parkBtn = document.getElementById("parkList");

// button that gets the value from the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();
  let userState = $("#myDropdown :selected").text();

  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${userInput}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);

      for (i = 0; i < data.data.length; i++)
        if (userInput === data.data[i].states) {
          var parkListName = data.data[i].fullName;
          var parkCode = data.data[i].parkCode;

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${parkCode}">${parkListName}</button>`
          );
        }
    },
  });
  // hides the dropdown list and the button
  $(".dropdown").hide();
  $(".returnButton").show();
  $("#parkList").show();
  $(".park-choice").show();
  
  $(".park-choice").text(`Parks in ${userState}` );
});

// button to return to state selection 
returnBtn.addEventListener("click", function () {
  parkImages = [];
  carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";

  $("#activity-card").empty();
  $("#map").empty();
  $("#parkList").empty();

  $(".container").hide();
  $(".dropdown").show();
  $(".returnButton").hide();
  $(".parkTitle").text(`Choose a State`);
  $(".park-choice").show();
  $("#weather-btn").hide();
  $(".clearBtn").show();
});

// this button displays the activities and url from the specified park
parkBtn.addEventListener("click", function (e) {
  e.preventDefault();

  var element = e.target;
  var parkSave = e.target.textContent;
  var parkEl = $(element).val();

  // Pushes the text into the localstorage array
  searchArray.push(parkSave);

  parkDisplay(parkEl);
  storeTodos();
  renderTodos();

  $("#map").show();
  $("#weather-btn").show();
  $("#parkList").hide();
  $(".container").show();
  $(".park-choice").hide();
});

// beginning of the localstorage functions --------vvvvv

// empty array to push the userInput
let searchArray = [];
init();
function init() {
  var storedTodos = JSON.parse(localStorage.getItem("todos"));

  // sets the array to get the parsed stored items
  if (storedTodos !== null) {
    searchArray = storedTodos;
  }
  // invokes the following function
  renderTodos();
}

// creates buttons from the localstorage value to be appended onto the page 
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
    button.setAttribute("id", "parkBtn");

    // appends the following elements to each other
    li.appendChild(button);
    searchBoard.appendChild(li);
  }
}

// sets the array into a string in localstorage
function storeTodos() {
  localStorage.setItem("todos", JSON.stringify(searchArray));
}

// make this searchboard also fetch the api to pass the value into it
// when the items from the search history is clicked, the following function performs
searchBoard.addEventListener("click", function (event) {
  event.preventDefault();
  var element = event.target;

  // when the condition is met, it removes the search history appended
  if (element.matches("button") === true) {
    event.preventDefault();
    var index = element.parentElement.getAttribute("data-index");
    searchArray.splice(index, 1);

    // invokes the following functions when this condition is met
    // storeTodos and renderTodos clears the text in the userinput field
    storeTodos();
    renderTodos();

    // invoked the search again but it is now a button invoking the displaying
    parkDisplay(element.textContent);
  }
});

// clears localStorage and refreshes the page 
clearBtn.addEventListener("click", clearParks);
function clearParks() {
  localStorage.clear();
  window.location.reload();
}

// hides and shows buttons when wanted 
$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
  $(".container").hide();
  $(".search-header").hide();
  $(".clearBtn").show();
});

