/**
 * Obtém a parte decimal de um número
 * @param {Number} num 
 * @returns {Number}
 */
function decimal_part(num) {
    return num - Math.floor(num)
}

function getArcCoordinate(radius1, radius2, coord) {
    let r1_2 = Math.pow(radius1, 2)
    let r2_2 = Math.pow(radius2, 2)
    return Math.sqrt((r1_2 - (r1_2 / r2_2) * Math.pow(coord, 2)))
}