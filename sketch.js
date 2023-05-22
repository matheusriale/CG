var img
var clk

function preload() {
  img = new ImageCG(100, 100, 200)
  imgteste = loadImage('images/imgteste.jpg')
  //clk = new Clock(new NumberDrawer(), new Pixel(60), 40)
}

function setup() {
  img.init()
  
  p = new Polygon(0,[pix1 = new Pixel(10,10,0,0),pix2 = new Pixel(10,10,1,0),pix3 = new Pixel(60,10,0,0),pix4 = new Pixel(60,60,0,0),pix5 = new Pixel(70,45,0,0),pix6 = new Pixel(70,5,1,0),pix7 = new Pixel(25,5,0,0)])
  img.set_pixel_color(pix1,255,0,0,clg=true);
  img.set_pixel_color(pix2,0,255,0,clg=true);
  img.set_pixel_color(pix3,0,0,255,clg=true);
  img.set_pixel_color(pix4,255,0,255,clg=true);
  img.set_pixel_color(pix5,0,255,255,clg=true);
  img.set_pixel_color(pix6,0,255,0,clg=true);
  img.set_pixel_color(pix7,255,0,255,clg=true);

  img.draw_figure(p,0,true);
  
  img.scanline_gradient(p);

  
  

  
}

function draw() {
  
  
  //funcionando para esse caso
  //p = new Polygon(0,[new Pixel(10,10,0,0),new Pixel(10,50,1,0),new Pixel(50,50,1,1),new Pixel(50,10,0,1)])



  // // Relogio
  // clk.update()
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(200); }, 1000); //esperar para limpar a tela

}