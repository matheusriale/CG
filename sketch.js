var img, opening
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  // imgteste = loadImage('images/imgteste.jpg')
}

function setup() {
  img.init()
  opening.start()
}

function mousePressed() {
  if (opening.is_runing) {
    opening.stop()
    clk = new Clock(new CharDrawer(), new Pixel(50), 40)
  }
}

function draw() {
  if (opening.is_runing) return

  // Relogio
  clk.update()
  clk.get_hands().forEach(h => {
    img.draw_figure(h)
  })

  setTimeout(() => { img.clear(); }, 1000); //esperar para limpar a tela

}