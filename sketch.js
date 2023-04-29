var img

function setup() {
  img = new ImageCG(40, 40, 200)
  img.init()
  img.retaDDA(new Pixel(), new Pixel(39), 255, true)
}

function draw() {

}
