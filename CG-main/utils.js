/**
 * Dadas as coordenadas x e y, retorna o índice do pixel no array do P5.js
 * @param {Number} x 
 * @param {Number} y 
 * @returns {Number} índice do pixel no array de pixels do P5.js
 */
function pixel_idx(x, y) {
    return 4 * (y * width + x)
}