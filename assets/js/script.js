// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById("stateButton");
let returnBtn = document.getElementById("returnButton");
let activityCard = document.getElementById("activity-card");
let searchBoard = document.getElementById("search-history");
let parkList = document.getElementById("parkList");

// button that gets the value from the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();

  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${userInput}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);

      for (i = 0; i < data.data.length; i++)
        if (userInput === data.data[i].states) {
          var parkFullName = data.data[i].fullName;
          var parkCode = data.data[i].parkCode;

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${parkCode}">${parkFullName}</button>`
          );
        }
    },
  });
  // hides the dropdown list and the button
  $(".dropdown").hide();
  $(".returnButton").show();
  $("#parkList").show();
  $(".park-choice").show();
});

returnBtn.addEventListener("click", function () {
  parkImages = [];
  carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";

  $("#activity-card").empty();
  $("#map").empty();

  $(".dropdown").show();
  $("#parkList").empty();
  $(".returnButton").hide();
  $(".parkTitle").text(`Choose a State`);
  $(".park-choice").show();
  $("#weather-btn").hide();
  $(".clearBtn").show();
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

clearBtn.addEventListener("click", clearParks);
function clearParks() {
  localStorage.clear();
  window.location.reload();
}

$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
  $(".container").hide();
  $(".search-header").hide();
  $(".clearBtn").show();
  $(".favBtn").hide();
});

favParksDisplay();
function favParksDisplay() {
  var parkHistory = localStorage.getItem("historyKey") || [];
  var parsed = JSON.parse(parkHistory);
  var parsedVal = parsed[0];
  console.log(parsed.length);
  console.log(parsed);
  console.log(parsedVal);
  // var parkCode = parsedVal.parkCode;
  // var parkFullName = parsedVal.parkFullName;

  for (i = 0; i < parsed.length; i++) {
    var parsed = JSON.parse(parkHistory);
    var parsedVal = parsed[i];
    console.log(parkHistory);
    console.log(parsedVal);
    console.log(parsed);

    if (!parkHistory.includes(parsedVal)) {
      var favPark = document.createElement("button");
      $(favPark).html(
        `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${parsed[i].parkCode}">${parsed[i].parkFullName}</button>`
      );
      $("#search-history").append(favPark);
    }
  }
}
