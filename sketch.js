var img, opening
var clk


function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  clk = new Clock(new CharDrawer(155, 10, 10), new Pixel(50), 50)
}

function setup() {
  img.init()
  opening.start()
}

function mousePressed() {
  if (opening.is_running && opening.is_hover_button()) {
    opening.stop()
  }
}

function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  // Relogio
  clk.update()

  setTimeout(() => { img.clear(); }, 1000); //esperar para limpar a tela

}