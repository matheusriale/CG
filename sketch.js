var img

function setup() {
  img = new ImageCG(100, 100, 200)
  img.init()

  var pol = new Polygon(255)
  pol.add_vertex([new Pixel(), new Pixel(20), new Pixel(30, 0), new Pixel(10)])
  img.draw_polygon(pol, true)
}

function draw() {

}
