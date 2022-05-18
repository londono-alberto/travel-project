// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById('stateButton');
let returnBtn = document.getElementById('returnButton');
let activityCard = document.getElementById('activity-card');
let searchBoard = document.getElementById('search-history');

// button that gets the value fromt the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();
  console.log(userInput);

  // hides the dropdown list and the button 
  $('.dropdown').hide()
  $('.returnButton').show()

  // Pushes the text into the array
  searchArray.push(userInput);

  // invokes function 
  parkList(userInput)
  stateSearch(userInput)
  storeTodos();
  renderTodos();
})

returnBtn.addEventListener('click', function(){
  // location.reload();

  parkImages = [];
  carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";


  $('#activity-card').empty()
  $('#map').empty()

  $('.dropdown').show()
  $('.returnButton').hide()

})

// this function creates a list of buttons with all the park names
$(".stateDropdown").on("change", function () {
  
  parkList(this.value);
});

function parkList(state) {
  
  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${state}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);


      console.log(data.data.length);
      for (i = 0; i < data.data.length; i++) {
      if (state === data.data[i].states) {
        var parkListName = data.data[i].fullName;
      console.log(parkListName);
        let createDiv3 = document.createElement("div");
        let createButton = document.createElement("button");
        createButton.setAttribute('id', 'parkBtn');
        createButton.setAttribute('class', 'parkBtn');
        createButton.textContent = parkListName
        
          createDiv3.append(createButton);
        $("#parkList").append(createDiv3)
      
      }
    }
    }
  });
}


// this function will fetch the data for the google maps and display the activities
function stateSearch(state) {

  // add to the parkList function when created on the other js file 

  $("#map").show();
  $("#weather-btn").show();

// ------------------------------------- 

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

        // if statement to specify the state being selected within the array 
        if (state === data.data[i].states) {
        
          // get the url data 
          let { url } = data.data[i];
      
          // this div will append the url link -- needs to be here so it doesnt get created multiple times
          let createDiv = document.createElement("div");

          let createP = document.createElement("p");
          $(createP).html(
            $(`<a href="${url}">Link to ${data.data[i].name} Park</a>`)
          );         
          createDiv.append(createP);
          activityCard.append(createDiv);

          // this for loop specifies the array within the data array
          for (let j = 0; j < data.data[i].activities.length; j++) {

            // this variable stores the image urls 
            let {url} = data.data[i].images[j];
            
            // this pushes the data into an empty array 
            parkImages.push(url);

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
        }
      }
    },
  });
}

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
      li.setAttribute("id", 'cityLi');

      // creates buttons 
      var button = document.createElement("button");

      // set the text of the button to be equal to the setItem 
      button.textContent = todo;
      button.setAttribute("id", 'cityBtn');
  
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
  searchBoard.addEventListener("click", function(event) {
    event.preventDefault();
    var element = event.target;
    // $('#myDropdown :selected').val()
    let oldCity = document.getElementById('cityBtn').textContent;
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

// global variables that link to the carousel function 
var carousel = document.querySelector(".carouselbox");

// these variables are connected to the carousel
var next = carousel.querySelector(".next");
var prev = carousel.querySelector(".prev");
var index = 0;
var currentImage;

var parkImages = [];
console.log(parkImages);
carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";

// carousel function to rotate pictures through
// function holds the direction from the user input and assigns it a value to perform the function 
function navigate(direction) {

  // index stores the value of the direction 
  index += direction;
  
  // once the index stores the value of the index, the if else function runs 
  
  if (index < 0) { 
    index = parkImages.length - 1; 
  } else if (index > parkImages.length - 1) { 
    index = 0;
  }
  currentImage = parkImages[index];
  carousel.style.backgroundImage = "url('" + currentImage + "')";
}

// When this is clicked it rotates through the index of pictures in the array
carousel.addEventListener("click", function() {
  window.location.href = parkImages[index];
});

// this is connected to the next button. adds to the index by 1
next.addEventListener("click", function(event) {

  // Prevents it from event bubbling. So when clicked, it doesnt also click the image
  event.stopPropagation();

  // invokes the function with an argument incrementing it by 1 
  navigate(1);
});

// this is connected to the next button. decrements the index by 1
prev.addEventListener("click", function(event) {

    // Prevents it from event bubbling. So when clicked, it doesnt also click the image
  event.stopPropagation();

  // invokes the function with an argument decrementing it by 1 
  navigate(-1);
});

$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
});