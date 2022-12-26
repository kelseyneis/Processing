float col1 = random(1);
float col2 = random(1);
float col3 = random(1);
float col4 = random(1);
GIF myGif;
int i = 0;
void setup() {
  size(800, 800);
  myGif = new GIF(this, "second_sketch.gif");
  frameRate(30);
}
 
void draw() {
  float r = 255 * noise(col1);
  float g = 255 * noise(col2);
  float b = 255 * noise(col3);
  background(r, g, b);
  stroke(255 - r, 255 - g, 255 - b);
  strokeWeight(5);
  // noise() returns a number between 0 and 1
  // when we multiply noise() by width, we get a number between 0 and width
  float x = noise(col1) * width;
  // draw a vertical line
  line(x, 0, x + randomGaussian() * 100, height);
  
  float x2 = noise(col4) * width;
  // draw a vertical line
  line(x2, 0, x2 + randomGaussian() * 100, height);
  
  // we add 40 to my_num to avoid getting the exact same random number
  // we got on our previous call to the noise() function
  float y = noise(col2 + 80) * height;  
  // draw a horizontal line
  line(0, y, width, y + randomGaussian() * 100);

  float y2 = noise(col3 + 80) * height;  
  // draw a horizontal line
  line(0, y2, width, y2 + randomGaussian() * 100);
  col1 = col1 + 0.02;
  col2 = col2 + 0.02;
  col3 = col3 + 0.02;
  col4 = col4 + 0.02;
  
  if (i >= 150) {
    /* Add a 2 second delay for the last frame */
    myGif.addFrame(2000);
    myGif.save();
    noLoop();
  } else {
    /* Add a framerate-proportional delay for other frames */
    myGif.addFrame(1000/30);
  }
  i = i + 1;
}
 
