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
carousel.addEventListener("click", function () {
  window.location.href = parkImages[index];
});

// this is connected to the next button. adds to the index by 1
next.addEventListener("click", function (event) {
  // Prevents it from event bubbling. So when clicked, it doesnt also click the image
  event.stopPropagation();

  // invokes the function with an argument incrementing it by 1
  navigate(1);
});

// this is connected to the next button. decrements the index by 1
prev.addEventListener("click", function (event) {
  // Prevents it from event bubbling. So when clicked, it doesnt also click the image
  event.stopPropagation();

  // invokes the function with an argument decrementing it by 1
  navigate(-1);
});
