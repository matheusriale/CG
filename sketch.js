var img

function setup() {
  img = new ImageCG(100, 100, 200)
  img.init()

  var pol = new Polygon(255)
  pol.add_vertex([new Pixel(10, 10), new Pixel(10, 90), new Pixel(90, 90), new Pixel(90, 10)])

  img.draw_polygon(pol, true)
}

function draw() {

}