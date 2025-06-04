// Technology Hype Cycle Infographic
// Uses p5.js and follows standard MicroSim rules guidelines
// This code creates an interactive infographic that visualizes the Technology Hype Cycle.
// It includes five distinct regions, each with a label and description.
// The user can hover over each region to see its description.
// The infographic is responsive and adjusts to the size of its container.
// The code is designed to be accessible, with appropriate labels and descriptions for screen readers.
// Dan McCreary, 2025
let canvasWidth;
let drawHeight = 400;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 40; // top margin (for title and region labels)

const regionNames = [
  "Technology\nTrigger",
  "Peak of Inflated\nExpectations",
  "Trough of\nDisillusionment",
  "Slope of\nEnlightenment",
  "Plateau of\nProductivity"
];

const regionDescriptions = [
  "Technology Trigger: A breakthrough or proof of concept generates press and media interest, but no usable products exist yet.",
  "Peak of Inflated Expectations: Early publicity produces success stories—often accompanied by failures. A frenzy of hype builds.",
  "Trough of Disillusionment: Interest wanes as experiments and implementations fail to deliver. Producers of the technology shake out or fail.",
  "Slope of Enlightenment: More instances of how the technology can benefit enterprises start to crystallize and become more widely understood. Second- and third-generation products appear.",
  "Plateau of Productivity: Mainstream adoption starts to take off. Criteria for assessing provider viability are more clearly defined."
];

let regions = [];
let currentHover = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  initRegions();
  // Accessible description for screen readers
  describe('Technology Hype Cycle infographic with five interactive regions. Hover over each region to see its description.', LABEL);
}

function draw() {
  // Drawing area background (aliceblue) with 1px silver border
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Controls area (white background, silver border)
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);

  drawTitle();
  drawRegionLabels();
  drawDashedDividers();
  drawCurve();
  drawRegionsHighlight();
  drawDescription();
}

function drawTitle() {
  fill(0);
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  // Title centered at the top of the drawing area
  text("Technology Hype Cycle", canvasWidth / 2, margin / 2);
}

function drawRegionLabels() {
  fill(0);
  noStroke();
  textSize(16);
  textAlign(CENTER, TOP);
  for (let r of regions) {
    let centerX = (r.xStart + r.xEnd) / 2;
    // Place the label just below the title, inside the drawing region
    text(r.name, centerX, margin+20);
  }
}

function drawDashedDividers() {
  // Use the underlying canvas 2D context to apply a dashed line pattern
  stroke('silver');
  strokeWeight(1);
  drawingContext.setLineDash([5, 5]); // 5px dash, 5px gap

  // Draw vertical lines at each region boundary (except the far left and far right edges)
  for (let i = 1; i < regions.length; i++) {
    let x = regions[i].xStart;
    line(x, 0, x, drawHeight);
  }

  // Reset to solid lines for subsequent drawing
  drawingContext.setLineDash([]);
}

function drawCurve() {
  stroke(0);
  strokeWeight(2);
  noFill();

  let yOffset = drawHeight;

  // Key points for the Hype Cycle curve
  let p0 = { x: margin,              y: yOffset };
  let p1 = { x: canvasWidth * 0.20,  y: margin*2 + 20    };
  let p2 = { x: canvasWidth * 0.40,  y: yOffset - 20 };
  let p3 = { x: canvasWidth * 0.60,  y: drawHeight * 0.50 };
  let p4 = { x: canvasWidth - margin,y: drawHeight * 0.30 };

  // Smooth curve through all five points
  beginShape();
  curveVertex(p0.x, p0.y);
  curveVertex(p0.x, p0.y);
  curveVertex(p1.x, p1.y);
  curveVertex(p2.x, p2.y);
  curveVertex(p3.x, p3.y);
  curveVertex(p4.x, p4.y);
  curveVertex(p4.x, p4.y);
  endShape();
}

function drawRegionsHighlight() {
  checkHover();

  if (currentHover >= 0) {
    let r = regions[currentHover];
    noStroke();
    fill(200, 200, 255, 70);
    rect(r.xStart, 0, r.xEnd - r.xStart, drawHeight);
  }
}

function drawDescription() {
  let descY = drawHeight + 10;
  let descHeight = controlHeight - 20;

  fill(0);
  noStroke();
  textSize(16);
  textAlign(LEFT, TOP);

  if (currentHover >= 0) {
    let desc = regions[currentHover].description;
    // Wrap text within horizontal margins
    let textX = margin / 2;
    let textW = canvasWidth - margin;
    text(desc, textX, descY, textW, descHeight);
  } else {
    fill(100);
    textAlign(CENTER, CENTER);
    text(
      "Hover over a region of the curve to see its description",
      canvasWidth / 2,
      descY + descHeight / 2
    );
  }
}

function checkHover() {
  currentHover = -1;
  if (mouseY >= 0 && mouseY <= drawHeight) {
    for (let i = 0; i < regions.length; i++) {
      let r = regions[i];
      if (mouseX >= r.xStart && mouseX < r.xEnd) {
        currentHover = i;
        break;
      }
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  initRegions();
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  canvasWidth = Math.floor(container.width);
}

function initRegions() {
  regions = [];
  let usableWidth = canvasWidth - 2 * margin;
  let regionWidth = usableWidth / 5;

  for (let i = 0; i < 5; i++) {
    regions.push({
      xStart: margin + i * regionWidth,
      xEnd: margin + (i + 1) * regionWidth,
      name: regionNames[i],
      description: regionDescriptions[i],
    });
  }
}
