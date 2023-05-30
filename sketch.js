var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var update_elements = []
var back_button

function map_clocks(clocks) {
  let new_clocks = []
  for (const clock of clocks) {
    new_clocks.push(Clock.map_clock(clock, viewport, window_cg))
  }
  return new_clocks
}

function preload() {
  img = new ImageCG(100, 100, 200)
  img.add_image('images/relogio2.png', "clock")
  img.add_image('images/brasil.png', "brasil")
  img.add_image('images/taiwan.png', "taiwan")
  img.add_image('images/ukraine.png', "ukraine")
  img.add_image('images/back.png', "back")

  opening = new Opening(img, new CharDrawer())
}

function setup() {
  img.init();
  img.load_all_images()

  back_button = new Button(new Pixel(1, 80), new Pixel(20), "back", img)
  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(width, height))

  clk1 = new Clock(new Pixel(20, 30), 15, img, 0, img.images.clock, -3, img.images.brasil)
  clk2 = new Clock(new Pixel(80, 30), 15, img, 0, img.images.clock, 8, img.images.taiwan)
  clk3 = new Clock(new Pixel(50, 70), 15, img, 0, img.images.clock, +3, img.images.ukraine)
  clocks = [clk1, clk2, clk3]
  transformed_clocks = map_clocks(clocks)
  update_elements = [...transformed_clocks]

  // opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) {
    opening.stop()
    return
  }

  if (zoomed_out && !opening.is_running) {

    for (let c = 0; c < clocks.length; c++) {
      if (clocks[c].is_hover()) {
        window_cg = new WindowCG(clocks[c].top.sub(new Pixel(10)), clocks[c].bottom.add(new Pixel(10)))
        transformed_clocks = map_clocks(clocks)
        const clock = transformed_clocks[c]
        cursor(ARROW)
        zoomed_out = false
        clock.zoomed_in = true
        update_elements = [clock]
        break
      }
    }

    img.clear()
    back_button.draw()
    update_elements.push(back_button)
    return
  }

  if (!zoomed_out && back_button.is_hover()) {
    window_cg = new WindowCG(new Pixel(0), new Pixel(img.width, img.height))
    zoomed_out = true
    update_elements[0].zoomed_in = false
    transformed_clocks = map_clocks(clocks)
    update_elements = [...transformed_clocks]
    img.clear()
    return

  }
}


function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const element of update_elements) {
    element.update()
  }
}