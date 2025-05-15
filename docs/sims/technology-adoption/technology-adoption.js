// Technology Adoption Curve MicroSim
// Canvas dimensions
let canvasWidth = 500;
let drawHeight = 400;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Global variables for responsive design
let containerWidth; // calculated by container upon resize
let containerHeight = canvasHeight; // fixed height on page

// Variables for the visualization
let currentHover = -1;
let adoptionGroups = [];

// Bell curve properties
let bellCurve = [];
let numPoints = 200;

// Slider for skewness
let skewnessSlider;
let skewness = 0; // Default is symmetric bell curve

function setup() {
  // Create a canvas to match the parent container's size
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent(document.querySelector('main'));
  textSize(defaultTextSize);
  
  // Create skewness slider
  skewnessSlider = createSlider(-2, 2, 0, 0.1);
  skewnessSlider.position(120, drawHeight + 15);
  skewnessSlider.size(containerWidth - 150);
  
  // Define the adoption groups and their properties
  adoptionGroups = [
    {
      name: "Innovators",
      percentage: 2.5,
      color: "red",
      tcolor: "white",
      description: "Innovators (2.5%): These are technology enthusiasts who are willing to take risks with new technologies. They pursue new products aggressively and are intrigued by any new product release. They want to be the first to try new things, even if there might be bugs or issues.",
      url: "https://en.wikipedia.org/wiki/Technology_adoption_life_cycle#Innovators"
    },
    {
      name: "Early Adopters",
      percentage: 13.5,
      color: "orange",
      tcolor: "black",
      description: "Early Adopters (13.5%): These are visionaries who understand and appreciate the benefits of new technology and relate potential benefits to their own needs. They're quick to adopt new technologies that they believe will provide them with a competitive advantage.",
      url: "https://en.wikipedia.org/wiki/Technology_adoption_life_cycle#Early_adopters"
    },
    {
      name: "Early Majority",
      percentage: 34,
      color: "green",
      tcolor: "white",
      description: "Early Majority (34%): These are pragmatists who adopt new technology when they see proven benefits but avoid risks. They tend to be practical and want to see how the technology works for others before investing. They're an important group as they represent a large segment of the market.",
      url: "https://en.wikipedia.org/wiki/Technology_adoption_life_cycle#Early_majority"
    },
    {
      name: "Late Majority",
      percentage: 34,
      color: "blue",
      tcolor: "white",
      description: "Late Majority (34%): These are conservatives who are skeptical of new technology and will only adopt it after it has become an established standard. They're often driven by economic necessity or peer pressure rather than a desire for improvement or competitive advantage.",
      url: "https://en.wikipedia.org/wiki/Technology_adoption_life_cycle#Late_majority"
    },
    {
      name: "Laggards",
      percentage: 16,
      color: "purple",
      tcolor: "white",
      description: "Laggards (16%): These are traditionalists who are very suspicious of new technology and will only adopt it when they have no other choice. They tend to be very price-sensitive and may have strong ideological resistance to innovation.",
      url: "https://en.wikipedia.org/wiki/Technology_adoption_life_cycle#Laggards"
    }
  ];
  
  // Generate initial bell curve points
  generateBellCurve();
  
  describe('An interactive Technology Adoption Curve showing the normal distribution of technology adoption across population segments. Hover over segments to see descriptions, click to visit Wikipedia.', LABEL);
}

function draw() {
  // Draw area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  
  // Controls area
  fill('white');
  stroke('silver');
  strokeWeight(1);
  rect(0, drawHeight, canvasWidth, controlHeight);
  
  // Update skewness value from slider
  skewness = skewnessSlider.value();
  
  // Generate bell curve with current skewness
  generateBellCurve();
  
  // Draw the title
  fill('black');
  noStroke();
  textSize(24);
  textAlign(CENTER, TOP);
  text("Technology Adoption Curve", canvasWidth/2, margin/2);
  
  // Draw bell curve and fill segments
  drawAdoptionCurve();
  
  // Draw segment labels
  drawSegmentLabels();
  
  // Draw control labels
  fill('black');
  noStroke();
  textSize(defaultTextSize);
  textAlign(LEFT, CENTER);
  text("Skewness:", 20, drawHeight + 25);
  
  // Draw description
  drawDescription();
}

function generateBellCurve() {
  // Generate bell curve points with adjustable skewness
  bellCurve = [];
  
  let maxHeight = drawHeight * 0.6;
  let xSpacing = (canvasWidth - 2 * margin) / numPoints;
  
  for (let i = 0; i < numPoints; i++) {
    let x = margin + i * xSpacing;
    
    // Normalize i to be between -3 and 3 for the bell curve
    let normalizedI = (i / numPoints) * 6 - 3;
    
    // Apply skewness
    let skewedI = normalizedI + skewness * normalizedI * normalizedI / 5;
    
    // Bell curve formula
    let y = maxHeight * Math.exp(-skewedI * skewedI / 2);
    
    // Y position from top - invert because p5.js has 0,0 at top-left
    let yPos = drawHeight - margin - y;
    
    bellCurve.push({ x: x, y: yPos });
  }
}

