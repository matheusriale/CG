var img
var clk
var num
function preload() {

  img = new ImageCG(100, 100, 200)
  let drawer = new NumberDrawer(255, 15)
  num = drawer.get_number("0123456789", new Pixel(1))
}

function setup() {
  img.init()
  num.forEach(n => {
    img.draw_figure(n)
  });
  noLoop()
}

function draw() {

}