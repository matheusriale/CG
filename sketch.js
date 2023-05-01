var img
var clk
var num

var c
var p
var l
var ang = 0

function preload() {
  img = new ImageCG(100, 100, 200)
}

function setup() {
  img.init()
  c = new Pixel(50, 50)
  p = new Pixel(0, 50)
  l = new Line(c, p, 100)
}

function draw() {
  // let new_l = l.rotate(ang)
  // img.reta(new_l.pi, new_l.pf, new_l.stroke_intensity)
  // new_l.stroke_intensity = img.background
  // img.draw_figure(new_l)
  ang = ang >= 360 ? 0 : ang + 10

  // img.clear(200)
}