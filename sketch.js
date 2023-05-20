var img
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  imgteste = loadImage('images/imgteste.jpg')
  //clk = new Clock(new NumberDrawer(), new Pixel(60), 40)
}

function setup() {
  img.init()
}

function draw() {
  
  
  //funcionando para esse caso
  //p = new Polygon(0,[new Pixel(10,10,0,0),new Pixel(10,50,1,0),new Pixel(50,50,1,1),new Pixel(50,10,0,1)])
  p = new Polygon(0,[new Pixel(60,60,0,0),new Pixel(60,10,1,0),new Pixel(10,10,0,0),new Pixel(10,60,0,1)])
  img.scanline_no_texture(p)
  img.draw_figure(p)


  // // Relogio
  // clk.update()
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela

}