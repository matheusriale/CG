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
    this.clear(this.background)

  }

  /**
   * Preenche todo o canvas
   * @param {Number} intensity Intensidade (0 a 255)
   */
  clear(intensity) {
    loadPixels()
    pixels.fill(intensity)
    updatePixels()
    console.log(`Canvas cleared ${intensity}`)
  }

  /**
   * Muda a cor de um pixel.
   * @param {Pixel} p Pixel para ser mudado
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   * @returns Índice do pixel no array de pixels do P5.js
   */
  set_pixel(p, intensity = 255, clg = false) {
    loadPixels()
    let idx = p.get_idx(this.width);

    for (let i = 0; i < 3; i++) { //rgb
      pixels[idx + i] = intensity;
    }
    pixels[idx + 3] = 1; //alpha

    if (clg) {
      console.log(`Pixel (${p.to_array()}) [idx = ${idx}] changed to ${intensity}`);
    }
    updatePixels()
    return idx
  }

  /**
   * Retorna a intensidade do pixel
   * @param {Pixel} p Pixel para ser mudado
   * @returns {Number} Intensidade do pixel
   */
  get_pixel(p) {
    loadPixels()
    return pixels[p.get_idx(this.width)]
  }


  /**
   * Desenha uma reta entre o pixel inicial e o final
   * @param {Pixel} pi Pixel inicial
   * @param {Pixel} pf Pixel final
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   */
  reta(pi, pf, intensity = 255, clg = false) {
    let [dx, dy] = Pixel.distance(pi, pf)

    if (dx == 0 && dy == 0) {
      this.set_pixel(pi, intensity)
      return
    }

    if (abs(dy) > abs(dx)) {
      [pi, pf] = Pixel.switch(pi, pf)
      var has_changed = true;
    }
    let a = dy / dx;

    for (let vx = 0; vx <= abs(dx); vx++) {
      if (dx < 0) {
        vx = (-1) * vx;
      }
      let vy = a * vx;
      let x = Math.round(pi.x + vx);
      let y = Math.round(pi.y + vy);

      let p = has_changed ? new Pixel(y, x) : new Pixel(x, y)
      this.set_pixel(p, intensity);

    }
    if (clg) {
      console.log(`Stroke (${pi.to_array()}) -> (${pf.to_array()}) (changed: ${has_changed || false})`)
    }
  }

  retaDDA(pi, pf, intensity, clg = false) {
    let [dx, dy] = Pixel.distance(pi, pf)

    if (dx == 0 && dy == 0) {
      this.set_pixel(pi, intensity)
      return
    }

    let passos = abs(dy) > abs(dx) ? abs(dy) : abs(dx);
    let passo_x = dx / passos;
    let passo_y = dy / passos;

    for (let i = 0; i < passos; i++) {
      let x = Math.round(pi.x + i * passo_x);
      let y = Math.round(pi.y + i * passo_y);
      this.set_pixel(new Pixel(x, y), intensity, true)
    }

  }
}