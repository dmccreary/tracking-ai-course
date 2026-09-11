// Second Half of the Chess Board MicroSim
// The classic "rice on the chessboard" story: one grain of rice on square 1,
// doubling on every square that follows. The dashed line marks the boundary
// between the first half of the board (squares 1-32, still manageable) and
// the second half (squares 33-64, where the totals become astronomical).

// Canvas layout (REQUIRED structure: draw region on top, controls below)
let canvasWidth = 700;
let titleHeight = 40;
let boardGap = 8;
let boardMaxSize = 400;
let captionGap = 8;
let captionHeight = 32; // room for 2 wrapped lines on narrow (mobile) widths
let infoGap = 6;
let infoHeight = 64; // 3 tightly-packed rows, sized to fit the original 632px canvas height
let bottomPad = 8;
let drawHeight = titleHeight + boardGap + boardMaxSize + captionGap + captionHeight + infoGap + infoHeight + bottomPad;
let controlHeight = 64;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 175;
let defaultTextSize = 16;

let stepSlider;

const ROWS = 8;
const COLS = 8;
const TOTAL_SQUARES = ROWS * COLS; // 64

// Abbreviations use binary units (K = 2^10, M = 2^20, ...) instead of decimal
// SI units. Because every square's grain count is itself a power of two, this
// makes every abbreviated value land on a whole number: 1024 grains = "1K",
// 2048 = "2K", 1,048,576 = "1M", and so on all the way up the board.
const UNITS = [
  { exp: 60, symbol: 'Qi', name: 'Quintillion' },
  { exp: 50, symbol: 'Qa', name: 'Quadrillion' },
  { exp: 40, symbol: 'T',  name: 'Trillion' },
  { exp: 30, symbol: 'B',  name: 'Billion' },
  { exp: 20, symbol: 'M',  name: 'Million' },
  { exp: 10, symbol: 'K',  name: 'Thousand' },
];

// Squares small enough to draw as individual grains of rice (count -> [rows, cols])
const GRAIN_LAYOUT = { 1: [1, 1], 2: [1, 2], 4: [2, 2], 8: [2, 4], 16: [4, 4], 32: [4, 8] };

// Rough real-world estimate for framing the growth in economic terms: dry
// white rice weighs roughly 25 mg per grain, and sells for around $0.75/lb
// (~$1.65/kg) at typical US bulk retail prices -- about $0.00004 per grain.
// This is a back-of-envelope figure for illustrating scale, not a precise
// commodity-market quote, and doesn't move with actual market prices.
const RICE_PRICE_PER_GRAIN_USD = 0.00004;

// Standard decimal (SI) units for formatting dollar amounts -- unlike the
// grain-count UNITS above, dollar values aren't powers of two, so there's no
// reason to use binary units here.
const DOLLAR_UNITS = [
  { v: 1e15, name: 'Quadrillion' },
  { v: 1e12, name: 'Trillion' },
  { v: 1e9,  name: 'Billion' },
  { v: 1e6,  name: 'Million' },
  { v: 1e3,  name: 'Thousand' },
];

function formatDollars(value) {
  const abs = Math.abs(value);
  for (const u of DOLLAR_UNITS) {
    if (abs >= u.v) {
      return '$' + (value / u.v).toFixed(2) + ' ' + u.name;
    }
  }
  return '$' + (abs >= 0.01 ? value.toFixed(2) : value.toFixed(5));
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  stepSlider = createSlider(1, TOTAL_SQUARES, 1, 1);
  stepSlider.position(sliderLeftMargin, drawHeight + 18);
  stepSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('A red and black checkered chess board where each square holds double the grains of rice of the square before it, revealed one square at a time with a slider, showing how the total explodes in the second half of the board.', LABEL);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = Math.floor(container.getBoundingClientRect().width);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  stepSlider.size(canvasWidth - sliderLeftMargin - margin);
}

// Returns the abbreviated label for grains = 2^exponent
function formatGrains(exponent) {
  for (const u of UNITS) {
    if (exponent >= u.exp) {
      const value = 1n << BigInt(exponent - u.exp);
      return value.toString() + u.symbol;
    }
  }
  return (1n << BigInt(exponent)).toString();
}

// Returns the spelled-out unit name (e.g. "Million") for grains = 2^exponent
function formatGrainsUnitName(exponent) {
  for (const u of UNITS) {
    if (exponent >= u.exp) {
      return u.name;
    }
  }
  return '';
}

function draw() {
  fill('aliceblue');
  noStroke();
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  textSize(26);
  textAlign(CENTER, TOP);
  noStroke();
  text('Second Half of the Chess Board', canvasWidth / 2, margin - 12);
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  const revealStep = stepSlider.value();
  const boardSize = min(canvasWidth - 2 * margin, boardMaxSize);
  const cellSize = boardSize / COLS;
  const boardX = (canvasWidth - boardSize) / 2;
  const boardY = titleHeight + boardGap;

  drawBoard(boardX, boardY, boardSize, cellSize, revealStep);
  drawCaption(boardX, boardY, boardSize, cellSize);
  drawInfoPanel(boardY, boardSize, revealStep);

  // Slider label + value (drawn to the left of the slider, control region)
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);
  textStyle(BOLD);
  text('Doubling Step: ' + revealStep, margin, drawHeight + 27);
  textStyle(NORMAL);
}

