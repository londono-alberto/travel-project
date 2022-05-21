// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById("stateButton");
let returnBtn = document.querySelector(".returnButton");
let activityCard = document.getElementById("activity-card");
let searchBoard = document.getElementById("search-history");

let parkList = document.getElementById("parkList");

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
        if (userInput === data.data[i].states[i]) {
          var parkFullName = data.data[i].fullName;
          var parkCode = data.data[i].parkCode;
          console.log(parkCode);
          console.log(parkFullName);

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn button is-info is-rounded"  value = "${parkCode}">${parkListName}</button>`
          );
          // $("#parkList").append(
          //   `<button id="parkBtn" class= "parkBtn button is-info is-rounded" onclick="parkDisplay(event)" value = "${parkCode}">${parkListName}</button>`
          // );
        } else if (data.data[i].states.includes(userInput)) {
          parkListName = data.data[i].fullName;
          parkCode = data.data[i].parkCode;

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn button is-info is-rounded"  value = "${parkCode}">${parkListName}</button>`
          );
        }
    },
  });
  // hides the dropdown list and the button
  $(".parkTitle").hide();
  $(".dropdown").hide();
  $(".returnButton").show();
  $("#parkList").show();
  $(".park-choice").show();
  $(".park-choice").text(`Parks in ${userState}`);
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

  $("#parkList").empty();
  $(".returnButton").hide();
  $(".parkTitle").show();
  $(".parkTitle").text(`Choose A State`);
  $(".park-choice").hide();

  $("#weather-btn").hide();
  $("#clearBtn").show();
  $(".favBtn").hide();

  favParksDisplay();
});

parkList.addEventListener("click", function (e) {
  e.preventDefault();

  var element = e.target;
  var parkEl = $(element).val();

  if (e.target.classList.contains("parkBtn")) {
    parkDisplay(parkEl);

    $("#map").show();
    $("#weather-btn").show();
    $("#parkList").hide();
    $(".container").show();
    $(".park-choice").hide();
    $(".favBtn").show();
  }
});

// beginning of the localstorage functions --------vvvvv
searchBoard.addEventListener("click", function (e) {
  e.preventDefault();

  var element = e.target;
  var parkEl = $(element).val();

  if (e.target.classList.contains("parkBtn")) {
    parkDisplay(parkEl);

    $("#map").show();
    $("#weather-btn").show();
    $("#parkList").hide();
    $(".container").show();
    $(".park-choice").hide();
    $(".favBtn").show();
  }
});

//   // Pushes the text into the localstorage array
//   searchArray.push(parkSave);

//   parkDisplay(parkEl);
//   storeTodos();
//   renderTodos();

//   $("#map").show();
//   $("#weather-btn").show();
//   $("#parkList").hide();
//   $(".container").show();
//   $(".park-choice").hide();
// });

// beginning of the localstorage functions --------vvvvv

// empty array to push the userInput
// let searchArray = [];
// init();
// function init() {
//   var storedTodos = JSON.parse(localStorage.getItem("todos"));

//   // sets the array to get the parsed stored items
//   if (storedTodos !== null) {
//     searchArray = storedTodos;
//   }
//   // invokes the following function
//   renderTodos();
// }

// // creates buttons from the localstorage value to be appended onto the page
// function renderTodos() {
//   // This clears the search history log
//   searchBoard.innerHTML = "";

//   // this for loop will dynamically create li's
//   for (var i = 0; i < searchArray.length; i++) {
//     var todo = searchArray[i];

//     // creates a li
//     var li = document.createElement("li");

//     // creates attributes to append to the li
//     li.setAttribute("data-index", i);
//     li.setAttribute("id", "cityLi");

//     // creates buttons
//     var button = document.createElement("button");

//     // set the text of the button to be equal to the setItem
//     button.textContent = todo;
//     button.setAttribute("id", "parkBtn");

//     // appends the following elements to each other
//     li.appendChild(button);
//     searchBoard.appendChild(li);
//   }
// }

// // sets the array into a string in localstorage
// function storeTodos() {
//   localStorage.setItem("todos", JSON.stringify(searchArray));
// }

// // make this searchboard also fetch the api to pass the value into it
// // when the items from the search history is clicked, the following function performs
// searchBoard.addEventListener("click", function (event) {
//   event.preventDefault();
//   var element = event.target;

//   // when the condition is met, it removes the search history appended
//   if (element.matches("button") === true) {
//     event.preventDefault();
//     var index = element.parentElement.getAttribute("data-index");
//     searchArray.splice(index, 1);

//     // invokes the following functions when this condition is met
//     // storeTodos and renderTodos clears the text in the userinput field
//     storeTodos();
//     renderTodos();

//     // invoked the search again but it is now a button invoking the displaying
//     parkDisplay(element.textContent);
//   }
// });

$(".favBtn").on("click", favoritePark);

function favoritePark(e) {
  $(this).find(".fa").removeClass("fa-tree").addClass("fa-check");
  setTimeout(() => {
    $(this).find(".fa").removeClass("fa-check").addClass("fa-tree");
  }, 400);

  var parkHistory = JSON.parse(localStorage.getItem("historyKey")) || [];
  console.log(parkHistory);

  var parkCode = $(".park-code").text();
  var parkFullName = $(".parkTitle").text();
  console.log(parkCode, parkFullName);
  var saveEl = { parkCode, parkFullName };
  if (!parkHistory.includes(saveEl)) {
    if (saveEl != "" && saveEl != null) {
      parkHistory.push(saveEl);
      console.log(saveEl);

      localStorage.setItem("historyKey", JSON.stringify(parkHistory));
    }
  }
}

// clears localStorage and refreshes the page
clearBtn.addEventListener("click", clearParks);
function clearParks() {
  localStorage.clear();
  window.location.reload();
}

favParksDisplay();
function favParksDisplay() {
  var parkHistory = localStorage.getItem("historyKey") || [];
  // console.log(parkHistory);
  var parsed = JSON.parse(parkHistory);
  var parsedVal = parsed[0];
  // console.log(parsed.length);
  // console.log(parsed);
  // console.log(parsedVal);
  // var parkCode = parsedVal.parkCode;
  // var parkFullName = parsedVal.parkFullName;

  for (i = 0; i < parsed.length; i++) {
    var parsed = JSON.parse(parkHistory);
    var parsedVal = parsed[i];
    // console.log(parkHistory);
    // console.log(parsedVal);
    // console.log(parsed);

    if (!parkHistory.includes(parsedVal)) {
      var favPark = document.createElement("button");
      $(favPark).html(
        `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${parsed[i].parkCode}">${parsed[i].parkFullName}</button>`
      );
      $("#search-history").append(favPark);
    }
  }
}

// hides and shows buttons when wanted
$(document).ready(function () {
  $(".park-choice").hide();
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
  $(".container").hide();
  $(".search-header").hide();
  $("#clearBtn").show();
  $(".favBtn").hide();
});
