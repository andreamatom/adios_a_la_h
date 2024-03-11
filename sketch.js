let h = [];

let threshold = 30;
let accChangeX = 0;
let accChangeY = 0;
let accChangeT = 0;

function setup() {
    
    createCanvas(windowWidth, windowHeight);
  for (let i = 0; i < 30; i++) {
    h.push(new H());
  }


}

function draw() {
background(255);

textSize(max);
  for (let i = 0; i < h.length; i++) {
    h[i].move();
    h[i].display();
  }

  checkForShake();
}

function checkForShake() {
  // Calculate total change in accelerationX and accelerationY
  accChangeX = abs(accelerationX - pAccelerationX);
  accChangeY = abs(accelerationY - pAccelerationY);
  accChangeT = accChangeX + accChangeY;
  // If shake
  if (accChangeT >= threshold) {
    for (let i = 0; i < h.length; i++) {
      h[i].shake();
      h[i].turn();
    }
  }
  // If not shake
  else {
    for (let i = 0; i < h.length; i++) {
      h [i].stopShake();
      h [i].turn();
      h[i].move();
    }
  }
}

// Flying H class
class H {
  constructor() {
    this.x = random(width);
    this.y = random(height);
    //hook this up to the draw function if statement
    if (windowWidth < 500) {
        // Adjust for small screens
         min=10;
         max=18;
      } else{
         min= 20;
        max= 50;
      }
    this.size = random(min, max);
    this.xspeed = random(-2, 2);
    this.yspeed = random(-2, 2);
    this.oxspeed = this.xspeed;
    this.oyspeed = this.yspeed;
    this.direction = 0.7;
    
    this.text="h";
  }

  move() {
    this.x += this.xspeed * this.direction;
    this.y += this.yspeed * this.direction;
  }

  // Bounce when touch the edge of the canvas
  turn() {
    if (this.x < 0) {
      this.x = 0;
      this.direction = -this.direction;
    } else if (this.y < 0) {
      this.y = 0;
      this.direction = -this.direction;
    } else if (this.x > width - 20) {
      this.x = width - 20;
      this.direction = -this.direction;
    } else if (this.y > height - 20) {
      this.y = height - 20;
      this.direction = -this.direction;
    }
  }

  // Add to xspeed and yspeed based on
  // the change in accelerationX value
  shake() {
    this.xspeed += random(5, accChangeX / 3);
    this.yspeed += random(5, accChangeX / 3);
  }

  // Gradually slows down
  stopShake() {
    if (this.xspeed > this.oxspeed) {
      this.xspeed -= 0.6;
    } else {
      this.xspeed = this.oxspeed;
    }
    if (this.yspeed > this.oyspeed) {
      this.yspeed -= 0.6;
    } else {
      this.yspeed = this.oyspeed;
    }
  }

  display() {
    fill (0);
    textFont('Yrsa');
    textSize (this.size);
    text(this.text,this.x, this.y);
  }
}

// To Resize Screens

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    // Here, you can check the windowWidth against your breakpoints and adjust content accordingly
    adjustContentBasedOnBreakpoint();
  }
  
  function adjustContentBasedOnBreakpoint() {
     if (windowWidth < 1024) {
      // Adjust for big screens
      threshold = 50; // Example adjustment
    } else {
      // Adjust for extra big screens
      threshold = 100; // Example adjustment
    }
    // Re-initialize or adjust any other elements that should change based on the breakpoint
  }

// Toggle for Mobile and Tablet 

  document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.getElementById('check');

    toggleButton.addEventListener('change', function() {
      const elementsToToggle = document.querySelectorAll('.hover-h, .hover-hmedium, .hover-htitles2');

      elementsToToggle.forEach(element => {
        element.classList.toggle('hidden');
      });
    });
  });


  
