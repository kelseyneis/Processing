// CodingTrain tutorial: https://www.youtube.com/watch?v=akM4wMZIBWg
import peasy.*;
PeasyCam cam;
PVector[][] globe;
int total  = 200;
float a = 1;
float b = 1;
float m1 = 0;
float m2 = 10;
float mchange = 0;
int offset = 0;

float supershape(float theta, float m, float n1, float n2, float n3) {
  float t1 = abs((1/a)*cos(m * theta / 4));
  t1 = pow(t1, n2);
  float t2 = abs((1/b)*sin(m * theta / 4));
  t2 = pow(t2, n3);
  float r = pow(t1 + t2, -1/n1);
  return r;
}

GIF myGif;
int gifTime = 0;

void setup() {
  size(800, 800, P3D);
  cam = new PeasyCam(this, 500);
  cam.rotateY(45);
  globe = new PVector[total+1][total+1];
  colorMode(HSB);
  myGif = new GIF(this, "super_shape.gif");
  frameRate(30);
}

void draw() {
  
  //m = map(mouseX, 0, width, 0, 7);
  m1 = map(sin(mchange), -1, 1, 0, 5.7);
  //m2 = map(sin(mchange), -1, 1, 0, 10);
  mchange += .05;
  
  background(0);
  lights();
  noStroke();
  
  float r = 200;
  for( int i = 0; i < total+1; i++) {
    float lat = map(i, 0, total, -HALF_PI, HALF_PI);
    float r2 = supershape(lat, m2, 3, .2, 1);
    //float r2 = supershape(lat, 2, 10, 10, 10);
    for( int j = 0; j < total+1; j++) {
        float lon = map(j, 0, total, -PI, PI);
        float r1 = supershape(lon, m1, .5, 1, 2.5);
        //float r1 = supershape(lon, 8, 60, 100, 30);
        float x = r * r1 * cos(lon) * r2 * cos(lat);
        float y = r * r1 * sin(lon) * r2 * cos(lat);
        float z = r * r2 * sin(lat);
        globe[i][j] = new PVector(x, y, z);
        //PVector v = PVector.random3D();
        //v.mult(random(10));
        //globe[i][j].add(v);
    }
  }
   offset += 5;
   for( int i = 0; i < total; i++) {
     //float hu = map(i, 0, total, 0, 255*6);
     //fill((hu + offset) % 255, 255, 255);
     beginShape(TRIANGLE_STRIP);
    for( int j = 0; j < total+1; j++) {
      float hu = map(j, 0, total, 0, 255*6);
      fill((hu + offset) % 255, 255, 255);
      PVector v1 = globe[i][j];
      vertex(v1.x, v1.y, v1.z);
      PVector v2 = globe[i+1][j];
      vertex(v2.x, v2.y, v2.z);
    }
    endShape();
   }
  
  if (gifTime >= 150) {
    /* Add a 2 second delay for the last frame */
    myGif.addFrame(2000);
    myGif.save();
    noLoop();
  } else {
    /* Add a framerate-proportional delay for other frames */
    myGif.addFrame(1000/30);
  }
  gifTime = gifTime + 1;
}
 
