var img
var clk
var num
function preload() {

  img = new ImageCG(100, 100, 200)
}

function setup() {
  //img.init()
  // let drawer = new NumberDrawer(255, 10, 5)
  // clk = new Clock(drawer, new Pixel(width / 2 - 5, height / 2), width / 2)
  // clk.get_hour_numbers().forEach(n => {
  //   img.draw_figure(n)
  // });
  // noLoop()
  img.init()
  let pol = new Polygon(0, [new Pixel(20), new Pixel(50), new Pixel(60, 20), new Pixel(65, 50), new Pixel(20, 50)])
  // let pol = Polygon.square(new Pixel(20), 30, 255)
  //pol.square(10,10)

  img.draw_figure(pol)
  img.scanline_no_texture(pol)



}

function draw() {

}