function drawAdoptionCurve() {
  // Calculate segment boundaries based on cumulative percentages
  let cumulativePercentages = [0];
  let sum = 0;
  for (let group of adoptionGroups) {
    sum += group.percentage;
    cumulativePercentages.push(sum);
  }
  
  // Draw and fill segments
  for (let i = 0; i < adoptionGroups.length; i++) {
    let startPercent = cumulativePercentages[i];
    let endPercent = cumulativePercentages[i + 1];
    
    // Calculate start and end indices in the bellCurve array
    let startIndex = Math.floor((startPercent / 100) * numPoints);
    let endIndex = Math.floor((endPercent / 100) * numPoints);
    
    // Ensure indices are within bounds
    startIndex = Math.max(0, Math.min(startIndex, numPoints - 1));
    endIndex = Math.max(0, Math.min(endIndex, numPoints - 1));
    
    // Segment is hovered - highlight it
    if (i === currentHover) {
      stroke('black');
      strokeWeight(2);
    } else {
      noStroke();
    }
    
    // Fill the segment with its color
    fill(adoptionGroups[i].color);
    
    // Draw the segment as a polygon
    beginShape();
    // Bottom left corner
    vertex(bellCurve[startIndex].x, drawHeight - margin);
    
    // Top curve points
    for (let j = startIndex; j <= endIndex; j++) {
      vertex(bellCurve[j].x, bellCurve[j].y);
    }
    
    // Bottom right corner
    vertex(bellCurve[endIndex].x, drawHeight - margin);
    
    endShape(CLOSE);
    
    // Store segment coordinates for hover detection
    adoptionGroups[i].coords = {
      startX: bellCurve[startIndex].x,
      endX: bellCurve[endIndex].x
    };
  }
  
  // Draw the curve outline
  stroke('black');
  strokeWeight(2);
  noFill();
  beginShape();
  for (let point of bellCurve) {
    vertex(point.x, point.y);
  }
  endShape();
}

function drawSegmentLabels() {
  // Calculate x-position for each segment's label
  for (let i = 0; i < adoptionGroups.length; i++) {
    let group = adoptionGroups[i];
    let midX = (group.coords.startX + group.coords.endX) / 2;
    
    // Draw vertical lines between segments
    if (i > 0) {
      stroke('gray');
      strokeWeight(1);
      line(group.coords.startX, drawHeight - margin, group.coords.startX, bellCurve[i].y - 20);
    }
    
    // Determine text size based on segment width
    let segmentWidth = group.coords.endX - group.coords.startX;
    let scaledTextSize = constrain(segmentWidth * 0.15, 8, defaultTextSize);
    
    // Draw label
    fill(group.tcolor);
    noStroke();
    textSize(scaledTextSize);
    textAlign(CENTER, BOTTOM);
    
    // Check if there's enough space to write the full name
    let labelY = bellCurve[Math.floor((i + 0.5) * numPoints / adoptionGroups.length)].y + 20;
    
    // Use abbreviated names for small segments
    let displayName = group.name;
    if (segmentWidth < 60) {
      displayName = group.name.substring(0, 3) + ".";
    }
    
    text(displayName, midX, labelY);
    
    // Draw percentage under name
    textSize(scaledTextSize * 0.8);
    text(group.percentage + "%", midX, labelY + scaledTextSize + 5);
  }
}

function drawDescription() {
  let descriptionY = drawHeight - margin * 2.5;
  let descriptionHeight = margin * 2;
  
  // Display description for hovered segment
  if (currentHover !== -1) {
    fill('black');
    noStroke();
    textSize(constrain(containerWidth * 0.025, 12, 15));
    textAlign(LEFT, TOP);
    
    // Draw description box
    fill(240);
    rect(margin, descriptionY, canvasWidth - 2 * margin, descriptionHeight);
    
    fill(0);
    text(adoptionGroups[currentHover].description, margin + 10, descriptionY + 10, 
         canvasWidth - 2 * margin - 20, descriptionHeight - 20);
  } else {
    // Display instruction when no segment is hovered
    fill('#666666');
    noStroke();
    textSize(constrain(containerWidth * 0.025, 12, 15));
    textAlign(CENTER, CENTER);
    text("Hover over segments to see descriptions, click to visit Wikipedia", 
         canvasWidth / 2, descriptionY + descriptionHeight / 2);
  }
}

function mouseMoved() {
  // Check if mouse is within the drawing area (bell curve region)
  if (mouseY > drawHeight - margin || mouseY < margin) {
    currentHover = -1;
    return;
  }
  
  // Find which segment the mouse is over
  for (let i = 0; i < adoptionGroups.length; i++) {
    if (mouseX >= adoptionGroups[i].coords.startX && 
        mouseX <= adoptionGroups[i].coords.endX) {
      currentHover = i;
      return;
    }
  }
  
  currentHover = -1;
}

function mouseClicked() {
  // Check if a segment is clicked and open its URL
  if (currentHover !== -1 && mouseY < drawHeight) {
    window.open(adoptionGroups[currentHover].url, '_blank');
  }
}

function windowResized() {
  // Update canvas size when the container resizes
  updateCanvasSize();
  resizeCanvas(containerWidth, containerHeight);
  
  // Reposition and resize slider
  skewnessSlider.position(120, drawHeight + 15);
  skewnessSlider.size(containerWidth - 150);
  
  // Regenerate bell curve with new dimensions
  generateBellCurve();
  
  redraw();
}

function updateCanvasSize() {
  // Get the exact dimensions of the container
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);  // Avoid fractional pixels
  canvasWidth = containerWidth;
}