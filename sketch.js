var img
var pol

function preload() {
  img = new ImageCG(100, 100, 200)
  pol = new Polygon(255)
  pol.add_vertex([new Pixel(10, 10), new Pixel(10, 90), new Pixel(90, 90), new Pixel(90, 10)])
}

function setup() {
  img.init()
  img.draw_polygon(pol, true)
  noLoop()
}

function draw() {

}