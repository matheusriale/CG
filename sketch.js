var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var clocks_draw = []

function preload() {
  img = new ImageCG(100, 100, 200)
  imgteste = loadImage('images/relogio.png')

  opening = new Opening(img, new CharDrawer())
  clk1 = new Clock(new CharDrawer(155, 3, 10), new Pixel(20), 15, img)
  clk2 = new Clock(new CharDrawer(155, 3, 10), new Pixel(50, 70), 15, img)
  clk3 = new Clock(new CharDrawer(155, 3, 10), new Pixel(80, 20), 15, img)
  clocks = [clk1, clk2, clk3]
  clocks_draw = [...clocks]
}

function setup() {
  img.init();
  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(10), new Pixel(99))
  p = new Polygon(0, [pix1 = new Pixel(10, 10, 0, 0), pix2 = new Pixel(10, 60, 0, 1), pix3 = new Pixel(60, 60, 1, 1), pix4 = new Pixel(60, 10, 1, 0)])
  image_matrix = image_pixels(p, imgteste);
  opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) {
    opening.stop()
  }

  if (zoomed_out) {
    for (const clock of clocks) {
      if (clock.is_hover()) {
        zoomed_out = false
        clock.zoomed_in = true
        window_cg = new WindowCG(clock.top, clock.bottom)
        clocks_draw = [clock]
        break
      }
    }

    for (const clock of clocks) {
      clock.map_elements(viewport, window_cg)
    }
    img.clear()
  }
}


function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const clock of clocks_draw) {
    clock.update()
  }
}

//Funcao para pegar a matriz de pixeis da imagem:
function image_pixels(p, imgteste) {
  image(imgteste, 0, 0);
  loadPixels()
  image_matrix = []
  matrix_line = []
  for (var y = 0; y < 50; y++) {//imagem 50x50
    for (var x = 0; x < 50; x++) {
      var index = (x + y * width) * 4;
      if (pixels[index] == 255 && pixels[index + 1] == 255 && pixels[index + 2] == 255) {
        pixels[index + 3] = 0;
      }
      matrix_line.push(pixels[index], pixels[index + 1], pixels[index + 2], pixels[index + 3])
    }
    image_matrix.push(matrix_line)
    matrix_line = []
  }
  img.clear();
  img.scanline_tex(p, image_matrix);
  return image_matrix;
}