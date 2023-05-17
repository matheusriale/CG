var img
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  imgteste = loadImage('images/imgteste.jpg')
  //clk = new Clock(new NumberDrawer(), new Pixel(50), 40)
}

function setup() {
  img.init()
}

function draw() {
  //image(imgteste,0,0);
  p = new Polygon(0,[new Pixel(50,50,0,0),new Pixel(10,50,1,0),new Pixel(10,10,1,1),new Pixel(50,10,0,1)])
  img.scanline_tex(p,imgteste)
  img.draw_figure(p)


  // // Relogio
  // clk.update()
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela

}