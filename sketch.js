var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var clocks_draw = []

function preload() {
  img = new ImageCG(100, 100, 200)
  img.add_image('images/relogio2.png', "clock")
  img.add_image('images/brasil.png', "brasil")
  img.add_image('images/japao.png', "japao")
  img.add_image('images/france.png', "france")
  img.add_image('images/back.png', "back")

  opening = new Opening(img, new CharDrawer())
}

function setup() {
  img.init();
  img.load_all_images()

  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(50))

  clk1 = new Clock(new Pixel(20, 30), 15, img, 0, img.images.clock, -3)
  clk2 = new Clock(new Pixel(80, 30), 15, img, 0, img.images.clock, -2)
  clk3 = new Clock(new Pixel(50, 70), 15, img, 0, img.images.clock, 0)
  clocks = [clk1, clk2, clk3]
  clocks_draw = [...clocks]
  // p = Polygon.square(new Pixel(40,15),10)
  // img.scanline_tex(p,img.images.brasil)

  // opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) {
    opening.stop()
    return
  }

  if (zoomed_out && !opening.is_running) {
    for (const clock of clocks) {
      if (clock.is_hover()) {
        cursor(ARROW)
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
    img.draw_image("back", new Pixel(1, 80), new Pixel(20))
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