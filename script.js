let events = ["contextmenu"];

//initial declaration
var timeout;
var lastTap = 0;

//refer menu div
let contextMenu = document.getElementById("context-menu");

//same function for both events
events.forEach((eventType) => {
  document.addEventListener(
    eventType,
    (e) => {
      //preventDefault() method stops the default action of a selected element from happening by a user
      e.preventDefault();
      //x and y position of mouse or touch
      //mouseX represents the x-coordinate of the mouse
      let mouseX = e.clientX || e.touches[0].clientX;
      //mouseY represents the y-coordinate of the mouse.
      let mouseY = e.clientY || e.touches[0].clientY;
      //height and width of menu
      //getBoundingClientRect() method returns the size of an element and its position relative to the viewport
      let menuHeight = contextMenu.getBoundingClientRect().height;
      let menuWidth = contextMenu.getBoundingClientRect().width;
      //width and height of screen
      //innerWidth returns the interior width of the window in pixels
      let width = window.innerWidth;
      let height = window.innerHeight;
      //If user clicks/touches near right corner
      if (width - mouseX <= 200) {
        contextMenu.style.borderRadius = "5px 0 5px 5px";
        contextMenu.style.left = width - menuWidth + "px";
        contextMenu.style.top = mouseY + "px";
        //right bottom
        if (height - mouseY <= 200) {
          contextMenu.style.top = mouseY - menuHeight + "px";
          contextMenu.style.borderRadius = "5px 5px 0 5px";
        }
      }
      //left
      else {
        contextMenu.style.borderRadius = "0 5px 5px 5px";
        contextMenu.style.left = mouseX + "px";
        contextMenu.style.top = mouseY + "px";
        //left bottom
        if (height - mouseY <= 200) {
          contextMenu.style.top = mouseY - menuHeight + "px";
          contextMenu.style.borderRadius = "5px 5px 5px 0";
        }
      }
      //display the menu
      contextMenu.style.visibility = "visible";
    },
    { passive: false }
  );
});

//for double tap(works on touch devices)
document.addEventListener("touchend", function(e) {
  //current time
  var currentTime = new Date().getTime();
  //gap between two gaps
  var tapLength = currentTime - lastTap;
  //clear previous timeouts(if any)
  //The clearTimeout() method clears a timer set with the setTimeout() method.
  clearTimeout(timeout);
  //if user taps twice in 500ms
  if (tapLength < 500 && tapLength > 0) {
    //hide menu
    contextMenu.style.visibility = "hidden";
    e.preventDefault();
  } else {
    //timeout if user doesn't tap after 500ms
    timeout = setTimeout(function() {
      clearTimeout(timeout);
    }, 500);
  }
  //lastTap set to current time
  lastTap = currentTime;
});

//click outside the menu to close it (for click devices)
document.addEventListener("click", function(e) {
  if (!contextMenu.contains(e.target)) {
    contextMenu.style.visibility = "hidden";
  }
});

//prevent long press context menu on mobile devices
document.addEventListener("contextmenu", function(e) {
  e.preventDefault();
}, false);