
/**
 * Estrutura para cores
 * @param {?Number} r Valor vermelho (0 a 255)
 * @param {?Number} g Valor verde (0 a 255)
 * @param {?Number} b Valor azul (0 a 255)
 * @param {?Number} a Valor alpha (0 a 255)
 */
function Color(r, g, b, a) {
    this.red = r === undefined ? 0 : r
    this.green = g === undefined ? this.red : g
    this.blue = b === undefined ? this.red : b
    this.alpha = a === undefined ? 255 : a


    this.to_array = () => {
        return [this.red,
        this.green,
        this.blue,
        this.alpha]
    }


}

Color.from_array = (array) => {
    return new Color(array[0], array[1], array[2], array[3])
}

/**
 * Gera uma nova cor a partir das duas especificadas, obedecendo à porcentagem dada
 * @param {Color} color1 Primeira cor
 * @param {Color} color2 Segunda cor
 * @param {Number} porc Porcentagem
 */
Color.gradient = (color1, color2, porc) => {
    var r = Math.round((color2.red - color1.red) * porc + color1.red);
    var g = Math.round((color2.green - color1.green) * porc + color1.green);
    var b = Math.round((color2.blue - color1.blue) * porc + color1.blue);

    return new Color(r, g, b)
}



/**
 * Estrutura para localização de pixel
 * @param {?Number} x Coordenada X do pixel. Se 'null', então será 0
 * @param {?Number} y Coordenada Y do pixel. Se 'null', então será igual ao x
 * @param {?Number} xtex Coordenada X da textura variam de 0 a 1. 
 * @param {?Number} ytex Coordenada Y da textura variam de 0 a 1. 
 * @param {boolean} allow_round Se deve arredondar os valores das coordenadas para inteiros.
 * @param {?Color} color Cor do pixel
 * @type {{x:Number y:Number xtex:Number ytex:Number color:Color _round:boolean}}
 */
function Pixel(x, y, xtex, ytex, color, allow_round = true) {
    this.x = x === undefined ? 0 : x
    this.y = y === undefined ? this.x : y
    this.xtex = xtex === undefined ? 0 : xtex
    this.ytex = ytex === undefined ? this.xtex : ytex
    this._round = allow_round


    this.round_position = () => {
        this.x = round(this.x)
        this.y = round(this.y)
        return this
    }

    if (this._round) this.round_position()

    /**
     * Retorna as coordenadas x,y como um array
     * @returns {Array<Number>} [x,y]
     */
    this.to_array = () => {
        return [this.x, this.y]
    }

    /**
     * Retorna o índice do pixel no array do P5.js
     * @param {Number} width
     * @returns {Number} índice do pixel no array de pixels do P5.js
     */
    this.get_idx = (width) => {
        return 4 * (this.y * width + this.x)
    }

    /**
     * rotaciona um ponto
     * @param {Number} ang Ângulo (em graus) para rotação
     */
    this.rotate = (ang) => {
        let rad_ang = ang * Math.PI / 180; // converte para radianos
        let n = this.copy()
        n.x = (Math.cos(rad_ang) * this.x - Math.sin(rad_ang) * this.y)
        n.y = (Math.sin(rad_ang) * this.x + Math.cos(rad_ang) * this.y)

        return n
    }

    /**
     * Subtrai coordenada do pixel
     * @param {Pixel} p 
     */
    this.sub = (p) => {
        let n = this.copy()
        n.x -= p.x
        n.y -= p.y
        return n
    }

    /**
     * Adiciona coordenada ao pixel
     * @param {Pixel} p 
     */
    this.add = (p) => {
        let n = this.copy()
        n.x += p.x
        n.y += p.y
        return n
    }

    /**
     * Multiplica o pixel por uma coordenada
     * @param {Pixel} p 
     * @returns 
     */
    this.mult = (p) => {
        let n = this.copy()
        n.x *= p.x
        n.y *= p.y
        return n
    }
    /**
     * Gera uma nova instância idêntica à atual
     * @returns {Pixel} Novo pixel
     */
    this.copy = () => {
        return Pixel.from_object({ ...this, allow_round: this._round })
    }
    /**
     * Gera um novo pixel com valores trocados de X e Y
     * @returns {Pixel} Novo Pixel
     */
    this.invert = () => {
        let n = this.copy()
        n.x = this.y
        n.y = this.x
        return n
    }

    /**
     * Multiplica os valores de X e Y por -1
     * @returns {Pixel}
     */
    this.negate = () => {
        let n = this.copy()
        n.x *= -1
        n.y *= -1
        return n
    }

    this.load_color = (width) => {
        let idx = this.get_idx(width)
        return new Color(pixels[idx], pixels[idx + 1], pixels[idx + 2], pixels[idx + 3])
    }

    this.color = color === undefined ? this.load_color() : color
}

Pixel.from_object = (object) => {
    return new Pixel(object.x, object.y, object.xtex, object.ytex, object.color, object.allow_round)
}
/**
 * Inverte os pixels: p1 vira p2 e vice-versa
 * @param {Pixel} p1 Pixel 1
 * @param {Pixel} p2 Pixel 2
 * @returns {Array<Pixel>} Novos valores para p1 e p2
 */
Pixel.switch = (p1, p2) => {
    let new_p1 = new Pixel(...p2.to_array())
    let new_p2 = new Pixel(...p1.to_array())
    return [new_p1, new_p2]
}

/**
 * Calcula a distância entre p2 e p1
 * @param {Pixel} p1 Pixel 1
 * @param {Pixel} p2 Pixel 2
 * @returns {Array<Number>} Distância no eixo X e no Y, nessa ordem
 */
Pixel.distance = (p1, p2) => {
    return [p2.x - p1.x, p2.y - p1.y]
}
