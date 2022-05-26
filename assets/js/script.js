// web api keys
let apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
let apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
let apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

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
    
      for (i = 0; i < data.data.length; i++)
        if (userInput === data.data[i].states[i]) {
        
          let parkCode = data.data[i].parkCode;

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn button is-info is-rounded"  value = "${parkCode}">${parkListName}</button>`
          );
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
  $(".saved-list").show();
  window.location.reload();
});

parkList.addEventListener("click", function (e) {
  e.preventDefault();

  let element = e.target;
  let parkEl = $(element).val();

  if (e.target.classList.contains("parkBtn")) {
    parkDisplay(parkEl);

    $("#map").show();
    $("#weather-btn").show();
    $("#parkList").hide();
    $(".container").show();
    $(".park-choice").hide();
    $(".favBtn").show();
    $("#clearBtn").hide();
    $(".dropdown").hide();
  }
});

// beginning of the localstorage functions --------vvvvv
searchBoard.addEventListener("click", function (e) {
  e.preventDefault();

  let element = e.target;
  let parkEl = $(element).val();

  if (e.target.classList.contains("parkBtn")) {
    parkDisplay(parkEl);

    $("#map").show();
    $("#weather-btn").show();
    $("#parkList").hide();
    $(".container").show();
    $(".park-choice").hide();
    $(".favBtn").show();
    $(".saved-list").hide();
    $(".dropdown").hide();
    $(".returnButton").show();
  }
});

$(".favBtn").on("click", favoritePark);

function favoritePark() {
  $(this).find(".fa").removeClass("fa-tree").addClass("fa-check");
  setTimeout(() => {
    $(this).find(".fa").removeClass("fa-check").addClass("fa-tree");
  }, 400);

  let parkHistory = JSON.parse(localStorage.getItem("historyKey")) || [];


  let parkCode = $(".park-code").text();
  let parkFullName = $(".parkTitle").text();

  let saveEl = { parkCode, parkFullName };
  if (!parkHistory.includes(saveEl)) {
    if (saveEl != "" && saveEl != null) {
      parkHistory.push(saveEl);


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

let parkHistory = JSON.parse(localStorage.getItem("historyKey")) || [];

for (i = 0; i < parkHistory.length; i++) {
  let codesArr = [];
  codeEl = parkHistory[i].parkCode;
  let namesArr = [];
  nameEl = parkHistory[i].parkFullName;
  if (!codesArr.includes(codeEl) && !namesArr.includes(nameEl)) {

    codesArr.push(codeEl);
    namesArr.push(nameEl);
  }
  let hatePark = document.createElement("div");
  $(hatePark).html(
    `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${codesArr}">${namesArr}</button>`
  );
  $("#search-history").append(hatePark);
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
