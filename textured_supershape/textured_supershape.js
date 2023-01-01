let globe;
const total  = 200;
let a = 1;
let b = 1;
let m1 = 0;
let m2 = 0;
let mchange = 0;
let offset = 0;
let angle = 45;
var loopFrame = 90;

let canvas;
function supershape(theta, m, n1, n2, n3) {
    let t1 = Math.abs((1/a) * Math.cos(m * theta / 4));
    t1 = Math.pow(t1, n2);
    let t2 = Math.abs((1/b) * Math.sin(m * theta / 4));
    t2 = Math.pow(t2, n3);
    return Math.pow(t1 + t2, -1/n1);
}

function setup() {
    canvasToRecord = createCanvas(900, 900, WEBGL);
    canvas = canvasToRecord.canvas;
    colorMode(HSB);
    capturer.start();

}

function draw() {
    capturer.capture(canvas);
    m1 = map(Math.sin(mchange), -1, 1, 0, 5.7);
    mchange += .05;
    camera(0, 0, (height/2) / tan(PI/6), 0, 0, 0, 0, 1, 0);
    scale(1.5);
    background(0);
    ambientLight(255);
    ortho();
    rotateX(angle);
    rotateY(angle * 0.3);
    rotateZ(angle * 1.2);


    const r = 200;

    let globe = new Array(total+1);
    for (let i = 0; i < total+1; i++) {
        globe[i] = new Array(2);
    }
    
    const default_angle = PI
    for (let i = 0; i < total+1; i++) {

        let lat = map(i, 0, total, -HALF_PI, HALF_PI);
        let r2 = supershape(lat, m2, 3, .2, 1);

        for( let j = 0; j < total+1; j++) {
            let lon = map(j, 0, total, -PI, PI);
            let r1 = supershape(lon, m1, .5, 1, 2.5);
            let x = r * r1 * Math.cos(lon) * r2 * Math.cos(lat);
            let y = r * r1 * Math.sin(lon) * r2 * Math.cos(lat);
            let z = r * r2 * Math.sin(lat);
            globe[i][j] = createVector(x, y, z, default_angle);
        }
    }

    offset += 5;
    for( let i = 0; i < total; i++) {
     beginShape(LINES);
    for( let j = 0; j < total+1; j++) {
      let hu = map(j, 0, total, 0, 255*6);
      fill((hu + offset) % 255, 255, 255);
        let v1 = globe[i][j];
        let vec2x = v1.x + Math.cos(globe[i][j]);
        let vec2y = v1.y + Math.sin(globe[i][j]);
        let vec2z = v1.z + Math.sin(globe[i][j]);
        let v2 = createVector(vec2x, vec2y, vec2z);
        vertex(v1.x, v1.y, v1.z);
        vertex(v2.x, v2.y, v2.z);
    }
//        rotateX(angle);
//        rotateY(angle * 0.3);
//        rotateZ(angle * 1.2); // results in chaotic tangle
    endShape();
    }

    ambientMaterial(100);
    angle = angle + .05;
    if (frameCount < loopFrame) {
      capturer.capture(canvas);
    } else if (frameCount === loopFrame) {
      capturer.stop();
      capturer.save();
    }
}
 
