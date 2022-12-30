const canvasWidth = 500;
const canvasHeight = 500;



function setup() {
    createCanvas(500, 500);
    background(150);
}

function draw() {
    const left_x = canvasWidth * -0.5;
    const right_x = canvasWidth * 1.5;
    const top_y = canvasHeight * -0.5;
    const bottom_y = canvasHeight * 1.5;

    const resolution = canvasWidth * 0.05;

    const num_columns = (right_x - left_x) / resolution;
    const num_rows = (bottom_y - top_y) / resolution;

    const default_angle = Math.PI * 0.25;

    let grid = new Array(num_columns);

    for (let i = 0; i < grid.length; i++) {
        grid[i] = new Array(2);
    }
    let angle;
    for (var i = 0; i < num_columns; i++) {
        for (let j = 0; j < num_rows; j++) {
            angle = (j / num_rows) * Math.PI;
            grid[i][j] = angle;
        }
    }

    fill('black');
    for (let i=0; i < num_columns; i++){
        for (let j=0; j < num_rows; j++) {
            let vec1 = createVector(i*resolution, j*resolution);
            let vec2x = vec1.x + Math.cos(grid[i][j])*resolution;
            let vec2y = vec1.y + Math.sin(grid[i][j])*resolution;
            circle(vec1.x, vec1.y, 2);
            line(vec1.x, vec1.y, vec2x, vec2y);
        }
        
    }
}