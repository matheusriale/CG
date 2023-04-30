var img
var clk
var num

function preload() {
  img = new ImageCG(100, 100, 200)
  let drawer = new NumberDrawer()
  num = drawer.get_number("11", new Pixel(10))
}

function setup() {
  img.init()
  img.draw_figure(num[0], 255)
  img.draw_figure(num[1], 255)
  noLoop()
}

function draw() {

}