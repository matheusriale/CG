var img

function setup() {
  img = new ImageCG(400, 400, 0)
  img.init()
}

function draw() {
  img.update()
}
