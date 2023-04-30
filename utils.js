/**
 * Obtém a parte decimal de um número
 * @param {Number} num 
 * @returns {Number}
 */
function decimal_part(num) {
    return num - Math.floor(num)
}