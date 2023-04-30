/**
 * Manipula o canvas do p5.js
 * @type {{width: Number height: Number background: Number}}
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
    canvas.getContext('2d', { willReadFrequently: true });
    this.clear(this.background)
    console.log(`Canvas ${this.width} x ${this.height} created`)
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

    if (Math.abs(dy) > Math.abs(dx)) {
      [pi, pf] = Pixel.switch(pi, pf)
      var has_changed = true;
    }
    let a = dy / dx;

    for (let vx = 0; vx <= Math.abs(dx); vx++) {
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

  /**
   * Desenha uma reta entre o pixel inicial e o final
   * @param {Pixel} pi Pixel inicial
   * @param {Pixel} pf Pixel final
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   */
  retaDDA(pi, pf, intensity, clg = false) {
    let [dx, dy] = Pixel.distance(pi, pf)

    if (dx == 0 && dy == 0) {
      this.set_pixel(pi, intensity)
      return
    }

    let passos = max(Math.abs(dy), Math.abs(dx))
    let passo_x = dx / passos;
    let passo_y = dy / passos;

    for (let i = 0; i < passos; i++) {
      let x = Math.round(pi.x + i * passo_x);
      let y = Math.round(pi.y + i * passo_y);
      this.set_pixel(new Pixel(x, y), intensity, true)
    }

    if (clg) {
      console.log(`Stroke (${pi.to_array()}) -> (${pf.to_array()})`)
    }

  }

  /**
   * Desenha uma reta entre o pixel inicial e o final
   * @param {Pixel} pi Pixel inicial
   * @param {Pixel} pf Pixel final
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   */
  reta_bresenham(pi, pf, intensity, clg) {
    let [dx, dy] = Pixel.distance(pi, pf)
    let dx2 = 2 * dx;
    let dy2 = 2 * dy;

    let p = - dx + dy2;
    let x = pi.x
    let y = pi.y

    for (let i = 0; i < Math.abs(dx); i++) {
      this.set_pixel(new Pixel(x, y), intensity, clg);
      x++
      if (p >= 0) {
        y++
        p += - dx2 + dy2;
      }
      else {
        p += dy2;
      }
    }
    if (clg) {
      console.log(`Stroke (${pi.to_array()}) -> (${pf.to_array()})`)
    }

  }

  /**
   * Desenha uma reta com anti-aliasing entre o pixel inicial e o final. (retaDDAAA)
   * @param {Pixel} pi Pixel inicial
   * @param {Pixel} pf Pixel final
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   */
  reta_continua(pi, pf, intensity = 255, clg = false) {
    let [dx, dy] = Pixel.distance(pi, pf)
    let passos = max(Math.abs(dy), Math.abs(dx))

    if (passos == 0) {
      this.set_pixel(pi, intensity)
      return
    }

    let passo_x = dx / passos;
    let passo_y = dy / passos;

    for (let i = 0; i < passos; i++) {
      let is_one = Math.abs(Math.round(passo_x)) == 1

      let x = pi.x + i * passo_x;
      let y = pi.y + i * passo_y;
      let d = decimal_part(is_one ? y : x)

      if (is_one) {
        var px1 = new Pixel(Math.round(x), Math.floor(y))
        var px2 = new Pixel(Math.round(x), Math.floor(y + 1))
      }
      else {
        var px1 = new Pixel(Math.floor(x), Math.round(y))
        var px2 = new Pixel(Math.floor(x + 1), Math.round(y))
      }

      this.set_pixel(px1, Math.round((1 - d) * intensity));
      this.set_pixel(px2, Math.round(d * intensity));
    }

    if (clg) {
      console.log(`Stroke (${pi.to_array()}) -> (${pf.to_array()})`)
    }
  }

  /**
   * Desenha um polígono
   * @param {Polygon} polygon Polígono a ser desenhado
   * @param {boolean} clg Exibir no console ou não (default: False)
   */
  draw_polygon(polygon, clg = false) {
    if (polygon.vertices.length < 3) {
      throw RangeError("A polygon must have at least 3 vertices")
    }

    var last_pixel = polygon.vertices[0]
    for (let i = 1; i < polygon.vertices.length; i++) {
      let pixel = polygon.vertices[i];
      this.reta_continua(last_pixel, pixel, polygon.stroke_intensity, clg)
      last_pixel = pixel
    }

    this.reta_continua(last_pixel, polygon.vertices[0], polygon.stroke_intensity, clg)
    if (clg) {
      console.log(`Polygon`)
    }
  }

  intersection(scan,seg){
    let xi = seg.pi.x ;
    let yi = seg.pi.y ;
    let xf = seg.pf.x ; 
    let yf = seg.pf.y ;
    y = scan // scanline -> percorrer toda a imagem 

    // if horizontal line
    if (yi == yf){
      x = -1;
      return; 
    }

    //
    if (yi>yf){
      [seg.pi,seg.pf] = Pixel.switch(seg.pi, seg.pf)
    }
    
    // calculates t
    let t = (y-yi)/(yf-yi);

    // calculates x
    if (t>0 && t<=1){
      var x = xi + t*(xf-xi);
      return
    }

    // No intersections
    x = -1;
    return;
  }
}