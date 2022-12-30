// Based on Tyler Hobbs's Flow Fields article
// https://tylerxhobbs.com/essays/2020/flow-fields
function setup() {
    createCanvas(500, 500);
    background(255);
}

let iter = 0;
const noiseScale = .01;
const num_steps = 1000; // controls how long the lines are
const step_length = .05; // controls how smooth the lines are
const num_iter = 10000; // controls how many lines
const show_angles = false;
const randomX = true; // if false, always start line at x = 0
const randomY = true; // if false, always start line at y = 0
const xfactor = 250; // number to multiply the randomGaussian x by
const yfactor = 200; // number to multiply the randomGaussian y by
const lineAlpha = 30;
const lineWeight = 2;
const redFactor = 255;
const greenFactor = 255;
const blueFactor = 0;

function drawCurve(grid, resolution, x, y) {
    noFill();
    const noiseValRed = noise(x*noiseScale, y*noiseScale);
    const noiseValGreen = noise((x+50)*noiseScale, (y+50)*noiseScale);
    const noiseValBlue = noise((x+100)*noiseScale, (y+100)*noiseScale);

    stroke(noiseValRed*redFactor, noiseValGreen*greenFactor, noiseValBlue*blueFactor, lineAlpha);
    strokeWeight(lineWeight);
    beginShape();

    for (let i=0; i < num_steps; i++) {
        curveVertex(x, y);

        let column_index = round(x / resolution);
        let row_index = round(y / resolution);
        if (column_index > grid.length || row_index > grid.length
           || column_index < 0 || row_index < 0){
            break;
        }
        let grid_angle = grid[column_index][row_index];
        let x_step = step_length * Math.cos(grid_angle);
        let y_step = step_length * Math.sin(grid_angle);
        x = x + x_step;
        y = y + y_step;
    }
    endShape();
}
function draw() {
    if(iter > num_iter) {
        console.log("Finished drawing.");
        noLoop();
    }
    const left_x = width * -0.5;
    const right_x = width * 1.5;
    const top_y = height * -0.5;
    const bottom_y = height * 1.5;

    const resolution = width * 0.03;

    const num_columns = round((right_x - left_x) / resolution);
    const num_rows = round((bottom_y - top_y) / resolution);


    let grid = new Array(num_columns);
    // Set up 2D array
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(2);
    }

    // Create grid with varying angles
    let angle;
    for (var i = 0; i < num_columns; i++) {
        for (let j = 0; j < num_rows; j++) {
            let dir = i < (num_columns / 2) ? 2 : 1;
            angle = (i / num_columns) * Math.PI * dir;
            grid[i][j] = angle;
        }
    }

    // Draw lines at angles in grid
    if (show_angles) {
        stroke(50, 5);
        strokeWeight(.5);
        for (let i=0; i < num_columns; i++){
            for (let j=0; j < num_rows; j++) {
                let vec1 = createVector(i*resolution, j*resolution);
                let vec2x = vec1.x + Math.cos(grid[i][j])*resolution;
                let vec2y = vec1.y + Math.sin(grid[i][j])*resolution;
                let vec2 = createVector(vec2x, vec2y);
                line(vec1.x, vec1.y, vec2.x, vec2.y);
            }

        }
    }

    // Draw a curve that approximately follows the angles in the grid
    let x = randomX ? Math.abs(randomGaussian()) * xfactor : 0;
    let y = randomY ? Math.abs(randomGaussian()) * yfactor : 50;

    
    drawCurve(grid, resolution, x, y)
    
//    y = height - Math.abs(randomGaussian())*150;
//    drawCurve(grid, resolution, x, y);
    iter++;
}