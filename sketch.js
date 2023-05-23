var img, opening
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  // opening = new Opening()
  imgteste = loadImage('images/imgteste.jpg')
  //clk = new Clock(new NumberDrawer(), new Pixel(60), 40)
}

function setup() {
  img.init()
  // let circum = new Circumference(100, new Pixel(50), 25, 5)
  // img.draw_figure(circum)
  img.ellipse(new Pixel(50, 40), 10, 40)
  img.floodFill(new Pixel(50, 40), 100, 200)
  // img.circumference(new Pixel(40, 50), 20)
}

function draw() {
  // // Relogio
  // clk.update()
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela

}