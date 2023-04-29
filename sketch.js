var img

function setup() {
  img = new ImageCG(100, 100, 200)
  img.init()

  img.reta(51, 50, 100, 150)
  img.set_pixel(52, 50)
  img.set_pixel(53, 50)
}

function draw() {
  img.update()
}
