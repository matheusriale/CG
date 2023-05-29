var img, opening
var clk


function preload() {
  img = new ImageCG(100, 100, 200)
  // opening = new Opening(img, new CharDrawer())
  // imgteste = loadImage('images/imgteste.jpg')
  imgteste = loadImage('images/relogio.png')


  //Funcao para pegar a matriz de pixeis da imagem:
  // clk = new Clock(new CharDrawer(155, 10, 10), new Pixel(50), 50)
}

function setup() {
  img.init();
  p = new Polygon(0,[pix1 = new Pixel(10,10,0,0),pix2 = new Pixel(10,60,0,1),pix3 = new Pixel(60,60,1,1),pix4 = new Pixel(60,10,1,0)])
  image_pixels(p,imgteste);
  



  // let viewport = new Viewport(width, height)

  // let win = new WindowCG(new Pixel(65,5), new Pixel(85,25))
  // console.log(win)
  // img.init()

  // let p = Polygon.square(new Pixel(10), 10)
  // //img.draw_figure(p)

  // let p2 = Polygon.square(new Pixel(70,10), 10)
  // //img.draw_figure(p2)

  // let p3 = Polygon.square(new Pixel(50,50), 10)
  // //img.draw_figure(p3)


  // // let scale = make_scale(2, 2)

  // // p.apply_transformation(scale)
  // // img.draw_figure(p)

  // p.map_window(viewport, win)
  // // img.draw_figure(p)

  // // opening.start()
}

function draw() {
  if (opening.is_running) {
    opening.update()
    return
  }
  // Relogio
  clk.update()
  clk.get_hour_numbers().forEach(n => {
    img.draw_figure(n)
  })
  clk.get_hands().forEach(h => {
    img.draw_figure(h)
  })

  setTimeout(() => { img.clear(); }, 1000); //esperar para limpar a tela

}

//Funcao para pegar a matriz de pixeis da imagem:
function image_pixels(p,imgteste){
  image(imgteste, 0, 0);
  loadPixels()
  image_matrix = []
  matrix_line = []
  for (var y = 0; y < 50; y++){//imagem 50x50
    for (var x = 0; x < 50; x++){
      var index = (x+y*width)*4;
      if (pixels[index] == 255 && pixels[index+1] == 255 && pixels[index+2] == 255){
         pixels[index + 3] = 0;
        }
      matrix_line.push(pixels[index],pixels[index+1],pixels[index+2],pixels[index+3])
    }
    image_matrix.push(matrix_line)
    matrix_line = []
  }
  img.clear();
  img.scanline_tex(p,image_matrix);
}