/**
 * Manipula o canvas do p5.js
 */
class ImageCG {
  /**
   * Cria uma nova imagem
   * @param {Number} width Largura
   * @param {Number} height Altura
   * @param {Number} background Intensidade do fundo da nova Imagem (padrão: 255)
   */
  constructor(width, height, background = 255) {
    this.width = width
    this.height = height
    this.background = background
  }

  /**
   * Inicializa a tela.
   * Deve ser chamada na função `setup` do p5.js
   */
  init() {
    createCanvas(this.width, this.height)
    console.log(`Canvas ${this.width} x ${this.height} created`)

    loadPixels()
    pixels.fill(this.background)
    this.pixels = pixels
    updatePixels()


    console.log(`Background changed to ${this.background}`)
  }
  /**
   * Atualiza a tela. Deve ser chamada na função `draw` do P5.js
   */
  update() {
    loadPixels()
    pixels = this.pixels
    updatePixels()
  }

  /**
   * Muda a cor de um pixel.
   * @param {Pixel} p Pixel para ser mudado
   * @param {Number} intensity Intensidade (0 a 255)
   * @returns Índice do pixel no array de pixels do P5.js
   */
  set_pixel(p, intensity = 255) {
    let idx = p.get_idx();

    for (let i = 0; i < 3; i++) { //rgb
      this.pixels[idx + i] = intensity;
    }
    this.pixels[idx + 3] = 1; //alpha

    return idx
  }

  /**
   * Retorna a intensidade do pixel
   * @param {Pixel} p Pixel para ser mudado
   * @returns {Number} Intensidade do pixel
   */
  get_pixel(p) {
    return this.pixels[p.get_idx()]
  }


  /**
   * Faz uma reta entra o pixel (xi,yi) e o pixel de (xf,yf)
   * @param {Number} xi Coordenada X do pixel inicial
   * @param {Number} yi Coordenada Y do pixel inicial
   * @param {Number} xf Coordenada X do pixel final
   * @param {Number} yf Coordenada Y do pixel final
   * @param {Number} intensity Intensidade (0 a 255)
   * @returns 
   */
  reta(xi, yi, xf, yf, intensity = 255) {
    let dx = xf - xi;
    let dy = yf - yi;
    let has_changed = false

    if (dx == 0 && dy == 0) {
      this.set_pixel(xi, yi, intensity)
      return
    }

    if (abs(dy) > abs(dx)) {
      let aux = dx;
      dx = dy;
      dy = aux;
      aux = xi;
      xi = yi;
      yi = aux;
      has_changed = true;
    }
    let a = dy / dx;

    for (let vx = 0; vx < abs(dx); vx++) {
      if (dx < 0) {
        vx = (-1) * vx;
      }
      let vy = a * vx;
      let x = Math.round(xi + vx);
      let y = Math.round(yi + vy);

      if (!has_changed) {
        this.set_pixel(x, y, intensity);
      }
      else {
        this.set_pixel(y, x, intensity);
      }
    }
  }

}