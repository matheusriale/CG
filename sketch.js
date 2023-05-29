var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var clocks_draw = []

function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  clk1 = new Clock(new CharDrawer(155, 3, 10), new Pixel(20), 15, img)
  clk2 = new Clock(new CharDrawer(155, 3, 10), new Pixel(50, 70), 15, img)
  clk3 = new Clock(new CharDrawer(155, 3, 10), new Pixel(80, 20), 15, img)
  clocks = [clk1, clk2, clk3]
  clocks_draw = [...clocks]
  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(99))
}

function setup() {
  img.init()
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