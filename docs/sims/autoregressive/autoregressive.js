// Autoregressive Animation MicroSim
// Canvas dimensions
let canvasWidth = 500;
let drawHeight = 550;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
// general margin around drawing
let margin = 25;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth;
let containerHeight = canvasHeight;

// Animation parameters
let phase = 0;
let step = 0;
let maxPhases = 3;
let maxSteps = 5;
let isRunning = false;
let nextButton;
let stepButton;
let resetButton;
let frameDelay = 60; // Fixed 1x speed
let lastStepTime = 0;

// Neural network layout
let nodeRadius = 8;
let leftMargin = 100;
let activeArrows = [];
let animatingNode = null;
let animationProgress = 0;
// horizontal space between circles - chance upon resize
// should be (canvasWidth - laeftMargin - margin) / 20
let xSpace = 22;

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  
  // Create controls
  nextButton = createButton('Start');
  nextButton.position(margin, drawHeight + 15);
  nextButton.mousePressed(toggleAnimation);
  
  stepButton = createButton('Step');
  stepButton.position(margin + 80, drawHeight + 15);
  stepButton.mousePressed(stepForward);
  
  resetButton = createButton('Reset');
  resetButton.position(margin + 160, drawHeight + 15);
  resetButton.mousePressed(resetAnimation);
  
  initializeLayers();
  
  describe('Autoregressive neural network animation showing token prediction process with hidden layers', LABEL);
}

function draw() {
  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Controls area
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Title
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text("Autoregressive Token Prediction", canvasWidth/2, margin/2);
  
  // Draw layer labels
  drawLabels();
  
  // Draw neural network
  drawNeuralNetwork();
  
  // Draw active arrows
  drawArrows();
  
  // Handle animation
  if (isRunning) {
    if (millis() - lastStepTime > frameDelay) {
      executeStep();
      lastStepTime = millis();
    }
  }
  
  // Handle moving node animation
  if (animatingNode !== null) {
    animateMovingNode();
  }
  
  // Clean up completed phases
  if (phase >= maxPhases && step >= maxSteps) {
    isRunning = false;
    nextButton.html('Start');
  }
  
  // Draw step indicator
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(CENTER, CENTER);
  text(`Token: ${phase + 1}/${maxPhases} | Layer: ${step + 1}/${maxSteps}`, canvasWidth/2, drawHeight - 55);
  text(`Input tokens: ${phase + 1}-${phase + 16} | Output Token: ${phase + 17}`, canvasWidth/2, drawHeight - 25);
}

// place circles on canvas
function initializeLayers() {
  layers = [];
  let yPositions = [60, 160, 260, 360, 460];
  let nodeColors = ['#FFA07A', 'silver', 'silver', 'silver', '#ADD8E6'];
  let layerNames = ['Output:', 'Hidden 3:', 'Hidden 2:', 'Hidden 1:', 'Input:'];

  // xSpace is space between circles
  for (let i = 0; i < 5; i++) {
    let row = [];
    for (let j = 0; j < xSpace; j++) {
      row.push({
        x: leftMargin + 20 + j * xSpace,
        y: yPositions[i],
        color: nodeColors[i],
        active: (i === 4 && j >= phase && j < 16 + phase) // Input layer active for context window
      });
    }
    layers.push({
      nodes: row,
      name: layerNames[i]
    });
  }
}

// Draw the layer labels in the left side margin
function drawLabels() {
  fill('black');
  textSize(16);
  textAlign(RIGHT, CENTER);
  noStroke();
  for (let i = 0; i < layers.length; i++) {
    text(layers[i].name, leftMargin - 10, layers[i].nodes[0].y);
  }
}

function drawNeuralNetwork() {
  for (let i = 0; i < layers.length; i++) {
    for (let j = 0; j < layers[i].nodes.length; j++) {
      let node = layers[i].nodes[j];
      
      // Draw node
      stroke('black');
      strokeWeight(1);
      fill(node.color);
      
      // Highlight active nodes
      if (node.active) {
        stroke('blue');
        strokeWeight(3);
      }
      
      circle(node.x, node.y, nodeRadius * 2);
    }
  }
}

// TODO: make these more random
function drawArrows() {
  stroke('green');
  strokeWeight(2);
  noFill();
  
  for (let arrow of activeArrows) {
    beginShape();
    vertex(arrow.fromX, arrow.fromY);
    
    // Add control point for slight curve
    let midX = (arrow.fromX + arrow.toX) / 2;
    let midY = (arrow.fromY + arrow.toY) / 2;
    let controlX = midX + (arrow.toX - arrow.fromX) * 0.2;
    let controlY = midY;
    
    quadraticVertex(controlX, controlY, arrow.toX, arrow.toY);
    endShape();
    
    // Draw arrow head
    drawArrowHead(arrow.toX, arrow.toY, midX, midY);
  }
}

