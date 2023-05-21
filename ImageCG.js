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
    pixelDensity(1)

    canvas.getContext('2d', { willReadFrequently: true });
    console.log(`Canvas ${this.width} x ${this.height} created`)

    this.clear(this.background)
  }

  /**
   * Preenche todo o canvas
   * @param {Number} intensity Intensidade (0 a 255)
   */
  clear(intensity) {
    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.set_pixel(new Pixel(x, y), intensity)
      }
    }
    // console.log(`Canvas cleared ${intensity}`)
  }

  /**
   * Muda a cor de um pixel.
   * @param {Pixel} p Pixel para ser mudado
   * @param {Number} intensity Intensidade (0 a 255)
   * @param {boolean} clg Exibir no console ou não (default: False)
   * @returns Índice do pixel no array de pixels do P5.js
   */
  set_pixel(p, intensity, clg = false) {
    loadPixels()
    let idx = p.get_idx(this.width);

    for (let i = 0; i < 3; i++) { //rgb
      pixels[idx + i] = intensity;
    }
    pixels[idx + 3] = 255; //alpha

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

  get_pixel_tex(p, tex) {
    //tex->textura(colunas(width) e linhas(height))
    //p pixel (x,y)

    // cod yuri
    if (p.x > 1) {
      p.x = 1;
    }
    if (p.x < 0) {
      p.x = 0;
    }
    if (p.y > 1) {
      p.y = 1;
    }
    if (p.y < 0) {
      p.y = 0;
    }
    p.x = Math.round(p.x * (tex.width - 1) + 1);
    p.y = Math.round(p.y * (tex.height - 1) + 1);

    // if (p.x > tex.width){       
    //   p.x = tex.width - 1;
    // }
    // if (p.x < 0){
    //   p.x = 0;
    // }
    // if (p.y > tex.height){
    //   p.y = tex.height - 1;
    // }
    // if (p.y < 0){
    //   p.y = 0;
    // }
    let intensity = tex.get(p.x, p.y);
    return intensity;
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
      let vx2 = dx < 0 ? (-1) * vx : vx

      let vy = a * vx2;
      let x = Math.round(pi.x + vx2);
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
  reta_continua(pi, pf, intensity, clg = false) {
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
   * Desenha uma figura
   * @param {Figure | Polygon} figure  Figura a ser desenhada
   * @param {?Number} intensity Intensidade (0 a 255) - Caso não especificada, será utilizada a da figura
   * @returns {Pixel} último pixel desenhado
   */
  draw_figure(figure, intensity) {
    let vertices = figure.get_vertices()
    var last_pixel = vertices[0]
    let iten = intensity || figure.stroke_intensity

    for (let i = 1; i < vertices.length; i++) {
      let pixel = vertices[i];
      this.reta_continua(last_pixel, pixel, iten)
      last_pixel = pixel
    }

    return last_pixel
  }


  intersection(scan, seg) {
    let xi = seg.pi.x;
    let yi = seg.pi.y;
    let xf = seg.pf.x;
    let yf = seg.pf.y;
    let y = scan // scan line -> percorrer toda a imagem 

    // if horizontal line
    if (yi == yf) {
      x = -1;
      return new Pixel(x, y);
    }

    //
    if (yi > yf) {
      [seg.pi, seg.pf] = Pixel.switch(seg.pi, seg.pf)
    }

    // calculates t
    let t = (y - yi) / (yf - yi);

    // calculates x
    if (t > 0 && t <= 1) {
      var x = xi + t * (xf - xi);
      return new Pixel(x, y)
    }

    // No intersections
    x = -1;
    return new Pixel(x, y);
  }

  intersection_tex(scan, seg) {
    let pi = seg.pi; //pi = x,y,tx,ty

    let pf = seg.pf;
    let y = scan; // scan line -> percorrer toda a imagem 

    // Segmento horizontal -> sem intersecao
    if (pi.y == pf.y) {
      let p = new Pixel_tex(-1, 0, 0, 0); //ptex = [x,y,xtex,ytex]
      return p;
    }
    // Troca para garantir ponto inicial em cima
    if (pi.y > pf.y) {
      [seg.pi, seg.pf] = Pixel.switch(seg.pi, seg.pf);
    }

    // Calcula t
    let t = (y - pi.y) / (pf.y - pi.y);

    // Calcula x
    if (t > 0 && t <= 1) {
      var x = pi.x + t * (pf.x - pi.x);
      let tx = pi.tx + t * (pf.tx - pi.tx);
      let ty = pi.ty + t * (pf.ty - pf.ty);
      return new Pixel_tex(x, y, tx, ty)
    }

    // No intersections
    let p = new Pixel_tex(-1, 0, 0, 0);
    return p;
  }

  scanline_no_texture(pol) {
    let ys = pol.vertices.map((p) => {
      return p.y;
    });
    let ymin = Math.min(...ys); //menor y
    let ymax = Math.max(...ys); //maior y

    let pi = pol.vertices[0]; //ponto inicial

    for (let y = ymin + 1; y < ymax - 1; y++) {
      //console.log(tuple[0])

      for (let p = 0; p < pol.vertices.length; p++) {
        //4vezes
        var pf = pol.vertices[p];
        var pint = this.intersection(y, new Line(pi, pf)); // segmento válido
        if (pint.x >= 0) {
          for (let k = 0; k < pol.vertices.length; k++) {
            var pint2 = this.intersection(y, new Line(pf, pol.vertices[k]));
            if (pint2.x >= 0) {
              this.reta_continua(pint2, pint); 
            }
          }
        }
        pi = pf;
      }
    }
  }

  scanline_tex(pol, tex) {//TODO: add tex posteriormente

    let ys = pol.vertices.map(p => { return p.y })
    let ymin = Math.min(...ys);//menor y
    let ymax = Math.max(...ys);//maior y

    let pi = pol.vertices[0] //ponto inicial
    for (let y = ymin; y < ymax; y++) {
      let tuple = [new Pixel(pi.x, y,pi.xtex,pi.ytex)]

      for (let p = 1; p < pol.vertices.length; p++) {
        var pf = pol.vertices[p];
        var pint = this.intersection(y, new Line(pi, pf));

        if (pint.x >= 0) {
          tuple.push(pint)
          if (tuple.length == 2) {
            
            this.reta_continua(tuple[0], tuple[1])
            tuple = []
          }
        }

        pi = pf;
      }
    }
  }
}