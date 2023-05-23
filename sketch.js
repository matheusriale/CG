var img, opening
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  imgteste = loadImage('images/imgteste.jpg')
  //clk = new Clock(new CharDrawer(), new Pixel(60), 40)
}

function setup() {
  img.init()
  opening.start()
}

function draw() {
  // // Relogio
  // clk.update()
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela

}