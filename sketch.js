var img
var clk
var num
function preload() {

  img = new ImageCG(100, 100, 200)
}

function setup() {
  img.init()
  let drawer = new NumberDrawer(255, 10, 5)
  clk = new Clock(drawer, new Pixel(width / 2 - 5, height / 2), width / 2)
  clk.get_hour_numbers().forEach(n => {
    img.draw_figure(n)
  });
  noLoop()
}

function draw() {

}