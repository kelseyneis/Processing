// modified code from CodingTrain to use HSB color mode in order to create rainbow effect
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/6z7GQewK-Ks

/**
 * https://axonflux.com/handy-rgb-to-hsl-and-rgb-to-hsv-color-model-c
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
function hslToRgb(h, s, l){
    var r, g, b;

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [r * 255, g * 255, b * 255];
}

var minSlider;
var maxSlider;

var frDiv;

function setup() {
    createCanvas(500, 500);
    pixelDensity(1);
    colorMode(HSB, 360, 100, 100);
    minSlider = createSlider(-2.5, 0, -2.5, 0.01);
    maxSlider = createSlider(0, 2.5, 2.5, 0.01);
}

function draw() {
    var maxiterations = 100;

    var i = 0;
    loadPixels();
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var a = map(x, 0, width, minSlider.value(), maxSlider.value());
            var b = map(y, 0, height, minSlider.value(), maxSlider.value());

            var ca = a;
            var cb = b;

            var n = 0;

            while (n < maxiterations) {
                var aa = a * a - b * b;
                var bb = 2 * a * b;
                a = aa + ca;
                b = bb + cb;
                if (a * a + b * b > 16) {
                    break;
                }
                n++;
            }

            var bright = map(n, 0, maxiterations, 0, 1);
            bright = sqrt(bright);
            if (n == maxiterations) {
            bright = 0;
            }
            var rgb = hslToRgb(bright, 0.5, 0.5);

            var pix = (x + y * width) * 4;
            pixels[pix + 0] = rgb[0];
            pixels[pix + 1] = rgb[1];
            pixels[pix + 2] = rgb[2];
            pixels[pix + 3] = 255;
        }
    }
    updatePixels();
}