function drawArrowHead(x, y, fromX, fromY) {
  let angle = atan2(y - fromY, x - fromX);
  push();
  translate(x, y);
  rotate(angle);
  fill('green');
  noStroke();
  triangle(-10, -5, -10, 5, 0, 0);
  pop();
}

function executeStep() {
  step++;
  
  if (step === 1) {
    // Clear any existing arrows when starting a new step sequence
    activeArrows = [];
  }
  
  switch(step) {
    case 1:
      // Step 1: Draw 16 arrows from input to first hidden layer
      for (let i = 0; i < 16; i++) {
        let fromIdx = phase + i; // Correctly shift input by phase
        let fromNode = layers[4].nodes[fromIdx];
        // change 4 to a random number
        let toIdx = Math.floor(i / 2) + 4 + int(random(3));
        let toNode = layers[3].nodes[toIdx];
        activeArrows.push({
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y
        });
      }
      break;
      
    case 2:
      // Step 2: Draw 8 arrows from first hidden to second hidden layer
      for (let i = 0; i < 8; i++) {
        let fromNode = layers[3].nodes[i];
        // let toIdx = i + 5; // Shift right
        let toIdx = Math.floor(i / 2) + 4 + int(random(3));
        let toNode = layers[2].nodes[toIdx];
        activeArrows.push({
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y
        });
      }
      break;
      
    case 3:
      // Step 3: Draw 4 arrows from second hidden to third hidden layer
      for (let i = 0; i < 4; i++) {
        let fromNode = layers[2].nodes[i + 1];
        let toIdx = i + 8;
        let toNode = layers[1].nodes[toIdx];
        activeArrows.push({
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y
        });
      }
      break;
      
    case 4:
      // Step 4: Draw 2 arrows from third hidden to output layer
      for (let i = 0; i < 2; i++) {
        let fromNode = layers[1].nodes[i + 1];
        let outputIdx = 16 + phase;
        let toNode = layers[0].nodes[outputIdx];
        activeArrows.push({
          fromX: fromNode.x,
          fromY: fromNode.y,
          toX: toNode.x,
          toY: toNode.y
        });
      }
      break;
      
    case 5:
      // Step 5: Activate output node and prepare for animation
      let outputIdx = 16 + phase;
      if (outputIdx < 20) {
        layers[0].nodes[outputIdx].active = true;
        animatingNode = {
          fromX: layers[0].nodes[outputIdx].x,
          fromY: layers[0].nodes[outputIdx].y,
          toX: layers[4].nodes[outputIdx].x,
          toY: layers[4].nodes[outputIdx].y,
          toIdx: outputIdx
        };
        animationProgress = 0;
      }
      break;
  }
  
  if (step >= maxSteps) {
    // Go to next phase after all steps complete
    phase++;
    step = 0;
    
    if (phase >= maxPhases) {
      isRunning = false;
      nextButton.html('Start');
    }
  }
}

// bugs here
function animateMovingNode() {
  animationProgress += 0.02; // Slowed down 2.5x
  
  if (animationProgress >= 1) {
    // Animation complete
    layers[4].nodes[animatingNode.toIdx].active = true;
    animatingNode = null;
    
    // Clear arrows for next phase and update network
    activeArrows = [];
    updateNetworkForNextPhase();
  } else {
    // Draw moving node
    let x = lerp(animatingNode.fromX, animatingNode.toX, animationProgress);
    let y = lerp(animatingNode.fromY, animatingNode.toY, animationProgress);
    
    fill('#FFA07A');
    stroke('blue');
    strokeWeight(2);
    circle(x, y, nodeRadius * 2);
  }
}

function updateNetworkForNextPhase() {
  // Shift context window
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 20; j++) {
      layers[i].nodes[j].active = false;
    }
  }
  
  // Activate new context window, ensuring we don't exceed array bounds
  for (let j = phase; j < 16 + phase && j < 20; j++) {
    layers[4].nodes[j].active = true;
  }
}

function toggleAnimation() {
  if (!isRunning) {
    isRunning = true;
    nextButton.html('Pause');
  } else {
    isRunning = false;
    nextButton.html('Continue');
  }
}

function stepForward() {
  if (!isRunning && animatingNode === null) {
    executeStep();
  }
}

function resetAnimation() {
  phase = 0;
  step = 0;
  isRunning = false;
  nextButton.html('Start');
  activeArrows = [];
  animatingNode = null;
  initializeLayers();
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
  // change spacing on resize
  xSpace = (canvasWidth - leftMargin) / 24;
  initializeLayers();
  // resetAnimation();
  // console.log(xSpace);
}