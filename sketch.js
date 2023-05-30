var img, opening, viewport, window_cg
var clk1, clk2, clk3, clocks
var zoomed_out = true
var update_elements = []
var back_button

function preload() {
  img = new ImageCG(100, 100, 200)
  img.add_image('images/relogio2.png', "clock")
  img.add_image('images/brasil.png',"brasil")
  img.add_image('images/taiwan.png',"taiwan")
  img.add_image('images/ukraine.png',"ukraine")
  img.add_image('images/back.png', "back")

  opening = new Opening(img, new CharDrawer())
}

function setup() {
  img.init();
  img.load_all_images()

  back_button = new Button(new Pixel(1, 80), new Pixel(20), "back", img)
  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(50))

  clk1 = new Clock(new Pixel(20, 30), 15, img, 0, img.images.clock, -3,img.images.brasil)
  clk2 = new Clock(new Pixel(80, 30), 15, img, 0, img.images.clock, 8,img.images.taiwan)
  clk3 = new Clock(new Pixel(50, 70), 15, img, 0, img.images.clock, +3,img.images.ukraine)
  clocks = [clk1, clk2, clk3]
  update_elements = [...clocks]

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
        update_elements = [clock]
        break
      }
    }

    for (const clock of clocks) {
      clock.map_elements(viewport, window_cg)
    }
    img.clear()
    back_button.draw()
    update_elements.push(back_button)
  }
}


function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  for (const clock of update_elements) {
    clock.update()
  }
}