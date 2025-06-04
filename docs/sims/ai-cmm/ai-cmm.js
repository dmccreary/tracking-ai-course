// AI Capability Maturity Model visualization
let canvasWidth = 750;
let canvasHeight = 600;
let layers = [];
let descriptions = [];
let currentHover = -1;
let m = 20; // margins around the steps
let step_width = 140;
let sh = 80; // step height

// Define the AI maturity layers and labels
  layers = [
    { 
      x: m, 
      y: sh*4+2*m, 
      w: step_width*5, 
      h: sh, 
      level: "Level 1 - Ad Hoc", 
      color: "#FF6B6B", 
      tcolor: "white" 
    },
    { 
      x: step_width+m, 
      y: sh*3+2*m, 
      w: step_width*4, 
      h: sh, 
      level: "Level 2 - Experimental", 
      color: "#FF9F43", 
      tcolor: "white" 
    },
    { 
      x: step_width*2+m, 
      y: sh*2+2*m, 
      w: step_width*3, 
      h: sh, 
      level: "Level 3 - Systematic", 
      color: "#FFC048", 
      tcolor: "black" 
    },
    { 
      x: step_width*3+m, 
      y: sh*1+2*m, 
      w: step_width*2, 
      h: sh, 
      level: "Level 4 - Strategic", 
      color: "#5F9EA0", 
      tcolor: "white" 
    },
    { 
      x: step_width*4-m, 
      y: 2*m, 
      w: step_width+40, 
      h: sh, 
      level: "L5 - Transformative", 
      color: "#2E86AB", 
      tcolor: "white" 
    }
  ];

// Global descriptions for AI maturity levels
descriptions = [
  "Level 1 - Ad Hoc: Organizations at this level have little to no formal AI strategy. AI initiatives are isolated, experimental, or driven by individual enthusiasm. There's limited understanding of AI capabilities, no governance framework, and scattered pilot projects with unclear ROI. Data infrastructure is fragmented and AI literacy is low across the organization.",
  
  "Level 2 - Experimental: Organizations begin exploring AI through small-scale pilots and proof-of-concepts. There's growing awareness of AI potential, but implementation remains departmental. Basic data infrastructure exists, some staff receive AI training, and initial governance policies are drafted. Success metrics are being defined, but scaling remains challenging.",
  
  "Level 3 - Systematic: AI initiatives become more coordinated with established governance frameworks. Organizations have dedicated AI teams, standardized processes for AI development, and systematic data management. Multiple AI use cases are deployed in production, ROI is measurable, and there's organization-wide AI literacy programs. Risk management practices are formalized.",
  
  "Level 4 - Strategic: AI is integrated into core business strategy and operations. Organizations have comprehensive AI governance, advanced data platforms, and centers of excellence. AI drives significant business value, competitive advantage is clear, and there's continuous innovation in AI capabilities. Ethical AI practices are embedded throughout the organization.",
  
  "Level 5 - Transformative: AI is fundamental to the organization's identity and operations. The organization leads in AI innovation, has autonomous AI systems, and demonstrates measurable transformation of business models. AI capabilities are a core differentiator, enabling new markets and revenue streams. The organization contributes to AI advancement in their industry."
];

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  var mainElement = document.querySelector('main');
  canvas.parent(mainElement);
  textSize(16);
  
  // Accessibility description
  describe('AI Capability Maturity Model showing five levels of organizational AI maturity from Ad Hoc to Transformative, displayed as ascending steps with detailed descriptions available on hover.', LABEL);
}


function draw() {
  background('aliceblue');
  
  // Title
  fill(50);
  textSize(28);
  textAlign(CENTER, TOP);
  text("AI Capability Maturity Model", canvasWidth/2-40, 10);
  
  // Draw the stepped layers
  textSize(18);
  textAlign(CENTER, CENTER);
  
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    
    // Highlight on hover
    if (i === currentHover) {
      stroke(50);
      strokeWeight(4);
    } else {
      stroke(100);
      strokeWeight(2);
    }
    
    // Draw the step rectangle
    fill(l.color);
    rect(l.x, l.y, l.w, l.h, 5);
    
    // Draw the level text
    fill(l.tcolor);
    noStroke();
    text(l.level, l.x + l.w / 2, l.y + l.h / 2);
  }
  
  // Draw arrows indicating progression
  //drawProgressionArrows();
  
  // Display description text at the bottom
  if (currentHover != -1) {
    fill(255, 255, 255, 240);
    stroke(150);
    strokeWeight(1);
    rect(10, 450, canvasWidth-20, 140, 5);
    
    fill(0);
    noStroke();
    textSize(16);
    textAlign(LEFT, TOP);
    text(descriptions[currentHover], 20, 460, canvasWidth-40, 120);
  } else {
    // Default instruction text
    fill(100);
    textSize(18);
    textAlign(CENTER, CENTER);
    text("Hover over each level to explore AI maturity characteristics", canvasWidth/2, 520);
  }
}

function drawProgressionArrows() {
  // Draw subtle arrows between levels to show progression
  stroke(100);
  strokeWeight(2);
  fill(100);
  
  for (let i = 0; i < layers.length - 1; i++) {
    let fromLayer = layers[i];
    let toLayer = layers[i + 1];
    
    // Calculate arrow positions
    let startX = fromLayer.x + fromLayer.w - 30;
    let startY = fromLayer.y + 10;
    let endX = toLayer.x + 30;
    let endY = toLayer.y + toLayer.h - 10;
    
    // Draw arrow line
    line(startX, startY, endX, endY);
    
    // Draw arrowhead
    let arrowSize = 8;
    let angle = atan2(endY - startY, endX - startX);
    
    push();
    translate(endX, endY);
    rotate(angle);
    noStroke();
    triangle(0, 0, -arrowSize*1.5, -arrowSize*0.6, -arrowSize*1.5, arrowSize*0.6);
    pop();
  }
}

function mouseMoved() {
  currentHover = -1;
  for (let i = 0; i < layers.length; i++) {
    let l = layers[i];
    if (mouseX >= l.x && mouseX <= l.x + l.w && mouseY >= l.y && mouseY <= l.y + l.h) {
      currentHover = i;
      break;
    }
  }
}

