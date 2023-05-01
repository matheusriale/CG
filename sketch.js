var img
var clk
var num
function preload() {

  img = new ImageCG(100, 100, 200)
  let drawer = new NumberDrawer(255)
  num = drawer.get_number("179", new Pixel(10))
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