function drawBoard(boardX, boardY, boardSize, cellSize, revealStep) {
  for (let i = 0; i < TOTAL_SQUARES; i++) {
    const row = Math.floor(i / COLS);
    const col = i % COLS;
    const squareNum = i + 1; // 1-based, reading left-to-right, top-to-bottom
    const x = boardX + col * cellSize;
    const y = boardY + row * cellSize;

    const isRed = (row + col) % 2 === 0;
    fill(isRed ? '#b3261e' : '#1a1a1a');
    stroke('#000000');
    strokeWeight(1);
    rect(x, y, cellSize, cellSize);

    // Small square number in the corner for orientation
    noStroke();
    fill(255, 255, 255, 110);
    textAlign(LEFT, TOP);
    textSize(max(9, cellSize * 0.16));
    text(squareNum, x + 3, y + 2);

    if (squareNum <= revealStep) {
      drawSquareContents(x, y, cellSize, squareNum);
    }
  }

  // Board border
  noFill();
  stroke('#000000');
  strokeWeight(2);
  rect(boardX, boardY, boardSize, boardSize);
  noStroke();
}

function drawSquareContents(x, y, cellSize, squareNum) {
  const exponent = squareNum - 1; // grains = 2^exponent
  const grains = 1n << BigInt(exponent);

  if (grains <= 32n) {
    drawGrains(x, y, cellSize, Number(grains));
  } else {
    const label = exponent < 10 ? grains.toString() : formatGrains(exponent);
    fill('white');
    stroke('#000000');
    strokeWeight(0.5);
    textAlign(CENTER, CENTER);
    textSize(constrain(cellSize * 0.264, 12, 24));
    text(label, x + cellSize / 2, y + cellSize / 2 + cellSize * 0.05);
    noStroke();
  }
}

function drawGrains(x, y, cellSize, count) {
  const [rows, cols] = GRAIN_LAYOUT[count] || [1, count];
  const padding = cellSize * 0.16;
  const cellW = (cellSize - 2 * padding) / cols;
  const cellH = (cellSize - 2 * padding) / rows;
  const grainW = min(cellW, cellH) * 0.55;
  const grainH = grainW * 1.9;

  fill('white');
  stroke('#555555');
  strokeWeight(0.4);
  let n = 0;
  for (let r = 0; r < rows && n < count; r++) {
    for (let c = 0; c < cols && n < count; c++) {
      const gx = x + padding + cellW * (c + 0.5);
      const gy = y + padding + cellH * (r + 0.5);
      push();
      translate(gx, gy);
      // Deterministic slight tilt so grains look natural (no randomness -> no flicker)
      rotate((((r * 3 + c * 5) % 7) - 3) * 0.12);
      ellipse(0, 0, grainW, grainH);
      pop();
      n++;
    }
  }
  noStroke();
}

function drawCaption(boardX, boardY, boardSize, cellSize) {
  // Dashed line marks the boundary between square 32 and square 33
  const midY = boardY + 4 * cellSize;
  stroke('#ffffff');
  strokeWeight(3);
  drawingContext.setLineDash([8, 6]);
  line(boardX, midY, boardX + boardSize, midY);
  drawingContext.setLineDash([]);
  noStroke();

  fill('#1a1a1a');
  textAlign(CENTER, TOP);
  textSize(constrain(canvasWidth * 0.0165, 10, 12));
  textStyle(ITALIC);
  // text()'s width argument makes x the LEFT edge of the wrap box (textAlign
  // only affects alignment of each line within that box), so the box must be
  // positioned explicitly rather than centered on canvasWidth / 2. Kept short
  // so it reliably wraps to no more than 2 lines within captionHeight, even
  // on narrow (mobile) widths.
  text(
    'Dashed line = halfway point. The second half is where the real economic impact hits.',
    margin, boardY + boardSize + captionGap, canvasWidth - 2 * margin
  );
  textStyle(NORMAL);
}

function drawInfoPanel(boardY, boardSize, revealStep) {
  const infoY = boardY + boardSize + captionGap + captionHeight + infoGap;
  const boxW = canvasWidth - 2 * margin;
  const exponent = revealStep - 1;
  const grains = 1n << BigInt(exponent);
  const total = (1n << BigInt(revealStep)) - 1n;
  const grainWord = grains === 1n ? 'grain' : 'grains';
  const abbreviation = exponent >= 10 ? '  (' + formatGrains(exponent) + ' = ' + formatGrainsUnitName(exponent) + ')' : '';
  const grainValueUsd = Number(grains) * RICE_PRICE_PER_GRAIN_USD;

  // Text sizes scale down on narrow (mobile) canvases, and text() wraps
  // within the box (see the note in drawCaption about x = left edge, not
  // center) so the longest line -- square 64's -- never runs off the canvas.
  textAlign(CENTER, TOP);
  noStroke();
  fill('#1a1a1a');
  textSize(constrain(canvasWidth * 0.021, 11, 15));
  text('Square ' + revealStep + ': ' + grains.toLocaleString() + ' ' + grainWord + abbreviation, margin, infoY, boxW);

  fill('#2e7d32');
  textSize(constrain(canvasWidth * 0.018, 10, 12));
  text('≈ ' + formatDollars(grainValueUsd) + ' worth of rice at today’s prices', margin, infoY + 20, boxW);

  fill('#555555');
  textSize(constrain(canvasWidth * 0.019, 10, 13));
  text('Total grains placed so far: ' + total.toLocaleString(), margin, infoY + 37, boxW);
}
