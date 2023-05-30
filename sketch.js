var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var clocks_draw = []

function preload() {
  img = new ImageCG(120, 120, 200)
  imgteste = loadImage('images/relogio2.png')

  opening = new Opening(img, new CharDrawer())
}

function setup() {
  img.init();
  imgteste.loadPixels()
  let p = Polygon.square(new Pixel(50), 48)
  console.log(imgteste.pixels)
  img.scanline_tex(p, imgteste.pixels)
  img.draw_figure(p, 50)

  // viewport = new Viewport(width, height)
  // window_cg = new WindowCG(new Pixel(0), new Pixel(50))

  // clk1 = new Clock(new CharDrawer(155, 3, 10), new Pixel(40, 30), 25, img, 0, image_matrix)
  // clk2 = new Clock(new CharDrawer(155, 3, 10), new Pixel(50, 75), 25, img, 0, image_matrix)
  // clk3 = new Clock(new CharDrawer(155, 3, 10), new Pixel(75, 25), 25, img, 0, image_matrix)
  // clk1.update()
  // clocks = [clk1]
  // clocks_draw = [...clocks]

  //opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) {
    opening.stop()
    return
  }

  if (zoomed_out && !opening.is_running) {
    for (const clock of clocks) {
      if (clock.is_hover()) {
        zoomed_out = false
        clock.zoomed_in = true
        window_cg = new WindowCG(clock.top.sub(new Pixel(10)), clock.bottom.add(new Pixel(10)))
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
  return
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const clock of clocks_draw) {
    clock.update()
  }
}

//Funcao para pegar a matriz de pixeis da imagem:
function image_pixels(imgteste, w, h) {
  image(imgteste, 0, 0);
  loadPixels()
  image_matrix = []
  matrix_line = []

  for (var y = 0; y < w; y++) {
    for (var x = 0; x < h; x++) {
      var index = (x + y * width) * 4;
      if (pixels[index] == 255 && pixels[index + 1] == 255 && pixels[index + 2] == 255) {
        pixels[index + 3] = 0;
      }
      matrix_line.push(...pixels.slice(index, index + 4))
    }
    image_matrix.push(matrix_line)
    matrix_line = []
  }
  img.clear();
  console.log(image_matrix)
  return image_matrix;
}