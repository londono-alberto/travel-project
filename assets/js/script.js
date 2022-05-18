// web api keys
var apiKeyWeather = "b6a631faf48ec36736fa91299da2f0a2";
var apiKeyNPS = "UwI3kgigKGVdm8bk9XTQmiupY45dyxNZfIcdn81Q";
var apiGoogleMaps = "AIzaSyD4OVkkkHA93ViisjQDq3Fx_oAtNuevgR0";

let startBtn = document.getElementById('stateButton');
let returnBtn = document.getElementById('returnButton');
let activityCard = document.getElementById('activity-card');
let searchBoard = document.getElementById('search-history');
let parkBtn = document.getElementById('parkList');

// button that gets the value fromt the dropdown list
startBtn.addEventListener("click", function () {
  let userInput = $("#myDropdown :selected").val();
  
  $.ajax({
    type: "GET",
    url: `https://developer.nps.gov/api/v1/parks?stateCode=${userInput}&api_key=${apiKeyNPS}`,

    success: function (data) {
      console.log(data);

      $(".parkList").empty();
      
      for (i = 0; i < data.data.length; i++)
        if (userInput === data.data[i].states) {
          var parkListName = data.data[i].fullName;
          var parkState = data.data[i].states;
          var parkCode = data.data[i].parkCode;

          // parkListArray.push(parkListName);
          // console.log(parkListArray);

          $("#parkList").append(
            `<button id="parkBtn" class= "parkBtn list-group-item list-group-item-action" value = "${parkCode}">${parkListName}</button>`
          );
        }
    },
  });
  // hides the dropdown list and the button 
  $('.dropdown').hide()
  $('.returnButton').show()

  // // Pushes the text into the array
  // searchArray.push(userInput);
  // // probably going to be in the parkClick button ^
  // // this is for the localStorage. needs to have the button stored in it 


  // this will be in the park click 
  // stateSearch(userInput)

  // these functions will probably need to be invoked in the parklist button 
  // storeTodos();
  // renderTodos();
})

returnBtn.addEventListener('click', function(){

  parkImages = [];
  carousel.style.backgroundImage = "url('https://picsum.photos/300/200')";


  $('#activity-card').empty()
  $('#map').empty()

  $('.dropdown').show()
  $('.returnButton').hide()

})


// this button displays the activities and url from the specified park 
  parkBtn.addEventListener("click", function(e) {
    e.preventDefault();
  
    var element = e.target;
    
    var parkEl = $(element).val();


    $("#map").show();
  $("#weather-btn").show();

// ------------------------------------- 

  $.ajax({
    type: "GET",
    url:
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
      parkEl +
      "&api_key=" +
      apiKeyNPS,

    success: function (data) {
      console.log(data);
      // attempting to display hawaii on array 6 and create a p element to append the url text
      for (let i = 0; i < data.data.length; i++) {

        // if statement to specify the state being selected within the array 
        if (parkEl === data.data[0].parkCode) {
        
          // get the url data 
          let { url } = data.data[0];
      
          // this div will append the url link -- needs to be here so it doesnt get created multiple times
          let createDiv = document.createElement("div");

          let createP = document.createElement("p");
          $(createP).html(
            $(`<a href="${url}">Link to ${data.data[i].name} Park</a>`)
          );         
          createDiv.append(createP);
          activityCard.append(createDiv);

          // this for loop specifies the array within the data array
          for (let j = 0; j < data.data[0].activities.length; j++) {

            // this variable stores the image urls 
            let {url} = data.data[0].images[j];
           
            // this pushes the data into an empty array 
            parkImages.push(url);
            console.log(parkImages);

            // creates div elements to append other elements to
          let createDiv2 = document.createElement("div");

          // creates p elements
          let createP2 = document.createElement("p");
            
          // this p element is getting the specified data 
            createP2.textContent = data.data[0].activities[j].name;

            // this element is getting appeneded to the div
            createDiv2.append(createP2);

            // this element is getting appended to the card
            activityCard.append(createDiv2);
          }         
        }
      }
    },
  });
    //   // Pushes the text into the localstorage array
  //   searchArray.push(parkEl);
  //   // probably going to be in the parkClick button ^
  //   // this is for the localStorage. needs to have the button stored in it 
  // storeTodos();
  // renderTodos();
  $("#parkList").hide()
  $(".container").show();
  });


// global variables that link to the carousel function 
var carousel = document.querySelector(".carouselbox");

// these variables are connected to the carousel
var next = carousel.querySelector(".next");
var prev = carousel.querySelector(".prev");
var index = 0;
var currentImage;

var parkImages = [];

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


// beginning of the localstorage functions --------vvvvv

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
    
      // make this searchboard also fetch the api to pass the value into it 
      // when the items from the search history is clicked, the following function performs 
      searchBoard.addEventListener("click", function(event) {
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
          // stateSearch(element.textContent);
          }
        });

$(document).ready(function () {
  $("#map").hide();
  $(".returnButton").hide();
  $("#weather-btn").hide();
  $(".container").hide();
});