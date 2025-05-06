// Responsive MMLU Benchmark Line Chart (v3)
// Follows MicroSim responsive layout rules

let data = [
    { date: '2020-06', GPT3: 43.9 },
    { date: '2021-06', GPT3: 45.2 },
    { date: '2022-03', GPT3: 46.8, PaLM: 55.0 },
    { date: '2023-03', GPT4: 86.4, Claude1: 71.2, PaLM: 58.2 },
    { date: '2023-07', GPT4: 86.8, Claude2: 75.0, Gemini: 77.5, LLaMA2: 68.0 },
    { date: '2023-12', GPT4: 87.0, Claude3: 82.1, Gemini: 81.2, LLaMA2: 69.2 },
    { date: '2024-03', GPT4: 87.2, Claude3: 84.5, Gemini: 83.0, Mistral: 79.1 },
    { date: '2024-06', GPT4: 87.4, Claude3: 86.8, Gemini: 85.1, Mistral: 80.7 }
  ];
  
  let models = ['GPT3', 'GPT4', 'Claude1', 'Claude2', 'Claude3', 'PaLM', 'Gemini', 'LLaMA2', 'Mistral'];
  let colors;
  
  let margin = 60;
  let graphW, graphH;
  let dotRadius = 6;
  let dates = [];
  
  function setup() {
    createCanvas(windowWidth * 0.95, 550);
    textFont('Helvetica');
    noLoop();
  
    colors = {
      GPT3: color(0, 102, 204),
      GPT4: color(0, 200, 120),
      Claude1: color(255, 128, 0),
      Claude2: color(255, 165, 0),
      Claude3: color(255, 90, 0),
      PaLM: color(255, 0, 0),
      Gemini: color(128, 0, 128),
      LLaMA2: color(100, 100, 255),
      Mistral: color(0, 180, 255)
    };
  
    for (let row of data) dates.push(row.date);
  }
  
  function draw() {
    background(255);
    graphW = width - 2 * margin;
    graphH = height - 2 * margin - 40;
  
    drawTitle();
    drawAxes();
    drawLines();
    drawLegendTopLeft();
  }
  
  function drawTitle() {
    textAlign(CENTER, CENTER);
    textSize(24);
    fill(0);
    text('MMLU Benchmark', width / 2, 30);
  }
  
  function drawAxes() {
    stroke(0);
    line(margin, margin + 40, margin, margin + 40 + graphH); // Y axis
    line(margin, margin + 40 + graphH, margin + graphW, margin + 40 + graphH); // X axis
  
    textSize(12); // Set smaller font for axis labels
  
    // Y Axis labels
    for (let i = 40; i <= 90; i += 10) {
      let y = map(i, 40, 90, graphH + margin + 40, margin + 40);
      line(margin - 5, y, margin, y);
      noStroke();
      fill(0);
      textAlign(RIGHT, CENTER);
      text(i + '%', margin - 10, y);
      stroke(200);
      line(margin, y, margin + graphW, y); // horizontal grid line
      stroke(0);
    }
  
    // X Axis labels
    let xGap = graphW / (dates.length - 1);
    for (let i = 0; i < dates.length; i++) {
      let x = margin + i * xGap;
      line(x, margin + 40 + graphH, x, margin + 40 + graphH + 5);
      noStroke();
      fill(0);
      textAlign(CENTER, TOP);
      text(dates[i], x, margin + 40 + graphH + 10);
      stroke(0);
    }
  }
  
  function drawLines() {
    let xGap = graphW / (dates.length - 1);
  
    for (let model of models) {
      stroke(colors[model]);
      strokeWeight(2);
      noFill();
      beginShape();
      for (let i = 0; i < data.length; i++) {
        let val = data[i][model];
        if (val !== undefined) {
          let x = margin + i * xGap;
          let y = map(val, 40, 90, graphH + margin + 40, margin + 40);
          vertex(x, y);
        }
      }
      endShape();
  
      for (let i = 0; i < data.length; i++) {
        let val = data[i][model];
        if (val !== undefined) {
          let x = margin + i * xGap;
          let y = map(val, 40, 90, graphH + margin + 40, margin + 40);
          fill(colors[model]);
          noStroke();
          ellipse(x, y, dotRadius * 2);
        }
      }
    }
  }
  
  function drawLegendTopLeft() {
    let x = margin + 10;
    let y = margin + 10;
    textAlign(LEFT, CENTER);
    textSize(12);
  
    for (let model of models) {
      fill(colors[model]);
      noStroke();
      ellipse(x, y, 10);
      fill(0);
      text(model, x + 14, y);
      y += 18;
    }
  }
  
  function windowResized() {
    resizeCanvas(windowWidth * 0.95, 550);
    redraw();
  }
  