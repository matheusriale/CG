var img, opening
var clk


function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  imgteste = loadImage('images/imgteste.jpg')
  clk = new Clock(new CharDrawer(155, 10, 10), new Pixel(50), 50)
}

function setup() {
  img.init()
  
  p = new Polygon(0,[pix1 = new Pixel(10,10,0,0),pix2 = new Pixel(10,60,1,0),pix3 = new Pixel(60,60,1,1),pix4 = new Pixel(60,10,0,1)])

  img.draw_figure(p,0);

  img.scanline_tex(p,imgteste);
  

}

function draw() {


}