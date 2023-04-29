/**
 * Dadas as coordenadas x e y, retorna o índice do pixel no array do P5.js
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Number} índice do pixel no array de pixels do P5.js
 */
function pixel_idx(x, y) {
    return 4 * (y * width + x)
}


/**
 * Estrutura para localização de pixel
 * @param {Number} x Coordenada X do pixel
 * @param {Number} y Coordenada Y do pixel
 */

function Pixel(x, y) {
    /**
    * @type {{x:Number y:Number}}
    */
    this.x = x
    this.y = y

    /**
     * Retorna as coordenadas x,y como um array
     * @returns {Array<Number>} [x,y]
     */
    this.to_array = () => {
        return [this.x, this.y]
    }
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