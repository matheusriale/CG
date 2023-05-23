var img, opening
var clk


function preload() {
  img = new ImageCG(100, 100, 200)
  opening = new Opening(img, new CharDrawer())
  imgteste = loadImage('images/imgteste.jpg')
  clk = new Clock(new CharDrawer(155, 10, 10), new Pixel(50), 50)
}

function setup() {
  img.init()
  let p = new Polygon(0, [pix2 = new Pixel(10, 10, 1, 0), pix3 = new Pixel(60, 10, 0, 0), pix4 = new Pixel(60, 60, 0, 0), pix5 = new Pixel(70, 45, 0, 0), pix6 = new Pixel(70, 5, 1, 0), pix7 = new Pixel(25, 5, 0, 0)])
  img.set_pixel_color(pix2, new Color(0, 255, 0), clg = true);
  img.set_pixel_color(pix3, new Color(0, 0, 255), clg = true);

  img.reta_continua_gradient(pix2, pix3)
  // img.set_pixel_color(pix4, new Color(255, 0, 255), clg = true);
  // img.set_pixel_color(pix5, new Color(0, 255, 255), clg = true);
  // img.set_pixel_color(pix6, new Color(0, 255, 0), clg = true);
  // img.set_pixel_color(pix7, new Color(255, 0, 255), clg = true);

  // img.draw_figure(p, 0, true);

  // img.scanline_gradient(p);
  // opening.start()
}

function mousePressed() {
  if (opening.is_runing) {
    opening.stop()
  }
}

function draw() {
  // if (opening.is_runing) return

  // // Relogio
  // clk.update()
  // clk.get_hour_numbers().forEach(n => {
  //   img.draw_figure(n)
  // })
  // clk.get_hands().forEach(h => {
  //   img.draw_figure(h)
  // })

  // setTimeout(() => { img.clear(); }, 1000); //esperar para limpar a tela

}