var img, opening, viewport, window
var clk1, clk2, clk3, clocks
var zoomed_out = true

function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  clk1 = new Clock(new CharDrawer(155, 3, 10), new Pixel(20), 15, img)
  clk2 = new Clock(new CharDrawer(155, 3, 10), new Pixel(50, 70), 15, img)
  clk3 = new Clock(new CharDrawer(155, 3, 10), new Pixel(80, 20), 15, img)
  clocks = [clk1, clk2, clk3]
  viewport = new Viewport(width, height)
  win = new WindowCG(new Pixel(0), new Pixel(99))
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
      zoomed_out = false
    }
  }
}

function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const clock of clocks) {
    clock.update()
  }
}