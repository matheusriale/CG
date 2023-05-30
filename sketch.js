var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var clocks_draw = []

function preload() {
  img = new ImageCG(100, 100, 200)
  imgteste = loadImage('images/relogio2.png')

  opening = new Opening(img, new CharDrawer())
}

function setup() {
  img.init();
  imgteste.loadPixels()

  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(50))

  clk1 = new Clock(new CharDrawer(155, 3, 10), new Pixel(20, 30), 15, img, 0, imgteste)
  clk2 = new Clock(new CharDrawer(155, 3, 10), new Pixel(80, 30), 15, img, 0, imgteste)
  clk3 = new Clock(new CharDrawer(155, 3, 10), new Pixel(50, 70), 15, img, 0, imgteste)
  clocks = [clk1, clk2, clk3]
  clocks_draw = [...clocks]

  opening.start()
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
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const clock of clocks_draw) {
    clock.update()
  }
}