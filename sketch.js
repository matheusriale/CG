var img
var clk
var num
function preload() {

  img = new ImageCG(100, 100, 200)
}

function setup() {
  let c = new Pixel(50)
  let p = new Pixel(0, 50)
  img.init()
  img.reta_continua(c, p, 100)

  p.rotate(5)
  p.add(c)
  img.reta_continua(c, p, 200)


}

function draw() {

}