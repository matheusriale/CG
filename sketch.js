var img, opening;
var clk;

function preload() {
  img = new ImageCG(100, 100, 200)
  // opening = new Opening(img, new CharDrawer())
  // imgteste = loadImage('images/imgteste.jpg')
  imgteste = loadImage('images/imgteste.jpg')


    //Funcao para pegar a matriz de pixeis da imagem:
  image(imgteste, 0, 0);
  loadPixels()
  image_matrix = []
  matrix_line = []
  for (var y = 0; y< height; y++){
    for (var x = 0; x < width; x++){
      var index = (x+y*width)*4;
      matrix_line.push(pixels[index],pixels[index+1],pixels[index+2],pixels[index+3])
    }
    image_matrix.push(matrix_line)
    matrix_line = []
  }
  console.log(image_matrix)
  // clk = new Clock(new CharDrawer(155, 10, 10), new Pixel(50), 50)
}

function setup() {
  
  img.init()

  //Funcao para pegar a matriz de pixeis da imagem:
  image(imgteste, 0, 0);
  loadPixels()
  image_matrix = []
  matrix_line = []
  for (var y = 0; y< height; y++){
    for (var x = 0; x < width; x++){
      var index = (x+y*width)*4;
      matrix_line.push(pixels[index],pixels[index+1],pixels[index+2],pixels[index+3])
    }
    image_matrix.push(matrix_line)
    matrix_line = []
  }
  console.log(image_matrix)
  //opening.start()
  clear()

  

  img2 = new ImageCG(100, 100, 200)
  img2.init()

  p = new Polygon(0,[pix1 = new Pixel(10,10,0,0),pix2 = new Pixel(10,60,1,0),pix3 = new Pixel(60,60,1,1),pix4 = new Pixel(60,10,0,1)])
  img.draw_figure(p,0);
  img.scanline_tex(p,imgteste);

}
// function mousePressed() {
//   if (opening.is_runing) {
//     opening.stop()
//   }
// }

function draw() {
  
  // image(imgteste,0,0)
  // console.log(imgteste.get(50,50))
  
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

