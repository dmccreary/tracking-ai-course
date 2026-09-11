// Second Half of the Chess Board MicroSim
// The classic "wheat and chessboard" story: one grain of rice on square 1,
// doubling on every square that follows. The dashed line marks the boundary
// between the first half of the board (squares 1-32, still manageable) and
// the second half (squares 33-64, where the totals become astronomical).

// Canvas layout (REQUIRED structure: draw region on top, controls below)
let canvasWidth = 700;
let titleHeight = 55;
let boardGap = 10;
let boardMaxSize = 400;
let captionGap = 10;
let captionHeight = 44; // room for up to 3 wrapped lines on narrow (mobile) widths
let infoGap = 8;
let infoHeight = 46;
let bottomPad = 15;
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
  { exp: 60, symbol: 'Qi' }, // quintillion
  { exp: 50, symbol: 'Qa' }, // quadrillion
  { exp: 40, symbol: 'T' },  // trillion
  { exp: 30, symbol: 'B' },  // billion
  { exp: 20, symbol: 'M' },  // million
  { exp: 10, symbol: 'K' },  // thousand
];

// Squares small enough to draw as individual grains of rice (count -> [rows, cols])
const GRAIN_LAYOUT = { 1: [1, 1], 2: [1, 2], 4: [2, 2], 8: [2, 4], 16: [4, 4], 32: [4, 8] };

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
    textSize(constrain(cellSize * 0.22, 10, 20));
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
  textSize(12);
  textStyle(ITALIC);
  // text()'s width argument makes x the LEFT edge of the wrap box (textAlign
  // only affects alignment of each line within that box), so the box must be
  // positioned explicitly rather than centered on canvasWidth / 2.
  text(
    'Dashed line = halfway point. First half (1-32) stays modest; second half (33-64) is where the real economic impact hits.',
    margin, boardY + boardSize + captionGap, canvasWidth - 2 * margin
  );
  textStyle(NORMAL);
}

function drawInfoPanel(boardY, boardSize, revealStep) {
  const infoY = boardY + boardSize + captionGap + captionHeight + infoGap;
  const exponent = revealStep - 1;
  const grains = 1n << BigInt(exponent);
  const total = (1n << BigInt(revealStep)) - 1n;
  const grainWord = grains === 1n ? 'grain' : 'grains';
  const abbreviation = exponent >= 10 ? '  (' + formatGrains(exponent) + ')' : '';

  textAlign(CENTER, TOP);
  noStroke();
  fill('#1a1a1a');
  textSize(15);
  text('Square ' + revealStep + ': ' + grains.toLocaleString() + ' ' + grainWord + abbreviation, canvasWidth / 2, infoY);

  fill('#555555');
  textSize(14);
  text('Total grains placed so far: ' + total.toLocaleString(), canvasWidth / 2, infoY + 22);
}
