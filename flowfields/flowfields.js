// Based on Tyler Hobbs's Flow Fields article
// https://tylerxhobbs.com/essays/2020/flow-fields
function setup() {
    createCanvas(500, 500);
    background(150);
}

function draw() {
    const left_x = width * -0.5;
    const right_x = width * 1.5;
    const top_y = height * -0.5;
    const bottom_y = height * 1.5;

    const resolution = width * 0.03;

    const num_columns = round((right_x - left_x) / resolution);
    const num_rows = round((bottom_y - top_y) / resolution);

    const default_angle = Math.PI * 0.25;

    let grid = new Array(num_columns);
    
    // Set up 2D array
    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(2);
    }
    
    // Create grid with varying angles
    let angle;
    for (var i = 0; i < num_columns; i++) {
        for (let j = 0; j < num_rows; j++) {
            angle = (j / num_rows) * Math.PI;
            grid[i][j] = angle;
        }
    }
    
    // Draw lines at angles in grid
    stroke('black');
    strokeWeight(1);
    for (let i=0; i < num_columns; i++){
        for (let j=0; j < num_rows; j++) {
            let vec1 = createVector(i*resolution, j*resolution);
            let vec2x = vec1.x + Math.cos(grid[i][j])*resolution;
            let vec2y = vec1.y + Math.sin(grid[i][j])*resolution;
            let vec2 = createVector(vec2x, vec2y);
//            circle(vec1.x, vec1.y, 2);
            line(vec1.x, vec1.y, vec2.x, vec2.y);
        }
        
    }
    
    // Draw a curve that approximately follows the angles in the grid
    let x = 200;
    let y = 150;
    const num_steps = 8000;
    const step_length = .05;
    noFill();
    stroke(255, 0, 0);
    strokeWeight(2);
    beginShape();
    console.log(x-left_x);
    
    for (let i=0; i < num_steps; i++) {
        curveVertex(x, y);
        let x_offset = x - left_x;
        let y_offset = y - top_y;

        let column_index = round(x / resolution);
        let row_index = round(y / resolution);
        let grid_angle = grid[column_index][row_index];
        let x_step = step_length * Math.cos(grid_angle);
        let y_step = step_length * Math.sin(grid_angle);
        x = x + x_step;
        y = y + y_step;
    }
    endShape();
}