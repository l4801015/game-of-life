// add to body margin 0
document.body.style.margin = 0;

// Language: javascript
// Cellular Automata
// Game of Life

let grid, 
    cols, 
    rows, 
    width, 
    height, 
    resolution,
    ctx;

// create canvas
// append canvas to body
// return context
const createCanvas = (width, height) => {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  document.body.appendChild(canvas);
  return canvas.getContext('2d');
};

// make 2d array
const make2dArray = (cols, rows) => {
  const arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
};

// create setup function
const setup = () => {
  // set cols and rows
  cols = width / resolution
  rows = height / resolution
  // create grid
  grid = make2dArray(cols, rows);
  // set grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = Math.floor(Math.random() * 2);
    }
  }
};

// count neighbors
const countNeighbors = (grid, x, y) => {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      const col = (x + i + cols) % cols;
      const row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
};

// create draw function
const draw = () => {
  // clear canvas
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);
  // set grid
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] === 1) {
        ctx.fillStyle = '#fff';
        ctx.fillRect(x, y, resolution, resolution);
      }
    }
  }
  // set next generation
  let next = make2dArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let neighbors = countNeighbors(grid, i, j);
      if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else if (grid[i][j] === 0 && neighbors === 3) {
        next[i][j] = 1;
      } else {
        next[i][j] = grid[i][j];
      }
    }
  }
  grid = next;
  // call draw again
  requestAnimationFrame(draw);
};

let m = 2;

width = window.innerWidth - m;
height = window.innerHeight - m;
resolution = 4;
ctx = createCanvas(width, height);
setup();
requestAnimationFrame(draw);
