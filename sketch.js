var img
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  clk = new Clock(new NumberDrawer(), new Pixel(50), 40)
}

function setup() {
  img.init()
}

function draw() {

  clk.update()
  clk.get_hands().forEach(h => {
    img.draw_figure(h)
  })

  setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela
}