// AI Acceleration MicroSim using pure p5.js
// Canvas dimensions
let canvasWidth = 900;
let drawHeight = 500;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;

// Global variables for responsive design
let containerWidth;
let containerHeight = canvasHeight;

// Node and edge data
let nodes = [];
let edges = [];
let currentHover = null;
let nodeWidth = 140;
let nodeHeight = 80;

// Concept descriptions
let descriptions = {
    'Training Data': 'Training Data: The massive datasets used to train AI models. As AI becomes better, it can generate more synthetic data, clean existing datasets, and help collect new data more efficiently. Better AI tools also enable more sophisticated data labeling and curation.',
    'New Algorithms': 'New Algorithms: Novel machine learning architectures, optimization techniques, and computational methods. Better AI accelerates algorithm discovery through automated machine learning (AutoML), neural architecture search, and AI-assisted research that can explore vast solution spaces.',
    'Better Hardware': 'Better Hardware: Specialized chips like GPUs, TPUs, and neuromorphic processors designed for AI workloads. As AI improves, it helps design more efficient chips, optimize hardware layouts, and predict performance characteristics, creating a feedback loop of hardware advancement.',
    'Better AI': 'Better AI: More capable, efficient, and generalizable artificial intelligence systems. These improved systems then contribute back to all three input factors - helping generate training data, discovering new algorithms, and designing better hardware - creating an accelerating cycle of progress.'
};

function setup() {
    updateCanvasSize();
    const canvas = createCanvas(containerWidth, containerHeight);
    canvas.parent(document.querySelector('main'));
    
    initializeNetwork();
    
    describe('AI Acceleration causal loop diagram showing how Training Data, New Algorithms, and Better Hardware create Better AI in a reinforcing cycle.', LABEL);
}

function initializeNetwork() {
    // Calculate positions for left-to-right flow
    let leftX = margin + nodeWidth/2 + 20;
    let rightX = canvasWidth - margin - nodeWidth/2 - 20;
    let centerY = drawHeight / 2;
    let spacing = (drawHeight - 2*margin - nodeHeight) / 3;

    // Define nodes with fixed positions
    nodes = [
        {
            id: 'Training Data',
            label: 'Training\nData',
            x: leftX,
            y: margin + nodeHeight/2 + spacing * 0.5,
            color: '#4CAF50',
            borderColor: '#2E7D32',
            textColor: 'white',
            width: nodeWidth,
            height: nodeHeight
        },
        {
            id: 'New Algorithms',
            label: 'New\nAlgorithms',
            x: leftX,
            y: centerY,
            color: '#2196F3',
            borderColor: '#1565C0',
            textColor: 'white',
            width: nodeWidth,
            height: nodeHeight
        },
        {
            id: 'Better Hardware',
            label: 'Better\nHardware',
            x: leftX,
            y: drawHeight - margin - nodeHeight/2 - spacing * 0.5,
            color: '#FF9800',
            borderColor: '#E65100',
            textColor: 'white',
            width: nodeWidth,
            height: nodeHeight
        },
        {
            id: 'Better AI',
            label: 'Better\nAI',
            x: rightX,
            y: centerY,
            color: '#9C27B0',
            borderColor: '#4A148C',
            textColor: 'white',
            width: nodeWidth + 20,
            height: nodeHeight + 20
        }
    ];

    // Define edges with labels
    edges = [
        {
            from: 'Training Data',
            to: 'Better AI',
            label: 'Enables',
            type: 'forward'
        },
        {
            from: 'New Algorithms',
            to: 'Better AI',
            label: 'Improves',
            type: 'forward'
        },
        {
            from: 'Better Hardware',
            to: 'Better AI',
            label: 'Accelerates',
            type: 'forward'
        },
        {
            from: 'Better AI',
            to: 'Training Data',
            label: 'Generates More',
            type: 'feedback'
        },
        {
            from: 'Better AI',
            to: 'New Algorithms',
            label: 'Discovers',
            type: 'feedback'
        },
        {
            from: 'Better AI',
            to: 'Better Hardware',
            label: 'Designs',
            type: 'feedback'
        }
    ];
}

function draw() {
    // Draw background
    fill('aliceblue');
    stroke('silver');
    strokeWeight(1);
    rect(0, 0, canvasWidth, drawHeight);
    
    // Controls area
    fill('white');
    stroke('silver');
    strokeWeight(1);
    rect(0, drawHeight, canvasWidth, controlHeight);
    
    // Title
    fill('black');
    noStroke();
    textSize(24);
    textAlign(CENTER, TOP);
    text("AI Acceleration: The Reinforcing Cycle", canvasWidth/2, 15);
    
    // Check for hover
    checkHover();
    
    // Draw edges first (so they appear behind nodes)
    drawEdges();
    
    // Draw nodes
    drawNodes();
    
    // Draw description area
    drawDescription();
}

function checkHover() {
    currentHover = null;
    
    // Check if mouse is over any node
    for (let node of nodes) {
        if (mouseX > node.x - node.width/2 && mouseX < node.x + node.width/2 &&
            mouseY > node.y - node.height/2 && mouseY < node.y + node.height/2) {
            currentHover = node.id;
            break;
        }
    }
}

