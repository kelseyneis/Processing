//credit: http://blog.mattperkins.me/
const chaikinSmooth = (points, itr = 1) => {
  const smoothFn = (input, output = []) => {
    const copy = (out, a) => {
      out[0] = a[0];
      out[1] = a[1];
      return out;
    };  

    if (input.length > 0) output.push(copy([0, 0], input[0]));

    for (let i = 0; i< input.length - 1; i++) {
      const p0 = input[i];
      const p1 = input[i + 1];
      const p0x = p0[0];
      const p0y = p0[1];
      const p1x = p1[0];
      const p1y = p1[1];

      const Q = [0.75 * p0x + 0.25*p1x, 0.75*p0y+0.25*p1y];

      const R = [0.25 * p0x + 0.75*p1x, 0.25*p0y+0.75*p1y];
      output.push(Q);
      output.push(R);
    }
    if (input.length > 1) output.push(copy([0, 0], input[input.length - 1]));
    return output;
  }
  if (itr === 0) return points;
  const smoothed = smoothFn(points);
  return itr === 1 ? smoothed : chaikinSmooth(smoothed, itr - 1);
}

const drawPoints = (pointsArray, pColor = 'red', lColor = 'blue') => {
  const c = color(random(255), random(255), random(255))
  pointsArray.forEach((point, idx) => {

    noStroke();
    // fill(pColor);
    noFill();
    circle(point[0], point[1], 10);

    const next = idx < pointsArray.length - 1 ? pointsArray[idx + 1] : null;
    if (next) {
      const px1 = point[0];
      const py1 = point[1];
      const px2 = next[0];
      const py2 = next[1];
      
      
      stroke(c);
      line(px1, py1, px2, py2)
    }
  })
}

const insertPoints = (x1, x2, y1, y2, pointsToInsert) => {
  const points = [];
  const xIncrement = (x2 - x1) / pointsToInsert;
  const yIncrement = (y2 - y1) / pointsToInsert;
  let currentX = x1;
  let currentY = y1;
  const minOffset = 25;
  const maxOffset = 50;
  
  for(let i=0; i <= pointsToInsert; i++) {
    if(i > 0 && i < pointsToInsert) {
      const rRadius = random(minOffset, maxOffset);
      
      const rRadians = random(0, Math.PI*2);
      const offsetX = currentX + rRadius* Math.cos(rRadians);
      const offsetY = currentY + rRadius*Math.sin(rRadians);
      points.push([offsetX, offsetY]);
    }
    points.push([currentX, currentY]);
    currentX += xIncrement;
    currentY += yIncrement;
  }
  return chaikinSmooth(points, 4);
}

function setup() {
  createCanvas(800, 400);
  background(255);
  
  const cw = width;
  const ch = height;
  const m = 40;

  let x1 = m;
  let x2 = cw - m;
  let y1 = ch / 3 - 50;
  let y2 = ch / 3 - 50;



  const pointsToInsert = 20;
  const numLines = 10;
  let smoothPoints;
  for(i = 0; i < numLines; i++){
    smoothPoints = insertPoints(x1, x2, y1, y2, pointsToInsert);
    drawPoints(smoothPoints, 'green', 'green');
    y1 += (2/3)*ch / numLines;
    y2 += (2/3)*ch / numLines;
  }

  
}

function draw() {
  
}