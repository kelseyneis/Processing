// Tutorial by Danial Simu: https://www.youtube.com/watch?v=wghDDYnIFM0
void setup() {
  size(1920, 1080);
  background(0);
  blendMode(ADD);
  
  for(int i=1; i < 25; i++) {
    for (int j=1; j < 12; j++) {
      float squareSize = random(50);
      int posX = i*80;
      int posY = j*80;
      float dist = random(10);
      float col = random(255);
      float secondCol = random(100);
      //fill(col, secondCol, 0);
      PImage img = createImage(round(squareSize), round(squareSize), ALPHA);
      img.loadPixels();
      for (int p = 0; p < img.pixels.length; p++) {
        img.pixels[p] = color(col, secondCol, 0, (p % img.width)*10); 
      }
      img.updatePixels();
      image(img, posX, posY);
      //rect(posX, posY, squareSize, squareSize);
      //fill(0, col, secondCol);
      PImage img2 = createImage(round(squareSize), round(squareSize), ALPHA);
      img2.loadPixels();
      for (int q = 0; q < img2.pixels.length; q++) {
        img2.pixels[q] = color(0, col, secondCol, (q % img2.width)*10); 
      }
      img2.updatePixels();
      image(img2, posX + dist, posY + dist);
      //rect(posX + dist, posY + dist, squareSize, squareSize);
      //fill(secondCol, 0, col);
      PImage img3 = createImage(round(squareSize), round(squareSize), ARGB);
      img3.loadPixels();
      for (int r = 0; r < img3.pixels.length; r++) {
        img3.pixels[r] = color(secondCol, 0, col, (r % img3.width)*10); 
      }
      img3.updatePixels();
      image(img3, posX + dist*2, posY + dist*2);
      //rect(posX + dist*2, posY + dist*2, squareSize, squareSize);
      if(j%2 == 0){
        filter(DILATE);
      }
  }
  }
  save("first_sketch.jpg");
}

void draw() {

}
