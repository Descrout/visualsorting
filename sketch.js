const states = {
  STATIC:"static",
  SHUFFLE:"shuffle",
  BUBBLESORT:"bubblesort",
  SELECTIONSORT:"selectionsort",
};

let visual;
let myParent;
let canvas;

function setup() {
  myParent = document.getElementById("sketch-holder");
  canvas = createCanvas(myParent.offsetWidth, 480);
  canvas.parent(myParent);
  strokeWeight(2);

  visual = new Visual(5);
  visual.setState(states.STATIC);
}

function windowResized() {
  resizeCanvas(myParent.offsetWidth, 480);
  visual = new Visual(5);
  visual.setState(states.STATIC);
}

function draw() {
  clear();
  visual.draw();
  
  switch(visual.state){
    case states.SHUFFLE:
      visual.shuffle();
      break;
    case states.BUBBLESORT:
      visual.bubbleSort();
      break;
    case states.SELECTIONSORT:
      visual.selectionSort();
  }
}