function drawNodes() {
    for (let node of nodes) {
        // Highlight if hovered
        if (currentHover === node.id) {
            stroke(node.borderColor);
            strokeWeight(4);
        } else {
            stroke(node.borderColor);
            strokeWeight(2);
        }
        
        // Draw node rectangle with rounded corners
        fill(node.color);
        rect(node.x - node.width/2, node.y - node.height/2, node.width, node.height, 10);
        
        // Draw node label
        fill(node.textColor);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(24);
        text(node.label, node.x, node.y);
    }
}

function drawEdges() {
    textAlign(CENTER, CENTER);
    
    for (let edge of edges) {
        let fromNode = nodes.find(n => n.id === edge.from);
        let toNode = nodes.find(n => n.id === edge.to);
        
        if (fromNode && toNode) {
            if (edge.type === 'forward') {
                drawForwardArrow(fromNode, toNode, edge.label);
            } else {
                drawFeedbackArrow(fromNode, toNode, edge.label);
            }
        }
    }
}

function drawForwardArrow(fromNode, toNode, label) {
    // Calculate edge positions
    let fromX = fromNode.x + fromNode.width/2;
    let fromY = fromNode.y;
    let toX = toNode.x - toNode.width/2;
    let toY = toNode.y;
    
    // Draw straight arrow
    stroke('#333');
    strokeWeight(3);
    line(fromX, fromY, toX, toY);
    
    // Draw arrowhead
    let arrowAngle = atan2(toY - fromY, toX - fromX);
    let arrowSize = 10;
    
    fill('#333');
    noStroke();
    push();
    translate(toX, toY);
    rotate(arrowAngle);
    triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
    pop();
    
    // Draw label
    fill('#333');
    noStroke();
    textSize(12);
    let midX = (fromX + toX) / 2;
    let midY = (fromY + toY) / 2 - 15;
    text(label, midX, midY);
}

function drawFeedbackArrow(fromNode, toNode, label) {
    // Calculate curved path for feedback arrows - keep original line logic
    let fromX = fromNode.x - fromNode.width/2;
    let fromY = fromNode.y;
    let toX = toNode.x + toNode.width/2;
    let toY = toNode.y;
    
    // Create curved path that goes around the outside
    let controlOffset = 80;
    let controlX1 = fromX + controlOffset;
    let controlY1 = fromY;
    let controlX2 = toX - controlOffset;
    let controlY2 = toY;
    
    // Adjust control points to curve around
    if (toNode.y < fromNode.y) {
        controlY1 -= controlOffset;
        controlY2 -= controlOffset;
    } else if (toNode.y > fromNode.y) {
        controlY1 += controlOffset;
        controlY2 += controlOffset;
    } else {
        controlY1 += controlOffset;
        controlY2 += controlOffset;
    }
    
    // Draw curved line (exactly as original)
    noFill();
    stroke('#666');
    strokeWeight(2);
    drawingContext.setLineDash([5, 5]);
    bezier(fromX, fromY, controlX1, controlY1, controlX2, controlY2, toX, toY);
    drawingContext.setLineDash([]);
    
    // Calculate where the curve actually intersects the right edge of the target box
    // Find the Y position where the curve crosses the right edge
    let t = 0.9; // Parameter along the bezier curve near the end
    let curveY = (1-t)*(1-t)*(1-t)*fromY + 3*(1-t)*(1-t)*t*controlY1 + 3*(1-t)*t*t*controlY2 + t*t*t*toY;
    
    // Position arrowhead where curve actually hits the box edge
    let arrowX = toX;
    let arrowY = curveY;
    
    // Calculate arrow direction at the intersection point
    let arrowAngle = -atan2(controlY2 - arrowY, controlX2 - arrowX);
    let arrowSize = 14;
    
    // Draw arrowhead at the curve intersection point
    fill('#666');
    noStroke();
    push();
    translate(arrowX, arrowY);
    rotate(arrowAngle);
    triangle(0, 0, -arrowSize * 1.5, -arrowSize * 0.6, -arrowSize * 1.5, arrowSize * 0.6);
    pop();
    
    // Draw label
    fill('#666');
    noStroke();
    textSize(11);
    let labelX = (controlX1 + controlX2) / 2;
    let labelY = (controlY1 + controlY2) / 2;
    text(label, labelX, labelY);
}

function drawDescription() {
    let descriptionY = drawHeight + 10;
    let descriptionHeight = controlHeight - 20;
    
    // Display description for hovered node
    if (currentHover) {
        fill('black');
        noStroke();
        textSize(constrain(containerWidth * 0.014, 11, 13));
        textAlign(LEFT, TOP);
        
        // Draw description text
        let descWidth = canvasWidth - 40;
        let description = descriptions[currentHover] || 'No description available';
        text(description, 20, descriptionY, descWidth, descriptionHeight);
    } else {
        // Display instruction when no node is hovered
        fill('#666666');
        noStroke();
        textSize(constrain(containerWidth * 0.016, 12, 14));
        textAlign(CENTER, CENTER);
        text("Hover over the concepts to learn about their role in AI acceleration", 
                canvasWidth / 2, descriptionY + descriptionHeight / 2);
    }
}

function windowResized() {
    updateCanvasSize();
    resizeCanvas(containerWidth, containerHeight);
    initializeNetwork();
    redraw();
}

function updateCanvasSize() {
    const container = document.querySelector('main').getBoundingClientRect();
    containerWidth = Math.floor(container.width);
    canvasWidth = containerWidth;
}