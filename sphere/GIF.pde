//credit: https://sighack.com/post/make-animated-gifs-in-processing

import gifAnimation.*;

class GIF {
  GifMaker gif;
  GIF(PApplet app, String filename) {
    gif = new GifMaker(app, filename, 100);
    gif.setRepeat(0); // 0 means endless loop
  }

  void addFrame(int delay_in_frames) {
    gif.setDelay(delay_in_frames);
    gif.addFrame();
  }

  void save() {
    gif.finish();
  }
};
