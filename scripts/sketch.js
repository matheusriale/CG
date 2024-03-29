var screen, opening, viewport, window_cg, back_button, clocks
var zoomed_out = true
var update_elements = []
var transformed_clocks = []

function map_clocks(clocks) {
  let new_clocks = []
  for (const clock of clocks) {
    new_clocks.push(Clock.map_clock(clock, viewport, window_cg))
  }
  return new_clocks
}

function create_clocks(screen) {
  const clk1 = new Clock(new Pixel(20, 30), 15, screen, 0, screen.images.clock, 0, screen.images.brasil)
  const clk2 = new Clock(new Pixel(80, 30), 15, screen, 0, screen.images.clock, 13, screen.images.taiwan)
  const clk3 = new Clock(new Pixel(50, 70), 15, screen, 0, screen.images.clock, 6, screen.images.ukraine)
  return [clk1, clk2, clk3]
}

function zoom_in(idx) {
  window_cg = new WindowCG(clocks[idx].top.sub(new Pixel(10)), clocks[idx].bottom.add(new Pixel(10)))
  transformed_clocks = map_clocks(clocks)
  const clock = transformed_clocks[idx]
  cursor(ARROW)
  zoomed_out = false
  clock.zoomed_in = true
  update_elements = [clock]
}

function zoom_out() {
  window_cg = new WindowCG(new Pixel(0), new Pixel(screen.width, screen.height))
  zoomed_out = true
  update_elements[0].zoomed_in = false
  transformed_clocks = map_clocks(clocks)
  update_elements = [...transformed_clocks]
  screen.clear()
}

// ------- P5 -- --------

function preload() {
  screen = new Screen(100, 100, 200)

  // carregar imagens para os relógios
  let images = ["clock", "brasil", "taiwan", "ukraine", "back"]
  screen.add_images(images.map(i => [`images/${i}.png`, i]))

  opening = new Opening(screen, new CharDrawer())
}

function setup() {
  screen.init();
  screen.load_all_images()

  back_button = new Button(new Pixel(1, 80), new Pixel(20), "back", screen)
  viewport = new Viewport(width, height)
  window_cg = new WindowCG(new Pixel(0), new Pixel(width, height))

  clocks = create_clocks(screen)
  transformed_clocks = map_clocks(clocks)
  update_elements = [...transformed_clocks]

  opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) { opening.stop() } //checa se clicou no botão "play" e prossegue no programa

  else if (zoomed_out && !opening.is_running) { // checa se clicou em um relógio e dá zoom
    for (let c = 0; c < clocks.length; c++) {
      if (clocks[c].is_hover()) {
        zoom_in(c)
        screen.clear()
        back_button.draw()
        update_elements.push(back_button)
        break
      }
    }
  }

  else if (!zoomed_out && back_button.is_hover()) { zoom_out() } //checa se clicou no botão de voltar e tira o zoom
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